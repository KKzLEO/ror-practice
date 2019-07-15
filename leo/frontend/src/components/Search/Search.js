import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './Search.module.scss';

export default class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            parameters:{
                companyId:"",
                date: ""
            }
        }
    }

    handleInputChange(event){
        let name = event.target.name;
        let value = event.target.value;
        let parameters = Object.assign({},this.state.parameters);
        parameters[name] = value;
        this.setState({
            parameters: parameters
        });
    }

    handleSearch(){
        this.props.setQueryParameters(this.state.parameters)
            .then(()=>{ 
                this.props.fetchStockData(this.props.parameters) 
            });
    }

    exportStockData(){
        this.props.setQueryParameters(this.state.parameters)
            .then(()=>{
                this.props.exportStockData(this.props.parameters)
            });
    }

    render() {
        return (
            <Paper className={styles.search_input}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <TextField
                            id="id"
                            label="代號"
                            name="companyId"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.parameters.companyId}
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
                            value={this.state.parameters.date}
                            onChange={(e)=>this.handleInputChange(e)}
                        />
                    </Grid>
                    <Grid item xs className={styles.btn_search_container}>
                        <Button onClick={()=>this.handleSearch()} variant="contained" color="primary">
                            搜尋
                        </Button>
                        <Button onClick={()=>this.exportStockData()} variant="contained" className={styles.btn_toolbar} >
                            匯出
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
