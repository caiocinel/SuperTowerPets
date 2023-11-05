import Scene from "./models/Scene";

Scene.setTracksInitialPosition({x:0, y:0.3})

Scene.newTrack({ length: 0.1, orientation: 'x' });
Scene.newTrack({ length: 0.2, orientation: 'y' });
Scene.newTrack({ length: 0.2, orientation: 'x' });
Scene.newTrack({length: 0.3, orientation: 'y'});
Scene.newTrack({length: 0.1, orientation: 'x'});
Scene.newTrack({length: 0.7, orientation: '-y'});
Scene.newTrack({length: 0.1, orientation: 'x'});


Scene.newEntity({speed: 0.1, character: '🛠️'});
Scene.newEntity({speed: 0.3, character: '🔨'});

Scene.newItem({character: '🐀'});
Scene.newItem({ character: '🤣' });
Scene.newItem({ character: '🤡' });
Scene.newItem({ character: '§' });
Scene.newItem({ character: '₢' });

Scene.newPet({character: "X"});

document.addEventListener('DOMContentLoaded', () => {
  (document.getElementById('forceRender') as HTMLButtonElement).onclick = () => Scene.renderEntities();
  document.onmousemove = Scene.inventoryMoveHandler;
  Scene.render()  
});


window.onresize = () => Scene.render();
