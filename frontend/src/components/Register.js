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
      volunteersCounted: 0
    }
  }

  componentDidMount() {
    axios
      .get('volunteers/countvolunteers')
      .then( (res) => {
        console.log("res data componentDidMount: ", res.data);
        this.setState({
          volunteersCounted: res.data.counted
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
        middle_initial: middle_initial[0].toLowerCase(),
        phone_number: phone_number,
        dob: dob,
        email: email,
        interests: interests,
        age: get_age,
        latitude_longitude: latitude + ", " + longitude,
      })
      .then( (res) => {
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
              this.setState({ backendMessage: res.data } );
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
            age, backendMessage, option1, option2,
            option3,option4,option5,option6,
            option7,option8,option9, volunteersCounted } = this.state;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onPositionReceived, this.locationNotReceived)
    }
    return (
      <div>
        <div className="text-center jumbo">
          <div className='row'>
            <div className='col-sm-4'>
              <img
                id="img"
                src="http://lghttp.60402.nexcesscdn.net/8046399/images/page/-/uploads/fellows/JG_HEADSHOT.jpg"
                alt="senator" />
              <br />
              <h4>
                Karen Goldberg
              </h4>
            </div>
            <div className='col-sm-8'>
              <div className='row'>
                <div className='col-sm-8'>
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
                <div className='col-sm-4'>
                  <a
                    className="navbar-brand"
                    href="https://michigandems.com/">
                    <img
                      id="logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/US_Democratic_Party_Logo.svg/2000px-US_Democratic_Party_Logo.svg.png"
                      alt="senator" />
                  </a>
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
            {backendMessage.length > 0 && backendMessage === "youngvolunteers"?
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
              backendMessage && backendMessage.backendMessage === "firsttimevolunteer"?
              <p>
                  thank you for strating to work with us
                  we becoming more and more <strong>{this.state.volunteersCounted}</strong>
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
              backendMessage && backendMessage.backendMessage.slice(0,5) === "loyal"?
              <p>
                  Thank you for your loyalty mr { backendMessage.backendMessage.slice(6)}. We realy
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
              backendMessage && backendMessage.backendMessage === "outofstate"?
              <p>
                  Thank you for trying to help us please contact {backendMessage.state} state Democratic Party Office please.
                  We reallyappreciate keep working with use.
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
