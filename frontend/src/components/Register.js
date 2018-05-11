import React from 'react';
import './Register.css';
import axios from 'axios';

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

class Register extends React.Component {

  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      middle_initial: "",
      phone_number: "",
      dob: "",
      email: "",
      interests: "",
      latitude: "",
      longitude: "",
      age: 0,
      backendMessage: ""
    }
  }

  handleFormInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onPositionReceived = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }

  locationNotReceived = (positionError) => {
    console.log(positionError);
  }

  handleDobInput = (e) => {
    this.setState({
      dob: e.target.value,
      age: getAge(e.target.value)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, middle_initial, dob, interests, latitude, longitude, phone_number, email, age } = this.state;
    let get_age = getAge(dob);
    axios
      .post('/volunteers/register', {
        first_name: first_name,
        last_name: last_name,
        middle_initial: middle_initial,
        phone_number: phone_number,
        dob: dob,
        email: email,
        interests: interests,
        age: get_age,
        latitude_longitude: latitude + ", " + longitude,
      })
      .then( (res) => {
        console.log(res.data);
        this.setState({
          backendMessage: res.data
        })
      })
      .then( () => {
        console.log("insa");
        this.setState({
          first_name: "",
          last_name: "",
          middle_initial: "",
          dob: "",
          phone_number: "",
          email: "",
          interests: ""
        })
      })
      .catch( (err) => {
        console.log(err);
      })
  }

  render() {
    const { first_name, last_name, middle_initial, dob, interests, email, phone_number, age, backendMessage } = this.state;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onPositionReceived, this.locationNotReceived)
    }

    console.log("backendMessage: ", this.state.backendMessage);
    return(
      <div>
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="">
          <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" />
          </a>
        </nav>
        <div className='container'>
          <div className='row'>
            <div className='col'>
            <div className="form-style-3">
              <form onSubmit={this.handleSubmit}>
                <fieldset><legend>Personal</legend>
                  <label>
                    <span>First Name<span className="required">*</span></span>
                    <input
                      type="text"
                      className="input-field"
                      name="first_name"
                      value={first_name}
                      onChange={this.handleFormInput}
                    />
                  </label>
                  <label>
                    <span>Last Name<span className="required">*</span></span>
                    <input
                      type="text"
                      className="input-field"
                      name="last_name"
                      value={last_name}
                      onChange={this.handleFormInput}
                    />
                  </label>
                  <label>
                    <span>Middle Initial<span className="required">*</span></span>
                    <input
                      type="text"
                      className="input-field"
                      name="middle_initial"
                      value={middle_initial}
                      onChange={this.handleFormInput}
                    />
                  </label>
                  <label>
                    <span>Phone Number (format: xxx-xxx-xxxx):<span className="required">*</span></span>
                    <input
                      type="tel"
                      className="input-field"
                      name="phone_number"
                      value={phone_number}
                      pattern="^\d{3}-\d{3}-\d{4}$"
                      required
                      onChange={this.handleFormInput}
                    />
                  </label>
                  <label>
                    <span>Email<span className="required">*</span></span>
                    <input
                      type="email"
                      className="input-field"
                      name="email"
                      value={email}
                      onChange={this.handleFormInput}
                    />
                  </label>
                  <label>
                    <span>Date of birth<span className="required">*</span></span>
                    <input
                      type="date"
                      className="input-field"
                      name="dob"
                      value={dob}
                      onChange={this.handleDobInput}
                    />
                  </label>
                  <label>
                    <span>Interests</span>
                    <input
                      type="text"
                      className="input-field"
                      name="interests"
                      value={interests}
                      onChange={this.handleFormInput}
                    />
                  </label>
                  <label><span>&nbsp;</span><input type="submit" value="Submit" /></label>
                  <p className="denotes"><span className="required">*</span> denotes required field</p>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
          {backendMessage === 'youngvolunteers'? <h1>Thank you for your help, you are too young</h1>: backendMessage.length > 0 && backendMessage !== 'youngvolunteers'? <h1>{backendMessage}</h1>:""}
        </div>
      </div>
    )
  }
}

export default Register;
