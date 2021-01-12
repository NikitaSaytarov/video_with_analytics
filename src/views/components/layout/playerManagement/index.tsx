import {useSelector} from "react-redux";
import {AnalyticEvent, eventSelected} from "../../../../store/analytics/analyticsSlice";
import React, {forwardRef, Ref, useImperativeHandle, useState} from "react";
import {PlayerInitialization} from "../../../../types/PlayerInitialized";
import ReactPlayer from "react-player";
import {ApplicationState, useAppDispatch} from "../../../../store/store";

const PlayerManagement = forwardRef((props, ref: Ref<PlayerInitialization>) => {
    const selectedEvent: AnalyticEvent = useSelector<ApplicationState>(state => state.analytics.selectedEvent) as AnalyticEvent
    const dispatch = useAppDispatch()
    useImperativeHandle(ref, () => ({initialize}))

    const [state, setState] = useState<{ player: ReactPlayer | null }>({player: null})
    const {player} = state

    const initialize = async (player: ReactPlayer) => {
        setState({player})
    }

    if (player && selectedEvent) {
        const timestamp = selectedEvent.timestamp;
        const shiftSec = timestamp / 1000;
        player.seekTo(shiftSec, 'seconds')

        dispatch(eventSelected(null))
    }


    return (
        <React.Fragment/>
    );
})

export default PlayerManagement