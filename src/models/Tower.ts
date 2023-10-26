export default class Tower{
    public id: number;
    public position: { x: number, y: number; } = { x: 0, y: 0 };
    public character: string = '❓';
    public isCursorDown: boolean = false;
    public isDragging: boolean = false;    
        
    constructor() {
        this.id = Math.random();        
    }
}