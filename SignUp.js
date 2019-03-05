import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
      },
      userData: {
        'username': '',
        'email': '',
        'checked': false
      }
    }
  }

  onSubmit = (e) => {
    let {userData, errors}=this.state;
    errors = {
      usernameError: !userData.username ?
        'Username must be filled' : null,
      emailError: !userData.email ?
        'Email must be filled' :
        (!userData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) ?
          'Incorrect email': null,
      checkError: !userData.checked ?
        'Agree must be checked' : null
    }

    if (errors.usernameError===null &&
        errors.emailError===null &&
        errors.checkError===null) {
          alert(JSON.stringify(userData))
          userData = {
            'username': '',
            'email': '',
            'checked': false
          }
        }
    this.setState({
      errors:{...errors},
      userData:{...userData}});
  }

  onInputChange = (name, value) => {
    let {userData} = this.state;
    this.setState({
      userData: {
        ...userData,
        [name]: value }})
      }

  onCheckboxChange = () => {
    let {userData} = this.state;
    this.setState({
      userData: {
        ...userData,
        checked: !userData.checked }})
  }

  render() {
    let {userData, errors} = this.state
    return(
      <div>
        <div>
          <label> Username
            <input
            type="text"
            name="username"
            value={userData.username}
            onChange={e => this.onInputChange(
              e.target.name,
              e.target.value)}/>
          </label>
          <span
            style={{color: 'red'}}>{errors.usernameError}
          </span>
        </div>

        <div>
          <label> Email
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={e => this.onInputChange(
                e.target.name,
                e.target.value)}/>
          </label>
          <span
            style={{color: 'red'}}>{errors.emailError}
          </span>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={userData.checked}
              onChange={this.onCheckboxChange} />
            <span>I agree to the terms</span>
          </label>
          <span
            style={{color: 'red'}} >{errors.checkError}
          </span>
        </div>
        <p>
          <button
              type="button"
              value="Submit"
              onClick={this.onSubmit}>Submit
          </button>
        </p>
      </div>
    )
  }
}

export default Form;
