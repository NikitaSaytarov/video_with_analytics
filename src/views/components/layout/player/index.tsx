import React, {useEffect, useRef} from "react";
import {Theme} from "@material-ui/core";
import ReactPlayer, {ReactPlayerProps} from "react-player";
import {withTheme} from "styled-components";
import EventsVisualLayer from "../eventsVisualLayer";
import {PlayerInitialization} from "../../../../types/PlayerInitialized";
import {VIDEO_STREAM_URL} from "../../../../const/url";
import extractVideoResolution from "../eventsVisualLayer/code/extractVideoResolution";
import EventsAnalysis from "../eventAnalysis";
import PlayerManagement from "../playerManagement";
import {PlayerManager} from "../../../../types/PlayerManagement";
import { PlayerContainer } from "./style";

const Player: React.FC<{ theme: Theme }> = (_) => {
    const player = useRef<ReactPlayer>(null)
    const playerManagement = useRef<PlayerInitialization>(null)
    const analyticsEventsLayer = useRef<PlayerInitialization>(null)
    const eventAnalysis = useRef<PlayerManager>(null)

    useEffect(() => {
        const initialize = async () => {
            const resolution = await extractVideoResolution(VIDEO_STREAM_URL)
            const playerObj = player.current;

            if (playerObj) {
                if (playerManagement.current)
                    playerManagement.current.initialize(playerObj, resolution)

                if (analyticsEventsLayer.current)
                    analyticsEventsLayer.current.initialize(playerObj, resolution)

                if (eventAnalysis.current)
                    eventAnalysis.current.initialize(playerObj, resolution)
            }
        };

        initialize()
    }, [])

    const onPlay = () => {
        if (eventAnalysis.current)
            eventAnalysis.current.onPlay()
    }

    const onPause = () => {
        if (eventAnalysis.current)
            eventAnalysis.current.onPause()
    }

    const onSeek = (sek: number) => {
        if (eventAnalysis.current)
            eventAnalysis.current.onSeek(sek)
    }

    const onEnded = () => {
        if (eventAnalysis.current)
            eventAnalysis.current.onEnded()
    }


    return (
        <PlayerContainer>
            <ReactPlayer
                config={{
                    file: {
                        attributes: {
                            // @ts-ignore
                            onContextMenu: e => e.preventDefault(),
                            disablepictureinpicture: 'true',
                            controlsList: 'nodownload nofullscreen noremoteplayback'
                        }
                    }
                }}
                pip={false}
                url={VIDEO_STREAM_URL}
                controls={true}
                playing={true}
                onPlay={onPlay}
                onPause={onPause}
                onSeek={onSeek}
                onEnded={onEnded}
                ref={player}/>
            <EventsAnalysis ref={eventAnalysis}/>
            <PlayerManagement ref={playerManagement}/>
            <EventsVisualLayer ref={analyticsEventsLayer}/>
        </PlayerContainer>
    );
}
export default withTheme(Player);