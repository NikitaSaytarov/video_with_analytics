import {useSelector} from "react-redux";
import {activeEventsSelector, allEventsSelector, AnalyticEvent} from "../../../../store/analytics/analyticsSlice";
import React, {forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState} from "react";
import ReactPlayer from "react-player";
import {PlayerInitialization} from "../../../../types/PlayerInitialized";
import {ApplicationState} from "../../../../store/store";
import drawingActiveEvents from "./code/drawEventRectangle";
import VideoResolution from "../../../../types/VideoResolution";
import {StyledCanvas, VideoEventsLayerContainer} from "./style";

const EventsVisualLayer = forwardRef((props, ref: Ref<PlayerInitialization>) => {
    useImperativeHandle(ref, () => ({initialize}))
    const canvas = useRef<HTMLCanvasElement>(null)

    const [state, setState] = useState<{ player: ReactPlayer | null, videoResolution: VideoResolution }>({
        player: null,
        videoResolution: {height: 0, width: 0}
    })
    const {player, videoResolution} = state

    const activeEvents = useSelector(activeEventsSelector)

    const initialize = async (player: ReactPlayer, videoResolution: VideoResolution) => {
        setState({player, videoResolution})

        const canvasObj = canvas.current as HTMLCanvasElement;
        canvasObj.setAttribute('width', '640');
        canvasObj.setAttribute('height', '360');
    }

    const cleanUp = (canvas: HTMLCanvasElement) => {
        if (!canvas)
            return

        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    if (activeEvents) {
        const canvasObj = canvas.current as HTMLCanvasElement;
        cleanUp(canvasObj)

        if (activeEvents.length > 0) {
            const reactPlayer = player as ReactPlayer
            const props = reactPlayer.props
            let playerHeightStr = props.height as string
            let playerWidthStr = props.width as string

            let playerHeight = +playerHeightStr.substring(0, playerHeightStr.length - 2)
            let playerWidth = +playerWidthStr.substring(0, playerWidthStr.length - 2)


            drawingActiveEvents(activeEvents,
                canvasObj,
                videoResolution,
                {
                    height: playerHeight,
                    width: playerWidth,
                }
            )
        }
    }

    return (
        <VideoEventsLayerContainer>
            <StyledCanvas ref={canvas}/>
        </VideoEventsLayerContainer>
    )
})

export default EventsVisualLayer