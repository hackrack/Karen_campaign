import React from 'react';
import axios from 'axios';
import './Register.css';
import VolunteerForm from './VolunteerForm';
import logo from '../images/senator.PNG';
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
      backendMessage: "",
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      option5: false,
      option6: false,
      option7: false,
      option8: false,
      option9: false,
      volunteer_id: "",
      volunteersCounted: 0,
      submitForm: false,
      backendMessage_fName: "",
      backendMessage_lName: ""
    }
  }

  componentDidMount() {
    axios
      .get('volunteers/countvolunteers')
      .then( (res) => {
        this.setState({
          volunteersCounted: Number(res.data.counted) + 1234560
        })
      })
      .catch( (err) => {
        console.log(err);
      })
  }

  handleFormInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleInputCheck = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
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
    const { first_name, last_name, middle_initial,
            dob, interests, latitude, longitude,
            phone_number, email,
            option1, option2, option3, option4,
            option5, option6, option7,
            option8, option9} = this.state;

    let get_age = getAge(dob);
    axios
      .post('/volunteers/register', {
        first_name: first_name.toLowerCase(),
        last_name: last_name.toLowerCase(),
        middle_initial: middle_initial.length > 0?middle_initial[0].toLowerCase():"",
        phone_number: phone_number,
        dob: dob,
        email: email,
        interests: interests,
        age: get_age,
        latitude_longitude: latitude + ", " + longitude,
      })
      .then( (res) => {
        this.setState({
          backendMessage_fName: res.data.first_name,
          backendMessage_lName: res.data.last_name,
        });
        if (res.data.volunteer_id) {
          axios
            .post(`/volunteers/options`, {
              volunteer_id: res.data.volunteer_id,
              backendMessage1: res.data.backendMessage,
              option1: option1,
              option2: option2,
              option3: option3,
              option4: option4,
              option5: option5,
              option6: option6,
              option7: option7,
              option8: option8,
              option9: option9
            })
            .then( (res) => {
              this.setState({
                backendMessage: res.data,
              });
            })
        }
        this.setState({ backendMessage: res.data } );
      })
      .then( () => {
        this.setState({
          first_name: "",
          last_name: "",
          middle_initial: "",
          dob: "",
          phone_number: "",
          email: "",
          interests: "",
          submitForm: true
        })
      })
      .catch( (err) => {
        console.log(err);
      })
  }

  render() {

    const { first_name, last_name, middle_initial,
            dob, interests, email, phone_number,
            age, backendMessage, option1, option2,
            option3,option4,option5,option6,
            option7,option8,option9, submitForm, backendMessage_fName, backendMessage_lName } = this.state;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onPositionReceived, this.locationNotReceived)
    }
    return (
      <div>
        <div className=" text-center jumbo">
          <div className="container">
            <div className='row'>
              <div
                style={{ marginTop: "25px" }}
                className="col-sm-4">
                <div className="media">
                  <div className="media-left">
                    <img
                      id="img"
                      className="media-object"
                      src={logo}
                      alt="logo" />
                    <br />
                    <br />
                    <a
                      target="blank"
                      href="https://en.wikipedia.org/wiki/Gretchen_Whitmer">
                      <h6>
                        Gretchen Whitmer
                      </h6>
                    </a>
                  </div>
                </div>
              </div>
              <div
                style={{ marginTop: "55px" }}
                className='col-sm-4'>
                <h5>
                  STAND UP AND JOIN US IN
                </h5>
                <h1 >
                  Fighting for a
                </h1>
                <h1 >
                  Better Michigan
                </h1>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            {!submitForm?
              <div className="col-sm-1 ">
                <div>
                  <a
                    target="blank"
                    href="https://michigandems.com/">
                    <img
                      alt="michigan_democ_logo"
                      id="logo"
                      src="https://michigandems.com/wp-content/uploads/2017/08/site.png" />
                  </a>
                </div>
              </div>
              :""}
              {!submitForm?
                <div className="col-sm-4">
                  <div >
                    <h4 style={{ color: "#00aef3" }}>
                      VOLUNTEER FORM
                    </h4>
                  </div>
                </div>
                :""}
              </div>
              <br />
            </div>
            {submitForm?
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <div className="check_mark">
                      <div className="sa-icon sa-success animate">
                        <span className="sa-line sa-tip animateSuccessTip">
                        </span>
                        <span className="sa-line sa-long animateSuccessLong">
                        </span>
                        <div className="sa-placeholder">
                        </div>
                        <div className="sa-fix">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              :""}
              <div
                style={{ backgroundColor: "#f2f4f9"}}
                className="container">
                <br />
                <br />
                {backendMessage.backendMessage === "youngvolunteers"?
                  <div>
                    <h1
                      className="text-center"
                      style={{color: "#00aef3"}}>
                      Thank You!
                    </h1>
                    <h2 className="text-center">We are increasing <span className="counted">{this.state.volunteersCounted.toLocaleString()}</span></h2>
                    <br/>
                    <br/>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-6 p-message">
                          <p className="message">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Dear <strong>{backendMessage.first_name[0].toUpperCase() + backendMessage.first_name.slice(1)}&nbsp;
                            {backendMessage.last_name[0].toUpperCase() + backendMessage.last_name.slice(1)}</strong>:<br/>
                            Your effort is appreciated, we saved your information,
                            since you are currently don't meet the age requirement,
                            we look forward for your help once you are old enough.<br/>
                            Thank you for all you do!<br/>
                            ~ Gretchen Whitmer
                          </p>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-sm-6 p-message">
                          <p className="message">
                            <strong>EDUCATION</strong><br/>
                            A good education is the foundation for growing the economy
                            and we will fight for our students to get the education they
                            need to compete in a global economy.<br/>
                            <strong>JOBS AND ECONOMY</strong><br/>
                            To grow our economy in Michigan, we need to make sure
                            everyone has a path to a good job and a secure future.<br/>
                            <strong>HEALTHCARE</strong><br/>
                            Everyone in Michigan has a right to quality health
                            care they can afford, and that means expanding coverage and
                            lowering costs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  backendMessage && backendMessage.backendMessage === "firsttimevolunteer"?
                  <div>
                    <h1
                      className="text-center"
                      style={{color: "#00aef3"}}>
                      Thank You!
                    </h1>
                    <h2 className="text-center">We are increasing <span className="counted">{this.state.volunteersCounted.toLocaleString()}</span></h2>
                    <br/>
                    <br/>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-6 p-message">
                          <p className="message">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Dear <strong>{backendMessage_fName[0].toUpperCase() + backendMessage_fName.slice(1)}&nbsp;
                            {backendMessage_lName[0].toUpperCase() + backendMessage_lName.slice(1)}</strong>:<br/>
                            Thank you for signing up to volunteer with our Election campaign!
                            We'll be reaching out soon with opportunities for you to get involved and
                            help us fight back.<br/>
                          Thank you for all you do!<br/>
                            ~ Gretchen Whitmer
                          </p>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-sm-6 p-message">
                          <p className="message">
                            <strong>EDUCATION</strong><br/>
                            A good education is the foundation for growing the economy
                            and we will fight for our students to get the education they
                            need to compete in a global economy.<br/>
                            <strong>JOBS AND ECONOMY</strong><br/>
                            To grow our economy in Michigan, we need to make sure
                            everyone has a path to a good job and a secure future.<br/>
                            <strong>HEALTHCARE</strong><br/>
                            Everyone in Michigan has a right to quality health
                            care they can afford, and that means expanding coverage and
                            lowering costs.
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                  :
                  backendMessage && backendMessage.backendMessage === "voter"?
                  <div>
                    <h1
                      className="text-center"
                      style={{color: "#00aef3"}}>
                      Thank You!
                    </h1>
                    <h2 className="text-center">We are increasing <span className="counted">{this.state.volunteersCounted.toLocaleString()}</span></h2>
                    <br/>
                    <br/>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-6 p-message">
                          <p className="message">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Dear <strong>{backendMessage_fName[0].toUpperCase() + backendMessage_fName.slice(1)}&nbsp;
                            {backendMessage_lName[0].toUpperCase() + backendMessage_lName.slice(1)}</strong>:<br/>
                            First of all I would like to express my heartfelt
                            appreciation to you for being in our voters records.
                            Also Thank you for signing up to volunteer with our Election campaign!
                            We'll be reaching out soon with opportunities for you to get involved and
                            help us fight back.<br/>
                            Thank you for all you do!<br/>
                            ~ Gretchen Whitmer
                          </p>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-sm-6 p-message">
                          <p className="message">
                            <strong>EDUCATION</strong><br/>
                            A good education is the foundation for growing the economy
                            and we will fight for our students to get the education they
                            need to compete in a global economy.<br/>
                            <strong>JOBS AND ECONOMY</strong><br/>
                            To grow our economy in Michigan, we need to make sure
                            everyone has a path to a good job and a secure future.<br/>
                            <strong>HEALTHCARE</strong><br/>
                            Everyone in Michigan has a right to quality health
                            care they can afford, and that means expanding coverage and
                            lowering costs.
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                  :
                  backendMessage && backendMessage.backendMessage === "outofstate"?
                  <div>
                    <h1
                      className="text-center"
                      style={{color: "#00aef3"}}>
                      Thank You!
                    </h1>
                    <h2 className="text-center">We are increasing <span className="counted">{this.state.volunteersCounted.toLocaleString()}</span></h2>
                    <br/>
                    <br/>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-6 p-message">
                          <p className="message">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Dear <strong>{backendMessage.first_name[0].toUpperCase() + backendMessage.first_name.slice(1)}&nbsp;
                            {backendMessage.last_name[0].toUpperCase() + backendMessage.last_name.slice(1)}</strong>:<br/>
                            Your effort is appreciated, since you are from {backendMessage.state} state, please contact
                            your  local democratic party to learn more about how you can help.<br/>
                            Thank you for all you do!<br/>
                            ~ Gretchen Whitmer
                          </p>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-sm-6 p-message">
                          <p className="message">
                            <strong>EDUCATION</strong><br/>
                            A good education is the foundation for growing the economy
                            and we will fight for our students to get the education they
                            need to compete in a global economy.<br/>
                            <strong>JOBS AND ECONOMY</strong><br/>
                            To grow our economy in Michigan, we need to make sure
                            everyone has a path to a good job and a secure future.<br/>
                            <strong>HEALTHCARE</strong><br/>
                            Everyone in Michigan has a right to quality health
                            care they can afford, and that means expanding coverage and
                            lowering costs.
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                  :
                  <VolunteerForm
                    handleFormInput={this.handleFormInput}
                    handleDobInput={this.handleDobInput}
                    handleSubmit={this.handleSubmit}
                    handleInputCheck={this.handleInputCheck}
                    first_name={first_name}
                    last_name={last_name}
                    middle_initial={middle_initial}
                    dob={dob}
                    interests={interests}
                    email={email}
                    phone_number={phone_number}
                    age={age}
                    option1={option1}
                    option2={option2}
                    option3={option3}
                    option4={option4}
                    option5={option5}
                    option6={option6}
                    option7={option7}
                    option8={option8}
                    option9={option9}
                  />
                }
              </div>
            </div>
    )
  }
}

export default Register;
