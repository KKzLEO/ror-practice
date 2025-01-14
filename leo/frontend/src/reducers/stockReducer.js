import * as types from '../constants/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isLoading: false,
    stockData: []
});

export default function stockReducer(state = initialState, action){
    switch(action.type){
        case types.FETCH_STOCK_DATA_REQUEST:
            return state.set("isLoading",true);
        case types.FETCH_STOCK_DATA_SUCCESS:
            return state.set("stockData",action.payload.data)
                        .set("isLoading",false);
        case types.EXPORT_STOCK_DATA_REQUEST:
            return state.set("isLoading",true);
        case types.EXPORT_STOCK_DATA_SUCCESS:
        case types.EXPORT_STOCK_DATA_FAILURE:
        case types.FETCH_STOCK_DATA_FAILURE:
            return state.set("isLoading",false);
        default:
            return state;
    }
}