import scene from "./Scene";
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
    public character: string;
    public isFinished: boolean;
        
    constructor() {
        this.id = Math.random();
        this.position = { x: 0, y: 0 };
        this.currentTrack = null;
        this.isMoving = false;
        this.trackList = null;
        this.speed = 0.1;
        this.drawTimeout = null;
        this.character = '❓';
        this.isFinished = false;
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
        entityElement.innerText = this.character;


        var x = this.position.x - ((9 * (Math.round(window.devicePixelRatio * 100) / 100)) / window.innerWidth);
        var y = this.position.y - ((9 * (Math.round(window.devicePixelRatio * 100) / 100)) / window.innerHeight);

        entityElement.style.left = `${x * 100}%`;
        entityElement.style.top = `${y * 100}%`; 
    
        root.appendChild(entityElement);
    }

    public destroy(){
        this.isMoving = false;
        const root = document.getElementById('entities');

        if (!root)
            return alert("Failed to find entities div");    

        var entityElement = document.getElementById(this.id.toString()) as HTMLDivElement;
        
        if(entityElement)
            root.removeChild(entityElement);
    }

    public preRun(){
        if(!this.trackList)
            return alert("No tracks found");

        this.isMoving = true;
        this.currentTrack = this.trackList.items[0];
        this.position = { x: this.currentTrack.position.x, y: this.currentTrack.position.y };
    }

    public async step(){
        if (!this.currentTrack || !this.trackList)
            return this.destroy();

        if (!this.isMoving)
            return this.destroy();

        if (this.currentTrack.isFinished(this.position)) {
            const nextTrack = this.trackList.items[this.trackList.items.indexOf(this.currentTrack) + 1];
            if (nextTrack) {
                this.currentTrack = nextTrack;
            }
            else {
                this.isMoving = false;
                this.isFinished = true;
                return this.destroy();
            }
        }
        else {
            switch (this.currentTrack.orientation) {
                case 'x': this.position.x += this.speed / 120; break;
                case 'y': this.position.y += this.speed / 120; break;
                case '-x': this.position.x -= this.speed / 120; break;
                case '-y': this.position.y -= this.speed / 120; break;
            }
            this.draw();
        }
    }
}