import { connect } from 'react-redux';
import {
    fetchStockData
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
        }
    }
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Turnover);