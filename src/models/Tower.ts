export default class Tower{
    public id: number;
    public position: { x: number, y: number; } = { x: 0, y: 0 };
    public character: string = '❓';
    public isCursorDown: boolean = false;
    public isDragging: boolean = false;    
        
    constructor() {
        this.id = Math.random();        
    }

    public draw() {
        const root = document.getElementById('towers');

        if (!root)
            return alert("Failed to find towers div");

        var entityElement = document.getElementById(this.id.toString()) as HTMLDivElement;

        if (entityElement)
            root.removeChild(entityElement);

        entityElement = document.createElement('div');

        entityElement.id = this.id.toString();
        entityElement.className = 'pet';
        entityElement.innerText = this.character;

        entityElement.style.left = `${this.position.x * 100}%`;
        entityElement.style.top = `${this.position.y * 100}%`;

        root.appendChild(entityElement);
    }
}