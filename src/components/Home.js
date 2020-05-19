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
    this.changeLast = this.changeLast.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.buildingChange = this.buildingChange.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.starChange = this.starChange.bind(this);
    this.changeComment = this.changeComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={
      first:'',
      last:'',
      email:'',
      number:'',
      building:'',
      visit:null,
      rate:0,
      comment:'',
      starSelected: 0,
      testData:'',
      ress:''
    };
  }
  handleSubmit(event){
    console.log("STARTING HANDLESUBMIT!");
    const data = new FormData();
    console.log("formdata made?");
    data.append('first_name',this.state.first);
    console.log("first append?");
    console.log(this.state.first);
    data.append('last_name',this.state.last);
    console.log(this.state.last);
    data.append('email',this.state.email);
    console.log(this.state.email);
    data.append('number',this.state.number);
    console.log(this.state.number);
    data.append('building',this.state.building);
    console.log(this.state.building);
    data.append('Date_of_Visit',this.state.visit);
    console.log(this.state.visit);
    data.append('rating',this.state.starSelected);
    console.log(this.state.starSelected);
    data.append('Comments',this.state.comment);
    console.log(this.state.comment);
    fetch('https://swe432-assign8-backend.herokuapp.com/writeReview', {
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
  changeLast(rating){
    this.setState({
      last: rating.target.value
    })
  }
  changeEmail(rating){
    this.setState({
      email: rating.target.value
    })
  }
  changeNumber(rating){
    this.setState({
      number: rating.target.value
    })
  }
  buildingChange(build){
    this.setState({
      building: build.target.value
    })
  }
  dateChange(date){
    this.setState({
      visit: date
    })
  }
  starChange(starsSelected){
    this.setState({
      starSelected: starsSelected.target.value
    });
    console.log(this.state);
  }
  changeRating(rating){
    this.setState({
      rate: rating.target.value
    })
  }
  changeComment(rating){
    this.setState({
      comment: rating.target.value
    });
    console.log(this.state);
  }
  render(){
    const totalStars = 5;
    const starsSelected = this.state.starSelected;
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
          label="First Name"
          variant="filled"
          onChange={this.changeFirst}
        />
        <TextField
          required
          name='last_name'
          value={this.state.last}
          id="filled-required"
          style={{width: '48%'}} 
          label="Last Name"
          variant="filled"
          onChange={this.changeLast}
        />
        <TextField
          required
          name='email'
          value={this.state.email}
          id="filled-required"
          style={{width: '98%'}} 
          label="Email Address"
          variant="filled"
          onChange={this.changeEmail}
        />
        <TextField
          required
          name='number'
          value={this.state.number}
          id="filled-required"
          style={{width: '98%'}} 
          label="Contact Number (123-456-7890)"
          variant="filled"
          onChange={this.changeNumber}
        />
        <TextField
          required select
          name='building'
          value={this.state.building}
          id="filled-required"
          style={{width: '98%'}} 
          label="Building"
          onChange={this.buildingChange}
          variant="filled"
        >   
          {buildings.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                  {option.lable}
              </MenuItem>
          ))}
        </TextField>
        
        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    name='Date_of_Visit'
                    value={this.state.visit}
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={this.state.visit}
                    style={{width: '98%'}} 
                    onChange={this.dateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
        </MuiPickersUtilsProvider>
        
        <fieldset className="star-rating">
                <legend className="star-rating__title">Your rating:</legend>
                
                <div className="star-rating__stars">
                  <input className="star-rating__input" type="radio" name="rating" value="1" id="rating-1" onChange={this.starChange} />
                  <label className="star-rating__label" htmlFor="rating-1" aria-label="One"></label>
                  
                  <input className="star-rating__input" type="radio" name="rating" value="2" id="rating-2"  onChange={this.starChange}/>
                  <label className="star-rating__label" htmlFor="rating-2" aria-label="Two"></label>
                  
                  <input className="star-rating__input" type="radio" name="rating" value="3" id="rating-3"  onChange={this.starChange}/>
                  <label className="star-rating__label" htmlFor="rating-3" aria-label="Three"></label>
                  
                  <input className="star-rating__input" type="radio" name="rating" value="4" id="rating-4"  onChange={this.starChange}/>
                  <label className="star-rating__label" htmlFor="rating-4" aria-label="Four"></label>
                  
                  <input className="star-rating__input" type="radio" name="rating" value="5" id="rating-5" onChange={this.starChange} />
                  <label className="star-rating__label" htmlFor="rating-5" aria-label="Five"></label>
                  
                  <div className="star-rating__focus"></div>
                </div>
            </fieldset>

        <TextField
               name='Comments'
               value={this.state.comment}
          id="filled-input"
          label="Comments"
          variant="filled"
          style={{width: '98%'}} 
          onChange={this.changeComment}
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