import Scene from "./models/Scene";

const scene = new Scene();

scene.setTracksInitialPosition({x:0, y:0.3})

scene.newTrack({ length: 0.1, orientation: 'x' });
scene.newTrack({ length: 0.2, orientation: 'y' });
scene.newTrack({ length: 0.2, orientation: 'x' });
scene.newTrack({length: 0.3, orientation: 'y'});
scene.newTrack({length: 0.1, orientation: 'x'});
scene.newTrack({length: 0.7, orientation: '-y'});
scene.newTrack({length: 0.1, orientation: 'x'});


scene.newEntity({speed: 0.1, character: '🛠️'});
scene.newEntity({speed: 0.3, character: '🔨'});

document.addEventListener('DOMContentLoaded', () => {
  (document.getElementById('forceRender') as HTMLButtonElement).onclick = () => scene.renderEntities();
  scene.render()
});


window.onresize = () => scene.render();
