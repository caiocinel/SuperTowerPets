import Debug from "./Debug";
import scene from "./Scene";

export default class Tower{
    public id: number;
    public position: { x: number, y: number; } = { x: 0, y: 0 };
    public character: string = '❓';
    public isMoving: boolean = false;
    public movingOffset: { x: number , y: number } = { x: 0, y: 0}
    public range = 0;
    public element: HTMLDivElement | null = null;
        
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
        entityElement.onmousedown = (e) => this.startMove(e);

        entityElement.style.left = `${this.position.x * 100}%`;
        entityElement.style.top = `${this.position.y * 100}%`;

        this.element = entityElement;

        root.appendChild(entityElement);
    }

    protected startMove(e: MouseEvent){
        this.isMoving = true;
        
        // Save the current mouse position
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate the offset as the difference between mouse position and current tower position
        this.movingOffset = {
            x: mouseX - (this.position.x * window.innerWidth),
            y: mouseY - (this.position.y * window.innerHeight)
        };
    }

    public endMove(){
        this.isMoving = false;
        scene.render();


        //check if on endMove the tower is over inventoryContainer
        const inventoryContainer = document.getElementById('inventoryContainer');
        if(!inventoryContainer)
            return alert("Failed to find inventory container");

        const rect = inventoryContainer.getBoundingClientRect();
        const entityElement = document.getElementById(this.id.toString()) as HTMLDivElement;

        if(!entityElement)
            return;

        const entityRect = entityElement.getBoundingClientRect();

        if(entityRect.x > rect.x && entityRect.x < rect.x + rect.width && entityRect.y > rect.y && entityRect.y < rect.y + rect.height){
            const inventoryItem = scene.inventory.getItem(this.id);

            if(!inventoryItem)
                return alert("Failed to find inventory item");

            inventoryItem.isInInventory = true;
            scene.removeTower(this.id);

            scene.render();
        }

    }
    
    public hitbox(){
        if (!this.element) return {
            x: 0,
            y: 0,
            radius: 0
        };

        const elementRect = this.element.getBoundingClientRect();

        const elementWidth = elementRect.width / window.innerWidth;
        const elementHeight = elementRect.height / window.innerHeight;

        const centerX = this.position.x + (elementWidth / 2);
        const centerY = this.position.y + (elementHeight / 2);

        const normalizedRadius = (this.range * 25) / Math.min(window.innerWidth, window.innerHeight);


        return {
            x: centerX,
            y: centerY,
            radius: normalizedRadius
        }
    }

    public renderDebugHitbox() {
        if (!this.element) return;
        
        const hitbox = this.hitbox();
        
        Debug.Circle({
            x: hitbox.x,
            y: hitbox.y,
            radius: hitbox.radius,
            color: 'rgba(255, 0, 0, 0.5)',
            opacity: 0.3
        });
        
        Debug.Text({
            x: hitbox.x,
            y: hitbox.y - hitbox.radius - 0.02,
            text: `Range: ${this.range}px`,
            color: 'white',
            size: 12
        });
    }

    public async hit(deltaTime: number = 1/60){
        this.renderDebugHitbox();        
    }

    public renderMovingItem() {               
        if(!this.isMoving)
            return;

        const root = document.getElementById('towers');

        if (!root)
            return alert("Failed to find towers div");

        var entityElement = document.getElementById(this.id.toString()) as HTMLDivElement;                        
       
        this.position = {
            x: Math.max(0, Math.min(1, (scene.input.mousePosition.x - this.movingOffset.x) / window.innerWidth)),
            y: Math.max(0, Math.min(1, (scene.input.mousePosition.y - this.movingOffset.y) / window.innerHeight))
        };
        
        if (entityElement)
            root.removeChild(entityElement);
        
        entityElement = document.createElement('div');
        entityElement.id = this.id.toString();
        entityElement.className = 'pet';
        entityElement.innerText = this.character;
        entityElement.style.zIndex = '99999';

        entityElement.style.left = `${this.position.x * 100}%`;
        entityElement.style.top = `${this.position.y * 100}%`;

        root.appendChild(entityElement);
    }
}