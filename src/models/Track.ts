export default class Track {
    public id: number;
    public length: number;
    public orientation: 'x' | 'y' | '-x' | '-y';
    public position: { x: number, y: number; };

    constructor() {
        this.id = Math.random();
        this.length = 0;
        this.orientation = 'x';
        this.position = { x: 0, y: 0 };
    }
    
    public isFinished(curPos: {x: number, y:number}) {
        if (this.orientation === 'x') {
            if (curPos.x >= this.position.x + this.length)
                return true;
        }
        if (this.orientation === 'y') {
            if (curPos.y >= this.position.y + this.length)
                return true;            
        }
        if (this.orientation === '-x') {
            if (curPos.x <= this.position.x)
                return true;            
        }
        if (this.orientation === '-y') {
            if (curPos.y <= this.position.y)
                return true;            
        }
        return false;        
    }


    public mountToElement(element: HTMLDivElement) {
        if(!element)
            return alert("mountToElement bad parameter");

        const trackElement = document.createElement('div');
        trackElement.id = this.id.toString();
        trackElement.className = 'track';


        if (this.orientation === 'x') {
            const spacing = this.position.x * window.innerWidth;
            const length = this.length * window.innerWidth;

            if (spacing + length > window.innerWidth)
                trackElement.style.width = `${window.innerWidth - spacing}px`;
            else
                trackElement.style.width = `${length}px`;

            trackElement.style.height = '10px';
        }
        if (this.orientation === 'y') {
            const spacing = this.position.y * window.innerHeight;
            const length = this.length * window.innerHeight;

            if (spacing + length > window.innerHeight)
                trackElement.style.height = `${window.innerHeight - spacing}px`;
            else
                trackElement.style.height = `${length}px`;

            trackElement.style.width = '10px';
        }
        if (this.orientation === '-x') {
            const spacing = this.position.x * window.innerWidth;
            const length = this.length * window.innerWidth;

            if (spacing - length < 0)
                trackElement.style.width = `${spacing}px`;
            else
                trackElement.style.width = `${length}px`;

            trackElement.style.height = '10px';
        }
        if (this.orientation === '-y') {
            const length = this.length * window.innerHeight;
            
            trackElement.style.height = `${length + 10}px`;
            trackElement.style.width = '10px';
        }

        trackElement.style.left = `${this.position.x * 100}%`;
        trackElement.style.top = `${this.position.y * 100}%`;
        trackElement.innerHTML = '&nbsp;';
        element.appendChild(trackElement);
    }

}