import Entity from "./models/Entity";
import Track from "./models/Track";
import Tracks from "./models/Tracks";

const tracks = new Tracks();

var track = new Track();
track.length = 0.3;
track.orientation = 'x';
track.position = { x: 0, y: 0.3 };
tracks.push(track);

var track = new Track();
track.length = 0.3;
track.orientation = 'y';
track.position = { x: 0.3, y: 0.3 };
tracks.push(track);

var track = new Track();
track.length = 0.4;
track.orientation = 'x';
track.position = { x: 0.30, y: 0.6 };
tracks.push(track);

var track = new Track();
track.length = 0.3;
track.orientation = 'y';
track.position = { x: 0.7, y: 0.6 };
tracks.push(track);

var track = new Track();
track.length = 0.1;
track.orientation = 'x';
track.position = { x: 0.7, y: 0.9 };
tracks.push(track);

var track = new Track();
track.length = 0.6;
track.orientation = '-y';
track.position = { x: 0.8, y: 0.3 };
tracks.push(track);

var track = new Track();
track.length = 0.6;
track.orientation = '-x';
track.position = { x: 0.4, y: 0.3 };
tracks.push(track);

var track = new Track();
track.length = 0.2;
track.orientation = '-y';
track.position = { x: 0.4, y: 0.1 };
tracks.push(track);

var track = new Track();
track.length = 0.6;
track.orientation = 'x';
track.position = { x: 0.4, y: 0.1 };
tracks.push(track);

const entity = new Entity();
entity.trackList = tracks;


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
  await entity.run();
}



window.onresize = () => resetFrame();
