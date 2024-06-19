import Debug from "./models/Debug";
import Scene from "./models/Scene";

Scene.setTracksInitialPosition({x:0, y:0.3})

Scene.newTrack({ length: 0.1, orientation: 'x' });
Scene.newTrack({ length: 0.1, orientation: 'y' });
Scene.newTrack({ length: 0.2, orientation: 'x' });
Scene.newTrack({length: 0.3, orientation: 'y'});
Scene.newTrack({length: 0.1, orientation: 'x'});
Scene.newTrack({length: 0.4, orientation: '-y'});
Scene.newTrack({length: 0.1, orientation: 'x'});


Scene.newEntity({speed: 1, character: '🚀'});
//Scene.newEntity({ speed: 0.7, character: '🔨' });

Scene.newItem({ character: '🌵', range: 1 });
Scene.newItem({ character: '🧨', range: 1.5 });
Scene.newItem({ character: '🔭', range: 2 });
Scene.newItem({ character: '🧲', range: 2 });

document.addEventListener('DOMContentLoaded', () => {
  (document.getElementById('forceRender') as HTMLButtonElement).onclick = (e) => {
    const currentTarget = e.currentTarget as HTMLButtonElement;
    if(currentTarget.innerText === 'Start'){
      Scene.startGame();
      currentTarget.innerText = 'Stop';
    }else{  
      Scene.endGame();   
      currentTarget.innerText = 'Start'
    }
    
  };
  Scene.render()  
});


window.onresize = () => Scene.render();
