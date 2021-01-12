import {createSlice, PayloadAction, createEntityAdapter, Selector} from "@reduxjs/toolkit";
import {ApplicationState} from "../store";
import update from "immutability-helper";

export interface AnalyticEventBase {
    id: number,
    timestamp: number,
    duration: number,
}

export interface AnalyticEvent extends AnalyticEventBase{
    title: string,
    zone: {
        height: number,
        left: number,
        top: number,
        width: number
    }
}

export interface AnalyticState {
    events: AnalyticEvent[],
    fetchEventsFailedMessage: string | null,
    fetchEventsUrl: string,
    activeEvents: AnalyticEvent[],
    selectedEvent: AnalyticEvent | null
}

const defaultState: AnalyticState = {
    events: [],
    fetchEventsFailedMessage: null,
    fetchEventsUrl: "http://www.mocky.io/v2/5e60c5f53300005fcc97bbdd",
    activeEvents: [],
    selectedEvent: null
}

const slice = createSlice({
    name: "analytics",
    initialState: defaultState,
    reducers: {
        allEventsFetchRequest: (state: AnalyticState, action: PayloadAction<string>) =>
            update(state, {
                fetchEventsUrl: {$set: action.payload},
            }),
        allEventsFetchSuccess: (state: AnalyticState, action: PayloadAction<AnalyticEvent[]>) =>
            update(state, {
                events: {$set: action.payload},
                fetchEventsFailedMessage: {$set: null}
            }),
        allEventsFetchFail: (state: AnalyticState, action: PayloadAction<string>) =>
            update(state, {
                fetchEventsFailedMessage: {$set: action.payload}
            }),
        activeEventsSet: (state: AnalyticState, action: PayloadAction<AnalyticEvent[]>) =>
            update(state, {
                activeEvents: {$set: action.payload}
            }),
        eventSelected: (state: AnalyticState, action: PayloadAction<AnalyticEvent | null>) =>
            update(state, {
                selectedEvent: {$set: action.payload}
            })
    }
});

export const allEventsSelector: Selector<ApplicationState, AnalyticEvent[]> =
    (state: ApplicationState) => state.analytics.events;

export const activeEventsSelector: Selector<ApplicationState, AnalyticEvent[]> =
    (state: ApplicationState) => state.analytics.activeEvents;

export const eventSelectedSelector: Selector<ApplicationState, AnalyticEvent | null> =
    (state: ApplicationState) => state.analytics.selectedEvent;

const {actions, reducer} = slice;
export const {
    allEventsFetchSuccess,
    allEventsFetchFail,
    activeEventsSet,
    allEventsFetchRequest,
    eventSelected
} = actions;
const analyticsReducer = reducer
export default analyticsReducer