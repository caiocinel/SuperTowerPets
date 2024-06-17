import Entity from "./Entity";
import Inventory from "./Inventory";
import KeyController from "./KeyController";
import Tower from "./Tower";
import Track from "./Track";
import Tracks from "./Tracks";

class Scene{
    public tracks: Tracks = new Tracks();
    public entities: Entity[] = [];
    public towers: Tower[] = [];
    public inventory: Inventory = new Inventory();
    public keyController: KeyController = new KeyController();

    public drawThreadInterval: number | null = null;

    public setTracksInitialPosition({ x = 0, y = 0 }){
        this.tracks.initialPos = { x, y };
    }

    public newTrack({ length = 0, orientation = 'x' }){
        this.tracks.push(new Track({ length, orientation }));
    }

    public newItem({character = '❔'}){
        const item = new Tower();
        item.character = character;
        this.inventory.addItem(item);
    }

    public newEntity({speed = 0.1, character = '🛠️',}){
        const entity = new Entity();
        entity.character = character;
        entity.speed = speed;
        entity.trackList = this.tracks;
        this.entities.push(entity);
    }

    public newTower({character = ''}){
        const tower = new Tower();
        tower.position = {x:0.5, y:0.5};
        tower.character = character;
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

    public renderEntities(){        
        if(this.tracks.items.length === 0)
            return alert("No tracks found");

        this.entities.forEach(entity => {
            if(!entity.trackList)
                entity.trackList = this.tracks;

            entity.run()
        });
    }

    public renderMovingItem(){        

        if (this.drawThreadInterval)
            clearInterval(this.drawThreadInterval);
        
        this.drawThreadInterval = setInterval(() => {                        
            if(this.towers.find(x => x.isMoving)){
                if(!scene.keyController.isMouseDown)
                    return this.towers.filter(x => x.isMoving).forEach(tower => tower.endMove());               

                this.towers.find(x => x.isMoving)?.renderMovingItem();                
            }
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

        const inventoryContainer = document.createElement('div');
        inventoryContainer.id = 'inventoryContainer';
        inventory.appendChild(inventoryContainer);

        this.tracks.draw();
        this.inventory.draw();
        this.towers.forEach(tower => tower.draw());

        this.renderMovingItem();
    }
}

const scene = new Scene();
export default scene;