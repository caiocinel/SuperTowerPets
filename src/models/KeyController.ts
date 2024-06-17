export default class KeyController {
    public keys: { [key: string]: boolean } = {};
    public isMouseDown: boolean = false;
    public mousePosition: { x: number, y: number } = { x: 0, y: 0 };

    constructor() {
        document.addEventListener('keydown', this.keyDownHandler);
        document.addEventListener('keyup', this.keyUpHandler);
        document.addEventListener('mousedown', this.mouseDownHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
        document.addEventListener('mousemove', this.mouseMoveHandler);
    }

    private keyDownHandler = (e: KeyboardEvent) => {
        this.keys[e.key] = true;
    }

    private keyUpHandler = (e: KeyboardEvent) => {
        this.keys[e.key] = false;
    }

    private mouseDownHandler = (e: MouseEvent) => {
        this.isMouseDown = true;
    }

    private mouseUpHandler = (e: MouseEvent) => {
        this.isMouseDown = false;
    }    

    public mouseMoveHandler = (e: MouseEvent) => {
        this.mousePosition = { x: e.clientX, y: e.clientY };
    }
}
