import React from 'react';
import './Register.css';
import axios from 'axios';
import VolunteerForm from './VolunteerForm';

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
      modalClosed: true
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

    const { first_name, last_name, middle_initial,
            dob, interests, email, phone_number,
            age, backendMessage } = this.state;
            console.log("backendMessage.slice(0,5) ", backendMessage.slice(0,5));
            console.log("backendMessage.slice(6) ", backendMessage.slice(6));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onPositionReceived, this.locationNotReceived)
    }
    return (
      <div>
        <div className="jumbotron text-center jumbo">
          <div className='row'>
            <div className='col-sm-4'>
              <img
                id="img"
                src="http://lghttp.60402.nexcesscdn.net/8046399/images/page/-/uploads/fellows/JG_HEADSHOT.jpg"
                alt="senator" />
              <br />
              <br />
              <h4>
                Karen Goldberg
              </h4>
              <p id="senator">
                For Senator.
              </p>
            </div>
            <div className='col-sm-4'>
              <div className='row'>
                <div className='col-sm-2'>
                  <a
                    className="navbar-brand"
                    href="https://michigandems.com/">
                    <img
                      id="logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/US_Democratic_Party_Logo.svg/2000px-US_Democratic_Party_Logo.svg.png"
                      alt="senator" />
                  </a>
                </div>
                <div className='col-sm-10'>
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
        </div>
        <div className="container">
          <div >
            <h2 style={{ color: "#00aef3" }}>
              VOLUNTEER FORM
            </h2>
          </div>
          <br />
        </div>
        <div
          style={{ backgroundColor: "#f2f4f9", opacity: "0.7" }}
          className="container">
          <br />
          <br />
            {backendMessage === "youngvolunteers"?
              <p>
                  thank you trying to help, please contact us when you hit the 18.
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book. It has survived not only
                  five centuries, but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised
                  in the 1960s with the release of Letraset sheets
                  containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum.
              </p>:
              backendMessage === "firsttimevolunteer"?
              <p>
                  thank you for strating to work with us
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book. It has survived not only
                  five centuries, but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised
                  in the 1960s with the release of Letraset sheets
                  containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum.
              </p>:
              backendMessage.slice(0,5) == "loyal"?
              <p>
                  Thank you for your loyalty mr { backendMessage.slice(6)}. We realy
                  appreciate keep working with use.
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled
                  it to make a type specimen book. It has survived not only
                  five centuries, but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised
                  in the 1960s with the release of Letraset sheets
                  containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum.
              </p>:
              <VolunteerForm
                handleFormInput={this.handleFormInput}
                handleDobInput={this.handleDobInput}
                handleSubmit={this.handleSubmit}
                first_name={first_name}
                last_name={last_name}
                middle_initial={middle_initial}
                dob={dob}
                interests={interests}
                email={email}
                phone_number={phone_number}
                age={age}
              />
          }
        </div>
      </div>
    )
  }
}

export default Register;
