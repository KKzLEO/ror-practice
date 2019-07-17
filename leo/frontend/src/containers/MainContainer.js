import { connect } from 'react-redux';
import {
    fetchStockData,
    exportStockData
} from '../actions/stockActions';
import Main from '../components/Main/Main'

const mapStateToProps = (state) => {
    return{
        stockData: state.stock.get("stockData"),
        isLoading: state.stock.get('isLoading'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStockData:(parameters)=>{
            dispatch(fetchStockData(parameters));
        },
        exportStockData:(parameters)=>{
            dispatch(exportStockData(parameters));
        }
    }
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);