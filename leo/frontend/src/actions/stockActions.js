import { createAction } from 'redux-actions';
import { addParametersToUrl } from '../utilities/urlTools';
import {
    FETCH_STOCK_DATA_REQUEST,
    FETCH_STOCK_DATA_SUCCESS,
    FETCH_STOCK_DATA_FAILURE,
    EXPORT_STOCK_DATA_REQUEST,
    EXPORT_STOCK_DATA_SUCCESS,
    EXPORT_STOCK_DATA_FAILURE,
    SET_QUERY_PARAMETERS_REQUEST
} from '../constants/actionTypes';

export const fetchStockDataRequest = createAction(FETCH_STOCK_DATA_REQUEST);
export const fetchStockDataSuccess = createAction(FETCH_STOCK_DATA_SUCCESS);
export const fetchStockDataFailure = createAction(FETCH_STOCK_DATA_FAILURE);
export const exportStockDataRequest = createAction(EXPORT_STOCK_DATA_REQUEST);
export const exportStockDataSuccess = createAction(EXPORT_STOCK_DATA_SUCCESS);
export const exportStockDataFailure = createAction(EXPORT_STOCK_DATA_FAILURE);

export const setQueryParametersRequest = createAction(SET_QUERY_PARAMETERS_REQUEST);

export function setQueryParameters(parameters){
    return (dispatch) => {
        Promise(dispatch(setQueryParametersRequest(parameters)));
    }
}

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
            dispatch(fetchStockDataFailure());
        }
    }
}

export function exportStockData(parameters){
    return async (dispatch) => {
        dispatch(exportStockDataRequest());
        let url = `http://localhost:3000/stock/csv?`;
        url = addParametersToUrl(url, parameters);
        try {
            const res = await fetch(url);
            res.blob().then(blob => {
                let blobUrl = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = blobUrl;
                a.download = "file.csv";
                a.click();
                a.remove();
                dispatch(exportStockDataSuccess());
            });
        }
        catch (error) {
            dispatch(exportStockDataFailure());
        }
    }
}

// export function fetchStockData(parameters){
//     return (dispatch) => {
//         dispatch(fetchStockDataRequest());
//         let url = `http://localhost:3000/stock/query?`;
//         url = addParametersToUrl(url, parameters);
//         return fetch(url,{
//                 method: 'get'
//             })
//             .then(res =>{
//                 res.clone().blob().then( blob => {
//                     let blobUrl = window.URL.createObjectURL(blob);
//                 })
//                 return res.json()
//             }).then(data => {
//                 dispatch(fetchStockDataSuccess({data : data, parameters: parameters, downloadLink: ""}));
//             }).catch(error=>{
//                 dispatch(fetchStockDataFailure(error));
//             });
//     }
// }