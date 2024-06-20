class Debug {

    private elements: HTMLElement[] = [];

    constructor() { }

    public Line({ x, y, width, height = undefined }: { x: number, y: number, width: number, height?: number }) {
        const root = document.getElementById('app');

        if (!root)
            return alert("Failed to find debug div");

        var entityElement = document.createElement('div');

        entityElement.className = 'line';
        entityElement.style.position = 'absolute';        
        entityElement.style.left = `${x * 100}%`;
        entityElement.style.top = `${y * 100}%`;
        entityElement.style.width = `${width * 100}%`;
        entityElement.style.height = height ? `${height * 100}%` : '1px';
        entityElement.style.backgroundColor = 'red';
        entityElement.style.zIndex = '9999999';


        root.appendChild(entityElement);
        this.elements.push(entityElement);
    }

    public clear(){
        this.elements.forEach(x => x.remove());
        this.elements = [];
    }
}

export default new Debug();