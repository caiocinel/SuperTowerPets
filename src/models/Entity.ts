import Track from "./Track";
import Tracks from "./Tracks";

export default class Entity{
    public id: number;
    public position: { x: number, y: number; };
    public trackList: Tracks | null;
    public currentTrack: Track | null;
    public isMoving: boolean;


    constructor() {
        this.id = Math.random();
        this.position = { x: 0, y: 0 };
        this.currentTrack = null;
        this.isMoving = false;
        this.trackList = null;
    }    
}