import {AnalyticEvent} from "../../../../../store/analytics/analyticsSlice";
import VideoResolution from "../../../../../types/VideoResolution";

const drawingActiveEvents = (events: AnalyticEvent[],
                             canvas: HTMLCanvasElement,
                             videoResolution : VideoResolution,
                             playerSize: { width: number, height: number }): void => {

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.lineWidth = 3
    ctx.strokeStyle = "green"

    for (const activeEvent of events) {
        const rectZone = activeEvent.zone;

        const relativeLeft = rectZone.left /  videoResolution.width
        const relativeTop = rectZone.top / videoResolution.height
        const relativeWidth = rectZone.width /  videoResolution.width
        const relativeHeight = rectZone.height / videoResolution.height

        let left = relativeLeft * playerSize.width
        let top = relativeTop * playerSize.height;
        let width = relativeWidth * playerSize.width;
        let height = relativeHeight * playerSize.height;

        ctx.strokeRect(left, top, width, height)
    }
}

export default drawingActiveEvents