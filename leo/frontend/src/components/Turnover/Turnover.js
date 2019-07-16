import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './Turnover.module.scss';
import Icon from '@material-ui/core/Icon';
import Loader from '../Loader/Loader';

export default class Turnover extends Component {

    componentDidMount(){
        this.props.fetchStockData(this.props.parameters);
    }

    sortByField(sortField){
        let parameters = {
            sortField: sortField,
            lastSortField: this.props.parameters.get('sortField'),
            sortMethod: this.props.parameters.get('sortField') !== sortField ? 'asc' :
                        this.props.parameters.get('sortMethod') === 'asc' ? 'desc' : 'asc'
        }

        this.props.setQueryParameters(parameters)
            .then(()=>{
                this.props.fetchStockData(this.props.parameters);
            });
    }

    render() {
        const { stockData, parameters } = this.props;
        const columnInfo = [
            {fieldCode:"company_id", fieldName:"代號"},
            {fieldCode:"company_name", fieldName:"名稱"},
            {fieldCode:"opening_price", fieldName:"開盤價"},
            {fieldCode:"max_price", fieldName:"最高價"},
            {fieldCode:"min_price", fieldName:"最低價"},
            {fieldCode:"yesterday_closing_price", fieldName:"昨收盤"},
            {fieldCode:"today_closing_price", fieldName:"今收盤"},
            {fieldCode:"volume", fieldName:"成交量"},
            {fieldCode:"up_down_value", fieldName:"漲跌"},
            {fieldCode:"percentage_up_down_value", fieldName:"漲跌幅"}
        ];
        return (
            <Paper>
                <Loader isShow={this.props.isLoading} />
                <Table size="small" className={styles.article}>
                    <TableHead>
                        <TableRow>
                            {
                                columnInfo.map((column)=>(
                                    <TableCell key={column.fieldCode} onClick={()=>this.sortByField(column.fieldCode)} align="right" className={styles.table_head}>{column.fieldName}
                                        {
                                            column.fieldCode === parameters.get('sortField') ? <Icon className={styles.icon_order}>{parameters.get('sortMethod') === 'asc' ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</Icon> : false
                                        }
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {stockData.map(stock => (
                        <TableRow key={stock.id}>
                            <TableCell align="right">{stock.company_id}</TableCell>
                            <TableCell align="right">
                                <a className={styles.company_name} href={stock.company_href} target="_blank" rel="noopener noreferrer">
                                    {stock.company_name}
                                </a>
                            </TableCell>
                            <TableCell align="right">{stock.opening_price}</TableCell>
                            <TableCell align="right">{stock.max_price}</TableCell>
                            <TableCell align="right">{stock.min_price}</TableCell>
                            <TableCell align="right">{stock.yesterday_closing_price}</TableCell>
                            <TableCell align="right">{stock.today_closing_price}</TableCell>
                            <TableCell align="right">{stock.volume.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</TableCell>
                            <TableCell align="right">
                                {
                                    stock.status === 'up' ? <Icon className={styles.icon_up}>arrow_drop_up</Icon> : 
                                    stock.status === 'down' ? <Icon className={styles.icon_down}>arrow_drop_down</Icon> :
                                    false
                                }
                                {stock.up_down_value}
                            </TableCell>
                            <TableCell align="right">{stock.percentage_up_down_value}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
            
        )
    }
}
