import {AnalyticEvent} from "../store/analytics/analyticsSlice";
import axios from 'axios';
import moment from "moment/moment";

const fetchAllAnalyticsEvents = (url: string) => {
    return axios
        .get(url)
        .then(response => {
            const analyticEvents: AnalyticEvent[] = response
                .data
                .map((eventRaw: any) => {
                    const analyticsItem = <AnalyticEvent>eventRaw
                    const date = new Date(analyticsItem.timestamp)
                    analyticsItem.title = moment(date).format("mm:ss:SSS")
                    return analyticsItem
                })
                .sort((first: AnalyticEvent, second: AnalyticEvent) => {
                    return first.timestamp - second.timestamp;
                })

            return analyticEvents
        })
}

// @ts-ignore
export default fetchAllAnalyticsEvents