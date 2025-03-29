import scene from "./Scene";
import Tower from "./Tower";

interface InventoryItem extends Tower{
    isInInventory?: boolean;
}

export default class Inventory{
    public items: InventoryItem[] = [];
    public element!: HTMLDivElement;

    public addItem(item: (InventoryItem)){               
        item.isInInventory = true;
        this.items.push(item);
   }

   public getItem(id: number){
         return this.items.find(x => x.id === id);
   }

    public onClick(item: InventoryItem, e: MouseEvent) {
        item.isInInventory = false;
        const tower = scene.addTower(item);
        
        // Position the tower at the cursor location
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate tower position as percentage of window dimensions
        tower.position = {
            x: mouseX / window.innerWidth,
            y: mouseY / window.innerHeight
        };
        
        // Set up for dragging - this is critical for proper drag behavior
        tower.isMoving = true;
        
        // Use an appropriate offset that works with the Tower.renderMovingItem logic
        // This essentially means "no offset" since we want the tower to follow the cursor directly
        tower.movingOffset = {
            x: mouseX - (tower.position.x * window.innerWidth) + 24,
            y: mouseY - (tower.position.y * window.innerHeight) + 24
        };
        
        this.draw();
    }

    public draw(){
        const invContainer = document.getElementById('inventoryContainer');
        if(!invContainer)
            return alert("Failed to find inventory container");
        
        invContainer.innerHTML = '';

        this.items.filter(x => x.isInInventory).forEach(item => {
            const invItemContainer = document.createElement('div');
            invItemContainer.className = 'inventoryItemContainer';
            invItemContainer.onmousedown = (e) => this.onClick(item, e);
            invItemContainer.id = String(item.id);
            
            const invItem = document.createElement('div');
            invItem.className = 'inventoryItem';
            invItem.innerText = item.character;

            invItemContainer.appendChild(invItem);

            invContainer.appendChild(invItemContainer);
        })
    }

}