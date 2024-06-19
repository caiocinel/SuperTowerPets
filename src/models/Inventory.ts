import scene from "./Scene";
import Tower from "./Tower";


interface InventoryItem extends Tower{
    isInInventory?: boolean;
}

export default class Inventory{
    public items: InventoryItem[] = [];

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
        tower.isMoving = true;
        tower.movingOffset = {
            x: e.offsetX,
            y: e.offsetY
        }

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