import React, { Component } from 'react'
import Search from '../Search/Search'
import Turnover from '../Turnover/Turnover'
import Container from '@material-ui/core/Container'

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            parameters:{
                count:50,
                companyId:"",
                date: "",
                sortMethod:"asc",
                sortField:"company_id",
                lastSortField:"company_id"
            }
        }
    }

    componentDidMount() {
        this.props.fetchStockData(this.state.parameters);
    }

    searchStockData(parameters){
        this.setState({
            parameters: Object.assign({},this.state.parameters, parameters)
        },()=>this.props.fetchStockData(this.state.parameters));
    }

    exportStockData(parameters){
        this.setState({
            parameters: Object.assign({},this.state.parameters, parameters)
        },()=>this.props.exportStockData(this.state.parameters));
    }

    render() {
        const { stockData, isLoading } = this.props;
        let turnoverProps = {
            stockData,
            searchStockData: (parameters)=>this.searchStockData(parameters),
            parameters: this.state.parameters,
            isLoading
        }
        let searchProps = {
            parameters: this.state.parameters,
            searchStockData: (parameters)=>this.searchStockData(parameters),
            exportStockData: (parameters)=>this.exportStockData(parameters),
            isLoading
        }
        return (
            <Container maxWidth="md">
                <Search {...searchProps} />
                <Turnover {...turnoverProps} />
            </Container>
        )
    }
}
