import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Loader from 'react-loader'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import './Home.css';
import Magic from './magic';
// import StarRating from './star';

class App extends Component{
  constructor(){
    super();
    this.state={
        data: [],
    };
  }

  async componentDidMount() {
    fetch('https://twobutton.herokuapp.com/readReviews', {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) =>{
      console.log('magic Success: ', data.entries);
      console.log(data);
      console.log(data[0])
      this.setState({
        data: data.entries
      })
      for(var i = 0; i < data.entries.length;i++){
          this.setState({
            average: this.state.average + (data.entries[i].rating / data.entries.length)
          })
      }
    })
    .catch((error) => {
      console.log('why you error: ', error)
    });
    // const resp = await fetch('https://swe432-assign8-backend.herokuapp.com/readReviews',{
    //     method: 'POST'
    // });
    // this.setState({data: await resp.json()});
  }
  render(){
      // const {data} = this.state;
      console.warn("DATA!!!")
      var i;
      var z;
      console.log(this.state.data);
      var dats = this.state.data.toString().split('|');
      console.log(dats);
      var workpls = [];
      var title = [];
      var trueColumns = []
      // title = title.toString().split(',')
      // var columnNames = [];
      
      // for(i = 0; i < title.length; i+= 2){
      //   columnNames[i/2] = title[i];
      // }
      // console.log(columnNames);
      for(i = 1; i < dats.length; i+= 2){
        title[(i - 1) / 2] = dats[i];
      }
      console.log(title);
      console.log(title[0]);
      for(i = 0; i < title.length; i++){
          title[i] = title[i].split(',');
      }
      console.log(title);
      var tester = title[0];
      if(tester != null){
        console.log(tester.length);
      for(i = 0; i < tester.length; i+=2){
        trueColumns[i/2] = {id: tester[i], label: tester[i], minWidth: 20}
        
      }
      console.log(trueColumns);
      // for( i = 0; i < test.length; i++){

      // }
      // console.log("test: " + test)
      // for(i = 0; i < title.length; i++){
      //   for(z = 0; z < splits.length; z+= 2){
      //     trueColumns[z / 2] = splits[z];

      //   }
      //   i = title.length;
      // }
      // console.log("true: " + trueColumns);
      // var trueColumns = []
      // for(i = 0; i < title[0].length; i+= 2){
      //   var sheet = title[0];
      //   truecolumns[i/2] = {id: sheet[i], label: sheet[i]}
      // }

      console.log(title);
      for(i = 0; i < dats.length - 1; i+= 2){
        workpls[i / 2] = dats[i];
      }
      for(i = 0; i < workpls.length; i++){
        for(z = 0; z < workpls[i].length; z++)
          workpls[i] = workpls[i].replace(' ', '');

        workpls[i] = workpls[i].split('');
      }
      console.log(workpls);
      var finalData = "["
      for(i = 0; i < workpls.length; i++){
        var tempHoldVar = workpls[i];
        var holder = '{ ' + '"' + tester[0*2] + '": ' +  tempHoldVar[0];
        // { id: 'comments', label: 'Comments', minWidth: 100 },
        for(z = 1; z < tempHoldVar.length; z += 1){
          holder += ',' + '"' + tester[z*2] + '": ' +  tempHoldVar[z]
        }
        holder += "},"
        finalData += holder;
      }
      finalData = finalData.substring(0,finalData.length - 1);
      finalData += "]";
      console.log("PLSTELL MEH");
      console.log(finalData);
      const data = JSON.parse(finalData);
      console.log(dats.toString().split('|'));
      console.log(this.state.data.entries);
      // const {data} = workpls;
      const setPage = (page) => {
        this.setState({page: page});
      }

      const setRowsPerPage = (rowsPerPage) => {
        this.setState({rowsPerPage: rowsPerPage})
      }
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      const handleFilterChange = event => {
        this.setState({filter: event.target.value.toLowerCase()})
      }
     const columns = this.getColumns();
    return(
        <Paper>
            
            
            <div>{title}</div>
            <div> 
                <Table stickyHeader aria-label="stickyTable">
                    <TableHead>
                        <TableRow>
                            {trueColumns.map(trueColumns => (
                                <TableCell
                                    key={trueColumns.id}
                                    align={trueColumns.align}
                                    sytle={{minWidth: trueColumns.minWidth}}
                                    >
                                        {trueColumns.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {data.map(row => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {trueColumns.map(trueColumns => {
                                    const value = row[trueColumns.id];
                                    return (
                                    <TableCell key={trueColumns.id} align={trueColumns.align} >
                                        {trueColumns.format && typeof value === 'number' ? trueColumns.format(value) : value}
                                    </TableCell>
                                    );
                                })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
  }else{
    return (<div>Waiting on backend to send data</div>)
  }
}
  getColumns() {
    const columns = [
        { id: 'first_name', label: 'First Name', minWidth: 170 },
        { id: 'last_name', label: 'Last Name', minWidth: 100 },
        { id: 'email', label: 'Email Address', minWidth: 100 },
        { id: 'number', label: 'phone number', minWidth: 100 },
        { id: 'building', label: 'Building', minWidth: 100 },
        { id: 'date', label: 'Date of Visit', minWidth: 100 },
        { id: 'rating', label: 'Rating', minWidth: 100 },
        { id: 'comments', label: 'Comments', minWidth: 100 },
        // { id: 'link', label: 'Link', minWidth: 250 },
    ];
    return columns;
};
}


export default App;