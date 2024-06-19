import Entity from "./Entity";
import Inventory from "./Inventory";
import Input from "./Input";
import Tower from "./Tower";
import Track from "./Track";
import Tracks from "./Tracks";
import Game from "./Game";

class Scene{
    public tracks: Tracks = new Tracks();
    public entities: Entity[] = [];
    public towers: Tower[] = [];
    public inventory: Inventory = new Inventory();
    public input: Input = new Input();
    public game: Game = new Game();

    public UIThreadInterval: number | null = null;
    public TickThreadInterval: number | null = null;

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
            clearInterval(this.UIThreadInterval);
        
        this.UIThreadInterval = setInterval(() => {                         
            if(this.game.isRunning){
                if(this.entities.filter(entity => !entity.isFinished).length === 0)
                    this.endGame();

                return;
            }

            if(this.towers.find(x => x.isMoving)){
                if (!scene.input.isMouseDown)
                    return this.towers.filter(x => x.isMoving).forEach(tower => tower.endMove());               

                this.towers.find(x => x.isMoving)?.renderMovingItem();                
            }
        }, 16);
    }

    public startGame(){
        this.inventory.element.hidden = true;
        this.entities.forEach(x => x.preRun());
        this.game.isRunning = true;
    }

    public endGame(){
        this.entities.forEach(entity => entity.destroy());
        this.game.isRunning = false;
        this.inventory.element.hidden = false;
    }

    public async onTick(){
        if (this.TickThreadInterval)
            clearTimeout(this.TickThreadInterval);

        this.TickThreadInterval = setInterval(async () => {
            if (!this.game.isRunning)
                return

            if (this.tracks.items.length === 0)
                return alert("No tracks found");           

            await Promise.all(this.entities.map(async(entity) => await entity.step()));
            await Promise.all(this.towers.map(async (towers) => await towers.hit()));

        }, 16);
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

//@ts-ignore
window.scene = scene;

export default scene;