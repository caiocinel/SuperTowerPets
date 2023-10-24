import Entity from "./Entity";
import Tracks from "./Tracks";

export default class Scene{
    public tracks: Tracks = new Tracks();
    public entities: Entity[] = [];


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


        this.tracks.draw();
    }
}