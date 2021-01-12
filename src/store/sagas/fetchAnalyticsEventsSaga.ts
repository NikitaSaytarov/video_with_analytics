import {put} from "redux-saga/effects";
import {call, all} from "typed-redux-saga";
import {allEventsFetchFail, allEventsFetchSuccess, AnalyticEvent} from "../analytics/analyticsSlice";
import fetchAllAnalyticsEvents from "../../services/fetchAllAnalyticsEvents";

export function* fetchAnalyticsEventsSaga(action: { payload: string; }) {
    try {
        let result = yield call(fetchAllAnalyticsEvents, action.payload);
        yield put(allEventsFetchSuccess(result));
    } catch (e) {
        console.error(e)
        yield put(allEventsFetchFail(e));
    }
}
