import React from 'react';
import './Register.css';
import axios from 'axios';

class VolunteerForm extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
    }
  }

  render() {
    const { first_name, last_name, middle_initial,
            dob, interests, email, phone_number,
            age, backendMessage, handleFormInput,
            handleSubmit, handleDobInput } = this.props;
    return (
      <div>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-sm-6'>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="firstName">
                      First Name <span className="required">*</span>
                    </label>
                    <input
                      name="first_name"
                      value={first_name}
                      onChange={handleFormInput}
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label for="lastName">
                      Last Name <span className="required">*</span>
                    </label>
                    <input
                      name="last_name"
                      value={last_name}
                      onChange={handleFormInput}
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="middleName" >
                      Middle Name
                    </label>
                    <input
                      name="middle_initial"
                      value={middle_initial}
                      onChange={handleFormInput}
                      type="text"
                      className="form-control"
                      id="middleName"
                      placeholder="Middle Name"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label for="dateOfBirth">
                      Date of birth <span className="required">*</span>
                    </label>
                    <input
                      name="dob"
                      value={dob}
                      onChange={handleDobInput}
                      type="date"
                      className="form-control"
                      id="dateOfBirth"
                      placeholder="mm/dd/yyyy"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label for="telNumber">
                    Phone Number (format: xxx-xxx-xxxx) <span className="required">*</span>
                  </label>
                  <input
                    name="phone_number"
                    value={phone_number}
                    pattern="^\d{3}-\d{3}-\d{4}$"
                    required
                    onChange={handleFormInput}
                    type="tel"
                    className="form-control"
                    id="telNumber"
                    placeholder="xxx-xxx-xxxx"
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">
                    Email address <span className="required">*</span>
                  </label>
                  <input
                    name="email"
                    value={email}
                    onChange={handleFormInput}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    required
                  />
                  <small
                    id="emailHelp"
                    className="form-text text-muted">
                    We will never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label for="interests">Interests</label>
                  <input
                    name="interests"
                    value={interests}
                    onChange={handleFormInput}
                    type="text"
                    className="form-control"
                    id="interests"
                    placeholder="Interests"
                  />
                </div>
              </div>
              <div className='col-sm-6'>
                <fieldset className="at-fieldset Interests">
                  <legend
                    style={{ color: "#00aef3" }}
                    className="at-legend">
                    Volunteer Options
                  </legend>
                  <div className="at-fields">
                    <div className="at-row at-row-full InterestHeaderHtml">
                      <div
                        className="at-markup InterestHeaderHtml"
                        style={{ display: "none" }}>
                      </div>
                    </div>
                    <div className="at-row at-row-full Interests[45434]">
                      <label className="at-check Interests[45434]">
                        <input type="checkbox" name="Interests[45434]" />
                        <span>
                          I would like to help with Canvassing/Knocking Doors!
                        </span>
                      </label>
                    </div>
                    <div className="at-row at-row-full Interests[45435]">
                      <label className="at-check Interests[45435]">
                        <input type="checkbox" name="Interests[45435]" />
                        <span>
                          I would like to make calls/phone bank!
                        </span>
                      </label>
                    </div>
                    <div className="at-row at-row-full Interests[45436]">
                      <label className="at-check Interests[45436]">
                        <input type="checkbox" name="Interests[45436]" />
                        <span>
                          I am interested in running for local office
                        </span>
                      </label>
                    </div>
                    <div className="at-row at-row-full Interests[45437]">
                      <label className="at-check Interests[45437]">
                        <input type="checkbox" name="Interests[45437]" />
                        <span>
                          Other Volunteer Opportunities
                        </span>
                      </label>
                    </div>
                    <div className="at-row at-row-full Interests[45438]">
                      <label className="at-check Interests[45438]">
                        <input type="checkbox" name="Interests[45438]" />
                        <span>
                          I can provide supporter housing to staff and volunteers working on campaigns in my area
                        </span>
                      </label>
                    </div>
                    <div className="at-row at-row-full Interests[45439]">
                      <label className="at-check Interests[45439]">
                        <input type="checkbox" name="Interests[45439]" />
                        <span>
                          I can provide translation assistance/translation services
                        </span>
                      </label>
                    </div>
                    <div className="at-row at-row-full Interests[45440]">
                      <label className="at-check Interests[45440]">
                        <input type="checkbox" name="Interests[45440]" />
                        <span>
                          I have a professional skill I can contribute to the party such as writing, graphic design, photography, etc
                        </span>
                      </label>
                    </div>
                    <div className="at-row at-row-full Interests[45441]">
                      <label className="at-check Interests[45441]">
                        <input type="checkbox" name="Interests[45441]" />
                        <span>
                          I have a vehicle that I can use to assist with transportation or a truck I can use to help move supplies into campaign offices
                        </span>
                      </label>
                    </div>
                    <div className="at-row at-row-full Interests[45442]">
                      <label className="at-check Interests[45442]">
                        <input type="checkbox" name="Interests[45442]" />
                        <span>
                          I can assist with data entry tasks
                        </span>
                      </label>
                    </div>
                    <div className="at-row at-row-full InterestFooterHtml">
                      <div
                        className="at-markup InterestFooterHtml"
                        style={{ display: "none" }}>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
          <br />
          <br />
          <br />
      </div>
    )
  }
}

export default VolunteerForm;
