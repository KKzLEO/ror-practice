import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './Turnover.module.scss';

export default class Turnover extends Component {

    constructor(){
        super();
        this.state = {
            stockData: [],
            condition:{
                count:50,
                company_id:"",
                date:""
            }
        }
    }

    componentDidMount(){
        let url = 'http://localhost:3000/stock/query';
        fetch(url,{
            method: 'get'
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                stockData: data
            });
        });
    }

    handleSearch(){
        // let queryString = {
        //     count: this.state.condition.count !== undefined ? `count=${encodeURIComponent(this.state.condition.count)}` : "",
        //     date: this.state.condition.date !== undefined && this.state.condition.date !== "" ? `&date=${encodeURIComponent(this.state.condition.date)}` : "",
        //     id: this.state.condition.company_id !== undefined ? `&company_id=${encodeURIComponent(this.state.condition.company_id)}` : ""
        // }
        // console.log(this.state,queryString);
        // let url = `http://localhost:3000/stock/query?${queryString.count}${queryString.date}${queryString.company_id}`;
        // fetch(url,{
        //     method: 'get'
        // })
        // .then(res => res.json())
        // .then(data => {
        //     this.setState({
        //         stockData: data
        //     });
        // });
    }

    handleInputChange(event){
        let name = event.target.name;
        let value = event.target.value;
        let condition1 = Object.assign({},this.state.condition);
        condition1[name] = value;
        console.log(condition1);
        this.setState({
            condition: condition1
        });
    }

    render() {
        return (
            <Container maxWidth="md">
                <Paper className={styles.search_input}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextField
                                id="id"
                                label="編號"
                                name="company_id"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.condition.company_id}
                                onChange={(e)=>this.handleInputChange(e)}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id="date"
                                label="日期"
                                name="date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.condition.date}
                                onChange={(e)=>this.handleInputChange(e)}
                            />
                        </Grid>
                        <Grid item xs className={styles.btn_search_container}>
                            <Button onClick={()=>this.handleSearch()} variant="contained" color="primary">
                                搜尋
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper>
                    <Table size="small" className={styles.article}>
                        <TableHead>
                        <TableRow>
                            <TableCell>代號</TableCell>
                            <TableCell align="right">名稱</TableCell>
                            <TableCell align="right">開盤價</TableCell>
                            <TableCell align="right">最高價</TableCell>
                            <TableCell align="right">最低價</TableCell>
                            <TableCell align="right">昨收盤</TableCell>
                            <TableCell align="right">今收盤</TableCell>
                            <TableCell align="right">成交量</TableCell>
                            <TableCell align="right">漲跌</TableCell>
                            <TableCell align="right">漲跌幅</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.stockData.map(stock => (
                            <TableRow key={stock.id}>
                                <TableCell align="right">{stock.company_id}</TableCell>
                                <TableCell align="right">
                                    <a href={stock.company_href} target="_blank" rel="noopener noreferrer">
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
                
            </Container>
            
        )
    }
}
