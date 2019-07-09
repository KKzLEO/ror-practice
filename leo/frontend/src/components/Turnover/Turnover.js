import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './Turnover.module.scss';
import Icon from '@material-ui/core/Icon';

export default class Turnover extends Component {

    constructor(props){
        super(props);
        this.state = {
            parameters:{
                sortField: "company_id",
                sortMethod: "asc"
            }
        }
    }

    componentDidMount(){
        this.handleSearch();
    }

    handleSearch(){
        this.props.fetchStockData(this.state.parameters);
        // fetch(url,{
        //     method: 'get'
        // })
        // .then(res =>res.json())
        // .then(data => {
        //     this.setState({
        //         stockData: data
        //     });
        // });
        // fetch(url,{
        //     method: 'get'
        // })
        // .then(res =>{
        //     res.clone().blob().then( blob => {
        //         let blobUrl = window.URL.createObjectURL(blob);
        //         this.setState({
        //             downloadLink: blobUrl
        //         });
        //     })
        //     return res.json()
        // })
        // .then(data => {
        //     this.setState({
        //         stockData: data
        //     });
        // });

        
    }

    sortByField(sortField){
        let parameters = Object.assign({},this.props.parameters);

        parameters.sortField = sortField;

        if(parameters.sortField === parameters.lastSortField){
            parameters.sortMethod = parameters.sortMethod === 'asc' ? 'desc' : 'asc';
        }else{
            parameters.sortMethod = 'asc';
        }
        parameters.lastSortField = sortField;
        console.log(parameters);
        this.props.fetchStockData(parameters);
    }

    // exportQueryResult(){
    //     let url = `http://localhost:3000/stock/csv?`;

    //     url = this.addQueryStringToUrl(url, this.state.condition);

    //     fetch(url,{
    //         method: 'post'
    //     })
    //     .then(res => {
    //         res.blob().then( blob => {
    //             let blobUrl = window.URL.createObjectURL(blob);
    //             console.log(blobUrl);
    //         });
    //     });
    // }

    render() {
        const stockData = this.props.stockData;
        const parameters = this.props.parameters;
        const columnInfo = [];
        columnInfo.push({fieldCode:"company_id", fieldName:"代號", isSorting:false, sortMethod:"asc"});
        columnInfo.push({fieldCode:"company_name", fieldName:"名稱", isSorting:false, sortMethod:"asc"});
        columnInfo.push({fieldCode:"opening_price", fieldName:"開盤價", isSorting:false, sortMethod:"asc"});
        columnInfo.push({fieldCode:"max_price", fieldName:"最高價", isSorting:false, sortMethod:"asc"});
        columnInfo.push({fieldCode:"min_price", fieldName:"最低價", isSorting:false, sortMethod:"asc"});
        columnInfo.push({fieldCode:"yesterday_closing_price", fieldName:"昨收盤", isSorting:false, sortMethod:"asc"});
        columnInfo.push({fieldCode:"today_closing_price", fieldName:"今收盤", isSorting:false, sortMethod:"asc"});
        columnInfo.push({fieldCode:"volume", fieldName:"成交量", isSorting:false, sortMethod:"asc"});
        columnInfo.push({fieldCode:"up_down_value", fieldName:"漲跌", isSorting:false, sortMethod:"asc"});
        columnInfo.push({fieldCode:"percentage_up_down_value", fieldName:"漲跌幅", isSorting:false, sortMethod:"asc"});
        columnInfo.map(column=>{
            if(column === parameters.sortField){
                column.isSorting = true;
            }else{
                column.isSorting = false;
            }
            return column;
        });
        return (
            <Paper>
                <Table size="small" className={styles.article}>
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={()=>this.sortByField("company_id")} align="right" className={styles.table_head}>代號<Icon className={styles.icon_order}>keyboard_arrow_down</Icon></TableCell>
                            <TableCell onClick={()=>this.sortByField("company_name")} align="right" className={styles.table_head}>名稱</TableCell>
                            <TableCell onClick={()=>this.sortByField("opening_price")} align="right" className={styles.table_head}>開盤價</TableCell>
                            <TableCell onClick={()=>this.sortByField("max_price")} align="right" className={styles.table_head}>最高價</TableCell>
                            <TableCell onClick={()=>this.sortByField("min_price")} align="right" className={styles.table_head}>最低價</TableCell>
                            <TableCell onClick={()=>this.sortByField("yesterday_closing_price")} align="right" className={styles.table_head}>昨收盤</TableCell>
                            <TableCell onClick={()=>this.sortByField("today_closing_price")} align="right" className={styles.table_head}>今收盤</TableCell>
                            <TableCell onClick={()=>this.sortByField("volume")} align="right" className={styles.table_head}>成交量</TableCell>
                            <TableCell onClick={()=>this.sortByField("up_down_value")} align="right" className={styles.table_head}>漲跌</TableCell>
                            <TableCell onClick={()=>this.sortByField("percentage_up_down_value")} align="right" className={styles.table_head}>漲跌幅</TableCell>
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
                            <TableCell align="right">{stock.volume}</TableCell>
                            <TableCell align="right">{stock.up_down_value}</TableCell>
                            <TableCell align="right">{stock.percentage_up_down_value}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
            
        )
    }
}
