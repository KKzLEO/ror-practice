import { connect } from 'react-redux';
import {
    fetchStockData
} from '../actions/stockActions';
import Search from '../components/Search/Search'

const mapStateToProps = (state) => {
    return{
        parameters: state.stock.get("parameters"),
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
)(Search);