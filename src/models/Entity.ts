import Track from "./Track";
import Tracks from "./Tracks";
import Scene from "./Scene";

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
    public health: number;
    public maxHealth: number;
        
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
        this.health = 100;
        this.maxHealth = 100;
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

        // Add health bar container
        const healthBarContainer = document.createElement('div');
        healthBarContainer.className = 'health-bar-container';
        
        // Add health bar
        const healthBar = document.createElement('div');
        healthBar.className = 'health-bar';
        healthBar.style.width = `${(this.health / this.maxHealth) * 100}%`;
        
        // Add health bar to health bar container
        healthBarContainer.appendChild(healthBar);
        
        // Add health bar container to entity
        entityElement.appendChild(healthBarContainer);

        var x = this.position.x - ((9 * (Math.round(window.devicePixelRatio * 100) / 100)) / window.innerWidth);
        var y = this.position.y - ((9 * (Math.round(window.devicePixelRatio * 100) / 100)) / window.innerHeight);

        entityElement.style.left = `${x * 100}%`;
        entityElement.style.top = `${y * 100}%`; 
    
        root.appendChild(entityElement);
    }

    public takeDamage(amount: number): boolean {
        this.health = Math.max(0, this.health - amount);
        this.draw(); // Redraw entity to update health bar
        
        if (this.health <= 0) {
            // Check if this is a rocket entity
            if (this.character === '🚀') {
                this.spawnBalloons();
            }
            
            this.destroy();
            return true; // Entity died
        }
        
        return false; // Entity still alive
    }

    private spawnBalloons(): void {
        // Create two balloon entities at the same position
        for (let i = 0; i < 2; i++) {
            const balloon = new Entity();
            balloon.character = '🎈';
            balloon.position = { ...this.position };
            balloon.trackList = this.trackList;
            balloon.speed = this.speed * 1.2; // Make balloons slightly faster
            balloon.health = this.maxHealth / 2; // Half of rocket's max health
            balloon.maxHealth = this.maxHealth / 2;
            balloon.isMoving = true;
            balloon.currentTrack = this.currentTrack;
            
            // Add balloon to scene entities
            if (window.scene) {
                window.scene.entities.push(balloon);
                balloon.draw();
            }
        }
    }

    public destroy(){
        console.timeEnd("Fim")
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

        console.time("Fim")

        this.isMoving = true;
        this.currentTrack = this.trackList.items[0];
        this.position = { x: this.currentTrack.position.x, y: this.currentTrack.position.y };
    }

    public async step(deltaTime: number = 1/60){
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
            const moveSpeed = this.speed * deltaTime;
            
            switch (this.currentTrack.orientation) {
                case 'x': this.position.x += moveSpeed; break;
                case 'y': this.position.y += moveSpeed; break;
                case '-x': this.position.x -= moveSpeed; break;
                case '-y': this.position.y -= moveSpeed; break;
            }
            this.draw();
        }
    }
}