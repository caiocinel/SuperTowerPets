import Entity from "./Entity";
import Inventory from "./Inventory";
import Input from "./Input";
import Tower from "./Tower";
import Track from "./Track";
import Tracks from "./Tracks";
import Game from "./Game";
import Debug from "./Debug";

class Scene{
    public tracks: Tracks = new Tracks();
    public entities: Entity[] = [];
    public towers: Tower[] = [];
    public inventory: Inventory = new Inventory();
    public input: Input = new Input();
    public game: Game = new Game();
    // Store initial entity configurations to recreate them on restart
    private entityConfigs: Array<{speed: number, character: string}> = [];

    public UIThreadInterval: number | null = null;
    public TickThreadInterval: number | null = null;
    public lastFrameTime: number = 0;

    public setTracksInitialPosition({ x = 0, y = 0 }){
        this.tracks.initialPos = { x, y };
    }

    public newTrack({ length = 0, orientation = 'x' }){
        this.tracks.push(new Track({ length, orientation }));
    }

    public newItem({character = '❔', range = 0}){
        const item = new Tower();
        item.character = character;
        item.range = range;
        this.inventory.addItem(item);
    }

    public newEntity({speed = 0.1, character = '🛠️',}){
        // Store the configuration
        this.entityConfigs.push({speed, character});
        
        const entity = new Entity();
        entity.character = character;
        entity.speed = speed;
        entity.trackList = this.tracks;
        this.entities.push(entity);
    }

    public newTower({character = '', range = 0.1}){
        const tower = new Tower();
        tower.position = {x:0.5, y:0.5};
        tower.character = character;
        tower.range = range;
        this.towers.push(tower);
        return tower;
    }

    public addTower(tower: Tower){
        this.towers.push(tower);
        return tower;
    }

    public removeTower(id: number) {
        const tower = this.towers.find(x => x.id === id);

        if (!tower)
            return alert("Failed to find tower");


        return this.towers = this.towers.filter(x => x.id !== id);
    }


    public renderUiThread(){      
        if (this.UIThreadInterval) 
            cancelAnimationFrame(this.UIThreadInterval);
        
        const uiLoop = () => {                         
            if(this.game.isRunning){
                if(this.entities.filter(entity => !entity.isFinished).length === 0)
                    this.endGame();
            } else {
                if(this.towers.find(x => x.isMoving)){
                    if (!scene.input.isMouseDown)
                        this.towers.filter(x => x.isMoving).forEach(tower => tower.endMove());               

                    this.towers.find(x => x.isMoving)?.renderMovingItem();                
                }
            }
            
            this.UIThreadInterval = requestAnimationFrame(uiLoop);
        };
        
        this.UIThreadInterval = requestAnimationFrame(uiLoop);
    }

    public startGame(){
        this.inventory.element.hidden = true;
        
        // Clear any existing entities and recreate them with full health
        this.entities = [];
        
        // Recreate all entities based on stored configurations
        this.entityConfigs.forEach(config => {
            const entity = new Entity();
            entity.character = config.character;
            entity.speed = config.speed;
            entity.trackList = this.tracks;
            entity.health = entity.maxHealth; // Ensure full health
            this.entities.push(entity);
        });
        
        // Initialize all entities
        this.entities.forEach(x => x.preRun());
        
        this.game.isRunning = true;
        this.lastFrameTime = performance.now();
    }

    public endGame(){
        this.entities.forEach(entity => entity.destroy());
        this.game.isRunning = false;
        this.inventory.element.hidden = false;
    }

    public async onTick(){
        if (this.TickThreadInterval)
            cancelAnimationFrame(this.TickThreadInterval);

        this.lastFrameTime = performance.now();
        
        const gameLoop = async (timestamp: number) => {
            if (!this.game.isRunning) {
                this.TickThreadInterval = requestAnimationFrame(gameLoop);
                return;
            }

            if (this.tracks.items.length === 0) {
                alert("No tracks found");
                return;
            }
            
            const deltaTime = (timestamp - this.lastFrameTime) / 1000;
            this.lastFrameTime = timestamp;
            
            Debug.clear();
            await Promise.all(this.entities.map(async(entity) => await entity.step(deltaTime)));
            await Promise.all(this.towers.map(async (tower) => await tower.hit(deltaTime)));

            this.TickThreadInterval = requestAnimationFrame(gameLoop);
        };

        this.TickThreadInterval = requestAnimationFrame(gameLoop);
    }
    

    public render(){
        console.info("Resetting frame");
        const root = document.getElementById('app');

        if (!root)
            return alert("Failed to find application div");

        root.innerHTML = '';

        const tracksRoot = document.createElement('div');
        tracksRoot.id = 'tracks';
        root.appendChild(tracksRoot);

        const entitiesRoot = document.createElement('div');
        entitiesRoot.id = 'entities';
        root.appendChild(entitiesRoot);

        const towersRoot = document.createElement('div');
        towersRoot.id = 'towers';
        root.appendChild(towersRoot);

        const uiRoot = document.createElement('div');
        uiRoot.id = 'ui';
        root.appendChild(uiRoot);

        const inventory = document.createElement('div');
        inventory.id = 'inventory';
        uiRoot.appendChild(inventory);
        this.inventory.element = inventory;

        const inventoryContainer = document.createElement('div');
        inventoryContainer.id = 'inventoryContainer';
        inventory.appendChild(inventoryContainer);

        this.tracks.draw();
        this.inventory.draw();
        this.towers.forEach(tower => tower.draw());

        this.renderUiThread();
        this.onTick();
    }
}

const scene = new Scene();

window.scene = scene;

declare global {
    interface Window {
        scene: Scene;
    }
}

export default scene;