import Entity from "./models/Entity";
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


const resetFrame = () => {
  console.info("Resetting frame");
  const root = document.getElementById('app');

  if(!root)
    return alert("Failed to find application div");

  root.innerHTML = '';

  const tracksRoot = document.createElement('div');
  tracksRoot.id = 'tracks';
  root.appendChild(tracksRoot);

  const entitiesRoot = document.createElement('div');
  entitiesRoot.id = 'entities';
  root.appendChild(entitiesRoot);

  const petsRoot = document.createElement('div');
  petsRoot.id = 'pets';
  root.appendChild(petsRoot);
  
  
  tracks.draw();
}

document.addEventListener('DOMContentLoaded', () => {
  (document.getElementById('forceRender') as HTMLButtonElement).onclick = () => entityRun();
  resetFrame();
})

const entityRun = async() => {
  entity.run();  
  entity2.run();
}



window.onresize = () => resetFrame();
