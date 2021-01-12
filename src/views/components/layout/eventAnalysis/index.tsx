import {useSelector} from "react-redux";
import {
    activeEventsSet,
    allEventsSelector,
    AnalyticEventBase
} from "../../../../store/analytics/analyticsSlice";
import React, {forwardRef, Ref, useImperativeHandle, useState} from "react";
import ReactPlayer from "react-player";
import {PlayerManager} from "../../../../types/PlayerManagement";
import * as Comlink from "comlink";
// @ts-ignore
import EventAnalysisService from 'comlink-loader!../../../../workers/eventAnalysis.worker';
import {ended, initializeAnalysis, pause, play, seek} from "../../../../workers/eventAnalysis.worker";
import {useAppDispatch} from "../../../../store/store";

const EventAnalysis = forwardRef((props, ref: Ref<PlayerManager>) => {
    const allEvents = useSelector(allEventsSelector)
    const dispatch = useAppDispatch()

    useImperativeHandle(ref, () => ({initialize, onEnded, onPause, onPlay, onSeek}))

    const [state, setState] = useState<{ player: ReactPlayer | null }>({player: null})
    const {player} = state

    const initialize = async (player: ReactPlayer) => {
        setState({player})
    }

    const onPlay = async () => {
        await play();
    }

    const onPause = async () => {
        await pause();
    }

    const onEnded = async () => {
        await ended();
    }

    const onSeek = async (sec: number) => {
        await seek(sec);
    }

    const activeEventsCallback = (eventIds: number[]) => {
        if (eventIds && eventIds.length > 0) {
            const activeEvents = allEvents.filter(e => eventIds.includes(e.id))
            dispatch(activeEventsSet(activeEvents))
        } else { // no events
            dispatch(activeEventsSet([]))
        }
    }

    async function startAnalyze() {
        const events = allEvents as AnalyticEventBase[]
        await initializeAnalysis(events, Comlink.proxy(activeEventsCallback))
    }

    if (allEvents && allEvents.length !== 0) {
        startAnalyze()
    }

    return (
        <React.Fragment/>
    );
})

export default EventAnalysis