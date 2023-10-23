import Track from "./models/Track";
import Tracks from "./models/Tracks";

const tracks = new Tracks();

var track = new Track();
track.length = 0.7;
track.orientation = 'x';
track.position = {x: 0, y: 0.3};
tracks.push(track);

var track = new Track();
track.length = 0.3;
track.orientation = 'y';
track.position = {x: 0.7, y: 0.3};
tracks.push(track);

var track = new Track();
track.length = 0.3;
track.orientation = 'x';
track.position = { x: 0.7, y: 0.6 };
tracks.push(track);


const resetFrame = () => {
  console.log("Resetting frame");
  const root = document.getElementById('app');

  if(!root)
    return alert("Failed to find application div");

  root.innerHTML = '';

  const tracksRoot = document.createElement('div');
  tracksRoot.id = 'tracks';
  root.appendChild(tracksRoot);
  
  tracks.draw();
}

document.addEventListener('DOMContentLoaded', () => {
  (document.getElementById('forceRender') as HTMLButtonElement).onclick = () => resetFrame();
  resetFrame();
})

window.onresize = () => resetFrame();
