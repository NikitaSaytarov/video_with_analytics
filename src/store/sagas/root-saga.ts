import {takeEvery} from 'redux-saga/effects'
import { allEventsFetchRequest } from '../analytics/analyticsSlice';
import {fetchAnalyticsEventsSaga} from "./fetchAnalyticsEventsSaga";

export default function* rootSaga() {
    yield takeEvery(allEventsFetchRequest, fetchAnalyticsEventsSaga);
}