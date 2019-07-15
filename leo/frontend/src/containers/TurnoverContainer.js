import { connect } from 'react-redux';
import {
    fetchStockData,
    setQueryParameters
} from '../actions/stockActions';
import Turnover from '../components/Turnover/Turnover'

const mapStateToProps = (state) => {
    return{
        stockData: state.stock.get("stockData"),
        isLoading: state.stock.get('isLoading'),
        parameters: state.stock.get("parameters")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStockData:(parameters)=>{
            dispatch(fetchStockData(parameters));
        },
        setQueryParameters:(parameters)=>{
            return Promise.resolve(dispatch(setQueryParameters(parameters)));
        }
    }
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Turnover);