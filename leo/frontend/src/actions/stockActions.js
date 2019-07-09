import { createAction } from 'redux-actions';
import {
    FETCH_STOCK_DATA,
    SORT_STOCK_DATA,
    EXPORT_STOCK_FILE,
    FETCH_STOCK_DATA_REQUEST,
    FETCH_STOCK_DATA_SUCCESS,
    FETCH_STOCK_DATA_FAILURE
} from '../constants/actionTypes';


export const fetchStockDataRequest = createAction(FETCH_STOCK_DATA_REQUEST);
export const fetchStockDataSuccess = createAction(FETCH_STOCK_DATA_SUCCESS);
export const fetchStockDataFailure = createAction(FETCH_STOCK_DATA_FAILURE);

export function fetchStockData(parameters){
    return async (dispatch) => {
        dispatch(fetchStockDataRequest());
        try {
            let url = `http://localhost:3000/stock/query?`;
            url = addParametersToUrl(url, parameters);
            const res = await fetch(url, {
                method: 'get'
            });
            const data = await res.json();
            dispatch(fetchStockDataSuccess({data : data, parameters: parameters}));
        }
        catch (error) {
            dispatch(fetchStockDataFailure(error));
        }
    }
}

function addParametersToUrl(url, parameters){
    Object.keys(parameters).reduce((accumulator, key) => {
        if(parameters[key] !== null 
            && parameters[key] !== undefined 
            && parameters[key] !== ""){
                accumulator.push({
                    key: key,
                    value: parameters[key]
                });
            }
        return accumulator;
    },[]).map(obj=>{
        url += `${obj.key}=${obj.value}&`;
        return obj;
    });

    url = url.slice(0, -1);
    return url;
}

// export function fetchStockData(url){
//     return (dispatch) => {
//         dispatch(fetchStockDataRequest());
//         return fetch(url,{
//                 method: 'get'
//             })
//             .then(res =>res.json())
//             .then(data => {
//                 dispatch(fetchStockDataSuccess(data.json()));
//             }).catch(error=>{
//                 dispatch(fetchStockDataFailure(error.json()));
//             });
//     }
// }