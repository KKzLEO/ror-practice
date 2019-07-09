import * as types from '../constants/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    isLoading: false,
    stockData: [],
    parameters:{
        count:50,
        companyId:"",
        date:"",
        sortMethod:"asc",
        sortField:"company_id",
        lastSortField:"company_id"
    },
    downloadLink: ""
});

export default function stockReducer(state = initialState, action){
    switch(action.type){
        case types.FETCH_STOCK_DATA_REQUEST:
            return state.set("isLoading",true);
        case types.FETCH_STOCK_DATA_SUCCESS:
            return state.set("stockData",action.payload.data)
                        .set("isLoading",false)
                        .set("parameters",action.payload.parameters);
        default:
            return state;
    }
}