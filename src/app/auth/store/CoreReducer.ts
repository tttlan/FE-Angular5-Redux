import {
    ActionReducerMap,
    ActionReducer,
    MetaReducer,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { RouterStateUrl } from '../../utils/Utils';
import { AppSettings } from '../../shared/enums/AppSettings';

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = AppSettings.ENVIRONMENT === 'dev' ? [logger, storeFreeze] : [];
