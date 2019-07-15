import { connect } from 'react-redux';
import {
    fetchStockData,
    exportStockData,
    setQueryParameters
} from '../actions/stockActions';
import Search from '../components/Search/Search'

const mapStateToProps = (state) => {
    return{
        parameters: state.stock.get("parameters")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStockData:(parameters)=>{
            dispatch(fetchStockData(parameters));
        },
        exportStockData:(parameters)=>{
            dispatch(exportStockData(parameters));
        },
        setQueryParameters:(parameters)=>{
            return Promise.resolve(dispatch(setQueryParameters(parameters)));
        }
    }
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Search);