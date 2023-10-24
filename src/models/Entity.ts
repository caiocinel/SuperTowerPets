import Track from "./Track";
import Tracks from "./Tracks";

export default class Entity{
    public id: number;
    public position: { x: number, y: number; };
    public trackList: Tracks | null;
    public currentTrack: Track | null;
    public isMoving: boolean;
    public speed: number;
    public drawTimeout: number | null;
        
    constructor() {
        this.id = Math.random();
        this.position = { x: 0, y: 0 };
        this.currentTrack = null;
        this.isMoving = false;
        this.trackList = null;
        this.speed = 0.1;
        this.drawTimeout = null;
    }   
    
    public draw(){
        const root = document.getElementById('entities');

        if (!root)
            return alert("Failed to find entities div");        

        var entityElement = document.getElementById(this.id.toString()) as HTMLDivElement;
        
        if(entityElement)
            root.removeChild(entityElement);
        
        entityElement = document.createElement('div');
        
        entityElement.id = this.id.toString();
        entityElement.className = 'entity';
        entityElement.innerText = '🛠️';

        entityElement.style.left = `${this.position.x * 100}%`;
        entityElement.style.top = `${this.position.y * 100}%`;

        root.appendChild(entityElement);
    }

    public async run(){
        if(!this.trackList)
            return alert("No tracks found");

        this.isMoving = true;
        this.currentTrack = this.trackList.items[0];
        this.position = { x: this.currentTrack.position.x, y: this.currentTrack.position.y };
        await this.walk();
    }

    public async walk(){
        
        if(this.drawTimeout)
            clearTimeout(this.drawTimeout);

        this.drawTimeout = setTimeout(async() => {
            if(!this.currentTrack || !this.trackList)
                return;

            if(!this.isMoving)
                return;
            
            if(this.currentTrack.isFinished(this.position)){
                const nextTrack = this.trackList.items[this.trackList.items.indexOf(this.currentTrack) + 1];
                if(nextTrack){
                    this.currentTrack = nextTrack;
                    this.walk();
                }
                else{
                    this.isMoving = false;
                }
            }
            else{
                if(this.currentTrack.orientation === 'x'){
                    this.position.x += this.speed / 60;
                }
                if(this.currentTrack.orientation === 'y'){
                    this.position.y += this.speed / 60;
                }
                if(this.currentTrack.orientation === '-x'){
                    this.position.x -= this.speed / 60;
                }
                if(this.currentTrack.orientation === '-y'){
                    this.position.y -= this.speed / 60;
                }
                this.draw();
                await this.walk();
            }
        }, 16);
    }
}