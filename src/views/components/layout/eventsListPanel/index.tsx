import React from "react";
import {Theme} from "@material-ui/core";
import {useAppDispatch} from "../../../../store/store";
import {withTheme} from "styled-components";
import {useSelector} from "react-redux";
import {
    allEventsSelector,
    AnalyticEvent,
    eventSelected,
    eventsFetchFail
} from "../../../../store/analytics/analyticsSlice";
import {EventFetchErrorContainer, EventLink, EventsPanel} from "./style";

const EventsListPanel: React.FC<{ theme: Theme }> = (_) => {
    const dispatch = useAppDispatch()
    const allEvents = useSelector(allEventsSelector)
    const eventsFetchFailMessage = useSelector(eventsFetchFail)

    const eventSelectionHandle = (event: AnalyticEvent) => {
        dispatch(eventSelected(event))
    }

    // @ts-ignore
    return (
        <div>
            <EventsPanel>
                {
                    allEvents.map((event: AnalyticEvent, i) =>
                        <EventLink onClick={() => eventSelectionHandle(event)}
                            // @ts-ignore
                                   component="button"
                                   variant="body2"
                                   rel="noreferrer">
                            {event.title + ", "}
                        </EventLink>
                    )
                }
            </EventsPanel>
        </div>
    );
}
export default withTheme(EventsListPanel);