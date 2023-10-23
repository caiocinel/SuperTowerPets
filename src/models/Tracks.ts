import Track from "./Track"

export default class Tracks{
    items: Track[];

    constructor(){
        this.items = [];
    }

    public push(track: Track){
        this.items.push(track);
    }

    public draw(){
        const root = document.getElementById('tracks') as HTMLDivElement;

        if (!root)
            return alert("Failed to find tracks div");

        root.innerHTML = '';

        this.items.forEach(track => track.mountToElement(root));
    }
}