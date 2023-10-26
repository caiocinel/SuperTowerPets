import Entity from "./Entity";
import Inventory from "./Inventory";
import Tower from "./Tower";
import Track from "./Track";
import Tracks from "./Tracks";

export default class Scene{
    public tracks: Tracks = new Tracks();
    public entities: Entity[] = [];
    public inventory: Inventory = new Inventory();

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

    public renderEntities(){        
        if(this.tracks.items.length === 0)
            return alert("No tracks found");

        this.entities.forEach(entity => {
            if(!entity.trackList)
                entity.trackList = this.tracks;

            entity.run()
        });
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

        const petsRoot = document.createElement('div');
        petsRoot.id = 'pets';
        root.appendChild(petsRoot);

        const uiRoot = document.createElement('div');
        uiRoot.id = 'ui';
        root.appendChild(uiRoot);

        const inventory = document.createElement('div');
        inventory.id = 'inventory';
        uiRoot.appendChild(inventory);

        const inventoryContainer = document.createElement('div');
        inventoryContainer.className = 'inventoryContainer';
        inventory.appendChild(inventoryContainer);

        this.tracks.draw();
        this.inventory.draw();
    }
}