import Track from "./Track"

export default class Tracks{
    items: Track[];

    constructor(){
        this.items = [];
    }

    public push(track: Track){       
        this.items.push(track);

        this.items.sort((a, b) => {
            if(a.position.x < b.position.x)
                return -1;
            if(a.position.x > b.position.x)
                return 1;
            if(a.position.y < b.position.y)
                return -1;
            if(a.position.y > b.position.y)
                return 1;
            return 0;
        });

        
    }

    public draw(){
        const root = document.getElementById('tracks') as HTMLDivElement;

        if (!root)
            return alert("Failed to find tracks div");

        root.innerHTML = '';

        this.items.forEach(track => track.mountToElement(root));
    }
}