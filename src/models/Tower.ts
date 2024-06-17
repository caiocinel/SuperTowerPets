import scene from "./Scene";

export default class Tower{
    public id: number;
    public position: { x: number, y: number; } = { x: 0, y: 0 };
    public character: string = '❓';
    public isMoving: boolean = false;
        
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
        entityElement.onmousedown = () => this.startMove();

        entityElement.style.left = `${this.position.x * 100}%`;
        entityElement.style.top = `${this.position.y * 100}%`;

        root.appendChild(entityElement);
    }

    protected startMove(){
        this.isMoving = true;
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

    public renderMovingItem() {               
        if(!this.isMoving)
            return;

        const root = document.getElementById('towers');

        if (!root)
            return alert("Failed to find towers div");

        var entityElement = document.getElementById(this.id.toString()) as HTMLDivElement;

        if (entityElement)
            root.removeChild(entityElement);

        entityElement = document.createElement('div');
        
        this.position = {
            x: scene.keyController.mousePosition.x / window.innerWidth - 0.02,
            y: scene.keyController.mousePosition.y / window.innerHeight - 0.02
        }

        entityElement.id = this.id.toString();
        entityElement.className = 'pet';
        entityElement.innerText = this.character;
        entityElement.style.zIndex = '99999';

        entityElement.style.left = `${this.position.x * 100}%`;
        entityElement.style.top = `${this.position.y * 100}%`;

        root.appendChild(entityElement);
    }
}