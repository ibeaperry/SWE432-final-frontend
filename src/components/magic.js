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
        page: 0,
        rowsPerPage: 10,
        filter: '',
        average: 0.0
    };
  }

  async componentDidMount() {
    fetch('https://swe432-assign8-backend.herokuapp.com/readReviews', {
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
      const {data,page,rowsPerPage,filter} = this.state;
      console.warn("DATA!!!")
      console.log(data);
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
            {data.length > 0 && 
                <div>
                    <p>
                    <a href="../">Return to form submition</a>
                    </p>
                    <p>Average Rating: {this.state.average}</p>
                    <b></b>
                </div>
            }
            <form>
              <TextField style={{width: '100%'}} label="Filter" variant="filled" onChange={handleFilterChange} />
            </form>
            <TablePagination
            
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <div> 
                <Table stickyHeader aria-label="stickyTable">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sytle={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.filter(i => i.first_name.toLowerCase().includes(filter) || i.last_name.toLowerCase().includes(filter) || 
                                          i.number.toLowerCase().includes(filter) || i.building.toLowerCase().includes(filter) || 
                                          i.comments.toLowerCase().includes(filter) || i.date.toLowerCase().includes(filter) || 
                                          i.email.toLowerCase().includes(filter) || i.rating.toLowerCase().includes(filter))
                                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map(column => {
                                                    const value = row[column.id];
                                                    return (
                                                    <TableCell key={column.id} align={column.align} >
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                    );
                                                })}
                                                </TableRow>
                                            )
                                          })}
                        {/* {data.map(row => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map(column => {
                                    const value = row[column.id];
                                    return (
                                    <TableCell key={column.id} align={column.align} >
                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                    </TableCell>
                                    );
                                })}
                                </TableRow>
                            )
                        })} */}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
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