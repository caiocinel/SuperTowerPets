import Tower from "./Tower";


interface InventoryItem extends Tower{
    isInInventory?: boolean;
    container?: HTMLDivElement;
}

export default class Inventory{
    public items: InventoryItem[] = [];
    public movingItem?: InventoryItem;

    public addItem(item: (InventoryItem)){               
        item.isInInventory = true;
        this.items.push(item);
   }

    public onMoveStart(obj: InventoryItem) {
        obj.isCursorDown = true;
        obj.isDragging = true;

        this.draw();
    }

    public onMove(obj: InventoryItem, event: MouseEvent){

        if(!obj.isDragging || !obj.container)
            return;
       
        obj.container.style.left = event.clientX.toString();
        obj.container.style.top = event.clientY.toString();            
        obj.container.style.position = 'absolute';
    }

    public onMoveEnd(obj: InventoryItem){
        if(!obj.container)
            return;

        obj.isCursorDown = false;
        obj.isDragging = false;
        obj.container.style.position = '';
    }

    public draw(){
        const invContainer = document.getElementById('inventoryContainer');
        if(!invContainer)
            return alert("Failed to find inventory container");
        
        invContainer.innerHTML = '';

        this.items.filter(x => x.isInInventory).forEach(item => {
            const invItemContainer = document.createElement('div');
            invItemContainer.className = 'inventoryItemContainer';
            invItemContainer.onmousedown = () => this.onMoveStart(item);
            invItemContainer.onmousemove = (e) => this.onMove(item, e);
            invItemContainer.onmouseup = () => this.onMoveEnd(item);
            invItemContainer.onmouseleave = () => this.onMoveEnd(item);
            invItemContainer.id = String(item.id);
            
            const invItem = document.createElement('div');
            invItem.className = 'inventoryItem';
            invItem.innerText = item.character;

            invItemContainer.appendChild(invItem);

            invContainer.appendChild(invItemContainer);

            item.container = invItemContainer;
        })
    }

}