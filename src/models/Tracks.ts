import Track from "./Track"

export default class Tracks{
    initialPos = { x: 0, y: 0 };
    items: Track[];

    constructor(initialPos = { x: 0, y: 0 }){
        this.items = [];
        this.initialPos = initialPos;
    }

    public push(track: Track){       
        if(this.items.length == 0){
            track.position = this.initialPos;
            return this.items.push(track);
        }

        const lastTrack = this.items[this.items.length - 1];
        const lastTrackPos = {
            x: lastTrack.position.x,
            y: lastTrack.position.y
        }      
        
        if(lastTrack.orientation == 'x')
            lastTrackPos.x = lastTrack.position.x + lastTrack.length;

        if(lastTrack.orientation == 'y')
            lastTrackPos.y = lastTrack.position.y + lastTrack.length;        



        if (track.orientation == '-y')
            lastTrackPos.y = lastTrackPos.y - track.length;        

        if (track.orientation == '-x')
            lastTrackPos.x = lastTrackPos.x - track.length;
        


        track.position = lastTrackPos;
    
                                
        if (track.position.x == 0 && track.position.y == 0)
            return;

        this.items.push(track);
    }

    public draw(){
        const root = document.getElementById('tracks') as HTMLDivElement;

        if (!root)
            return alert("Failed to find tracks div");

        root.innerHTML = '';

        const lastItem = this.items[this.items.length - 1];

        if(lastItem.orientation == 'x' && lastItem.position.x + lastItem.length < 1)
            lastItem.length = 1 - lastItem.position.x;

        if(lastItem.orientation == 'y' && lastItem.position.y + lastItem.length < 1)
            lastItem.length = 1 - lastItem.position.y;    
        
        if(lastItem.orientation == '-x' && lastItem.position.x - lastItem.length > 0){
            lastItem.length = 1 - lastItem.position.x; + lastItem.length;
            lastItem.position.x = 0;
        }

         if(lastItem.orientation == '-y' && lastItem.position.y - lastItem.length > 0){            
             lastItem.length = lastItem.position.y + lastItem.length;
            lastItem.position.y = 0;
         }
        
        
        console.log(this.items);

        this.items.forEach(track => track.mountToElement(root));
    }
}