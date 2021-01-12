import ReactPlayer from "react-player";
import VideoResolution from "./VideoResolution";

export interface PlayerInitialization {
    initialize: (player: ReactPlayer, resolution: VideoResolution) => void
}

