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
    public damage: number = 10;
    public attackCooldown: number = 0.5; // in seconds
    public currentCooldown: number = 0;
        
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
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        this.movingOffset = {
            x: mouseX - (this.position.x * window.innerWidth),
            y: mouseY - (this.position.y * window.innerHeight)
        };
    }

    public endMove(){
        this.isMoving = false;
        scene.render();


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
        
        // Handle attack cooldown
        if (this.currentCooldown > 0) {
            this.currentCooldown -= deltaTime;
            return;
        }
        
        // Get hitbox
        const hitbox = this.hitbox();
        
        // Check for entities in range
        for (const entity of scene.entities) {
            if (!entity.isMoving || entity.isFinished) continue;
            
            // Calculate distance between tower center and entity
            const distanceX = entity.position.x - hitbox.x;
            const distanceY = entity.position.y - hitbox.y;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // If entity is within range, damage it
            if (distance <= hitbox.radius) {
                const killed = entity.takeDamage(this.damage);
                this.currentCooldown = this.attackCooldown;
                
                // Visual effect for attack
                this.showAttackEffect(entity.position);
                
                // If entity was killed, remove it from the scene
                if (killed) {
                    scene.entities = scene.entities.filter(e => e.id !== entity.id);
                }
                
                // For now, only damage one entity per frame
                break;
            }
        }
    }
    
    private showAttackEffect(targetPosition: {x: number, y: number}) {
        const root = document.getElementById('app');
        if (!root) return;
        
        const effect = document.createElement('div');
        effect.className = 'attack-effect';
        
        // Position the effect between tower and target
        const midX = (this.position.x + targetPosition.x) / 2;
        const midY = (this.position.y + targetPosition.y) / 2;
        
        effect.style.left = `${midX * 100}%`;
        effect.style.top = `${midY * 100}%`;
        
        root.appendChild(effect);
        
        // Remove effect after animation
        setTimeout(() => effect.remove(), 300);
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