import React, {useEffect, useRef} from 'react';
import {createStyles, Grid, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import {withTheme} from "styled-components";
import ReactPlayer from 'react-player'
import {useAppDispatch} from "../../../store/store";
import {allEventsFetchRequest} from '../../../store/analytics/analyticsSlice';
import AnalyticsPanel from '../layout/eventsListPanel';
import Player from "../layout/player";
import {ANALYTICS_EVENTS_URL} from "../../../const/url";
import {PlayerContainer, Root, RootGrid, RootPaper, SectionGrid} from './style';

const App: React.FC<{ theme: Theme }> = (_) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(allEventsFetchRequest(ANALYTICS_EVENTS_URL))
    })

    return (
        // @ts-ignore
        <Root>
            <RootGrid container spacing={3}>
                <SectionGrid item xs={6}>
                    <RootPaper>
                        <Typography variant="h5">
                            Analytics events
                        </Typography>
                        <AnalyticsPanel/>
                    </RootPaper>
                </SectionGrid>
                <SectionGrid item xs={6}>
                    <RootPaper>
                        <PlayerContainer>
                            <Player/>
                        </PlayerContainer>
                    </RootPaper>
                </SectionGrid>
            </RootGrid>
        </Root>
    );
}
export default withTheme(App);