import {AnalyticEventBase} from "../store/analytics/analyticsSlice";

let isPlaying = false;
let playerTimeMs: number = 0;
let activeEventIdsCallback: (ids: number[]) => void;
let lastActiveEventIds: number[] = [];

export const ended = async (): Promise<void> => {
    isPlaying = false;
    playerTimeMs = 0;
}

export const seek = async (sec: number): Promise<void> => {
    playerTimeMs = sec * 1000;
}

export const pause = async (): Promise<void> => {
    isPlaying = false;
}

export const play = async (): Promise<void> => {
    isPlaying = true;
}

export const initializeAnalysis = async (events: AnalyticEventBase[], callback: (ids: number[]) => void): Promise<void> => {
    activeEventIdsCallback = callback

    while (true) {
        const tStartMs = performance.now()
        const playerTime = playerTimeMs

        await delay(1)

        if (!isPlaying)
            continue;

        const activeEvents = events
            .filter(e => (playerTime >= e.timestamp) && (playerTime <= (e.timestamp + e.duration)))
            .map(e => e.id);

        if (lastActiveEventIds.toString() !== activeEvents.toString() && playerTime === playerTimeMs) {
            activeEventIdsCallback(activeEvents)
            lastActiveEventIds = activeEvents;
        }

        await delay(1)

        const tEndMs = performance.now()
        const tDiffMs = Math.round(tEndMs - tStartMs)

        if (playerTime !== playerTimeMs)
            continue

        playerTimeMs += (tDiffMs)
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
