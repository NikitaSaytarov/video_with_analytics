import {PlayerInitialization} from "./PlayerInitialized";

export interface PlayerManager extends PlayerInitialization {
    onPlay: () => void
    onPause: () => void
    onEnded: () => void
    onSeek: (sec: number) => void
}