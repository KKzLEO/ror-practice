import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/stockActions'
import * as types from '../constants/actionTypes'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import Immutable from 'immutable';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates FETCH_STOCK_DATA when fetching stock has been done', () => {
        fetchMock.get('*', {
            body: []
        })

        const expectedActions = [
            { type: types.FETCH_STOCK_DATA_REQUEST },
            { type: types.FETCH_STOCK_DATA_SUCCESS, payload: {data : []} }
        ]
        const store = mockStore({ stockData: [],parameters:{} })

        return store.dispatch(actions.fetchStockData({})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates FETCH_STOCK_DATA when fetching stock fail', () => {
        fetchMock.get('*', {
            body: []
        })

        const expectedActions = [
            { type: types.FETCH_STOCK_DATA_REQUEST },
            { type: types.FETCH_STOCK_DATA_FAILURE }
        ]
        const store = mockStore({ stockData: [],parameters:{} })

        return store.dispatch(actions.fetchStockData()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})