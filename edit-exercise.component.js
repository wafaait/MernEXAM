import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this. onChangeEmail= this.onChangeEmail.bind(this);
    this. onChangePhoto= this.onChangePhoto.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      gender: '',
      email: '',
      photo: '',
      
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
         username: response.data.username,
         gender: response.data.gender,
         email: response.data.email,
         photo: response.data.email,
         
        
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeGender (e) {
    this.setState({
     gender: e.target.value
    });
  }
 onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePhoto(e) {
    this.setState({
      photo: e.target.value
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      email: this.state.email,
      gender: this.state.gender,
      photo: this.state.photo,
      date: this.state.date,
    };
    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
      .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit photo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Gender: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.gender}
                onChange={this. onChangeGender}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
            <label>Email </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
         
          <div className="form-group">
            <label>photo: </label>
            <DatePicker
              selected={this.state.photo}
              onChange={this.onChangePhoto}
            />
          </div>


          <div className="form-group">
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}