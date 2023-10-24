import Entity from "./models/Entity";
import Scene from "./models/Scene";
import Track from "./models/Track";
import Tracks from "./models/Tracks";

const tracks = new Tracks({x: 0, y: 0.3});

tracks.push(new Track({ length: 0.1, orientation: 'x' }));
tracks.push(new Track({ length: 0.2, orientation: 'y' }));
tracks.push(new Track({ length: 0.2, orientation: 'x' }));
tracks.push(new Track({length: 0.3, orientation: 'y'}));
tracks.push(new Track({length: 0.1, orientation: 'x'}));
tracks.push(new Track({length: 0.7, orientation: '-y'}));
tracks.push(new Track({length: 0.1, orientation: 'x'}));


const entity = new Entity();
entity.trackList = tracks;

const entity2 = new Entity();
entity2.trackList = tracks;
entity2.speed = 0.2;


const scene = new Scene();
scene.entities = [entity, entity2];
scene.tracks = tracks;

document.addEventListener('DOMContentLoaded', () => {
  (document.getElementById('forceRender') as HTMLButtonElement).onclick = () => entityRun();
  scene.render()
});

const entityRun = async() => {
  entity.run();  
  entity2.run();
}



window.onresize = () => scene.render();
