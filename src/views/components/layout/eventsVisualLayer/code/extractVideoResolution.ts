import VideoResolution from "../../../../../types/VideoResolution";

const extractVideoResolution = (url : string): Promise<VideoResolution> => {
    return new Promise<VideoResolution>(async (resolve, reject) => {

        const video = document.createElement('video');
        video.onloadedmetadata = () => {
            resolve({
                width : video.videoWidth,
                height : video.videoHeight
            })
        }
        video.src = url
    });

}

export default extractVideoResolution