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

    public draw(){
        const invContainer = document.getElementsByClassName('inventoryContainer')[0];
        if(!invContainer)
            return alert("Failed to find inventory container");        

        this.items.forEach(item => {
            const invItemContainer = document.createElement('div');
            invItemContainer.className = 'inventoryItemContainer';
            
            const invItem = document.createElement('div');
            invItem.className = 'inventoryItem';
            invItem.innerText = item.character;

            invItemContainer.appendChild(invItem);

            invContainer.appendChild(invItemContainer);
        })
    }







}