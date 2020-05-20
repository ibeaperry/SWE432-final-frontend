import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

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

const buildings = [
  {
      value: "Robinson",
      lable: 'Robinson',
  },
  {
      value: "JC",
      lable: 'Johnson Center',
  },
  {
      value: "exploratory",
      lable: 'Exploratory',
  },
  {
      value: "innovation",
      lable: 'Innovation',
  },
  {
      value: "engineering",
      lable: 'Engineering Building',
  },
]
class App extends React.Component{
  constructor(props){
    super(props);
    this.changeFirst = this.changeFirst.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={
      first:'',
    };
  }
  handleSubmit(event){
    console.log("STARTING HANDLESUBMIT!");
    const data = new FormData();
    console.log("formdata made?");
    data.append('first_name',this.state.first);
    fetch('https://twobutton.herokuapp.com/clearText',{
      method: 'POST',
    })
    .catch((error) =>{
      console.error("clearing error");
    });
    // fetch('https://twobutton.herokuapp.com/clearReviews',{
    //   method: 'POST',
    //   body: data
    // })
    // .catch((error) =>{
    //   console.error("clearing error");
    // });
    fetch('https://twobutton.herokuapp.com/writeReview', {
      method: 'POST',
      body: data
    })
    .then((response) => response.json())
    .then((data) =>{
      console.log('then Success: ', data);
      console.log(data.entries);
      for(var i = 0; i < data.entries.length; i++){
        var obj = data.entries[i];
        console.log(i);
        console.log(obj);
        console.log(obj.first_name);
      }
      console.log(data[0])
      this.setState({
        ress: data
      })
    })
    .catch((error) => {
      console.log('why you error: ', error)
    });
  }
  changeFirst(rating){
    this.setState({
      first: rating.target.value
    })
  }
  render(){
    return(
      <div>
      <p><a href="./submitions">View Results</a></p>
      <div>
      {/* <form method="POST" action="https://cs.gmu.edu:8443/offutt/servlet/formHandler"> */}
        {/* <form method="POST" action="https://swe471-proj1.herokuapp.com/server"> */}
        <form>
        <TextField
          required
          name='first_name'
          value={this.state.first}
          id="filled-required"
          style={{width: '48%'}} 
          label="Boolean Predicate"
          variant="filled"
          onChange={this.changeFirst}
        />
        <button type="submit" onClick={this.handleSubmit}>Take the shot!</button>
        {/* type="submit" */}
        </form>
      </div>
     
    </div>
    );
  }
}
export default App;