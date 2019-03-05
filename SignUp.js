import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        usernameError: '',
        emailError: '',
        checkError: ''
      },
      userData: {
        'username': '',
        'email': '',
        'checked': false
      }
    }
  }

  onSubmit = (e) => {
    let prevData = {...this.state};

    let usEr = (!prevData.userData.username) ?
      'Username must be filled' : null;

    let emEr = (!prevData.userData.email) ?
      'Email must be filled' :
      (!prevData.userData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) ?
      'Incorrect email': null;

    let chEr = (!prevData.userData.checked) ?
    'Agree must be checked' : null;

    prevData.errors = {usernameError: usEr||'',
                       emailError: emEr||'',
                       checkError: chEr||''
                      }

    if (usEr===null && emEr===null && chEr===null) {
      alert(JSON.stringify(prevData.userData))
      prevData.userData = {
        'username': '',
        'email': '',
        'checked': false
      }
    }
    this.setState(prevData);
    e.preventDefault();
  }

  onInputChange = (event) => {
    let prevData = {...this.state.userData};
    prevData[event.target.name] = event.target.value;
    this.setState(state => ({
      ...state, userData: {...prevData }}))
  }

  onCheckboxChange = () => {
    this.setState(state => ({
      ...state,
      userData: {...state.userData, checked: !state.userData.checked }}))
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label> Username
              <input
              type="text"
              name="username"
              value={this.state.userData.username}
              onChange={this.onInputChange}/>
            </label>
            <span style={{color: 'red'}}>{this.state.errors.usernameError}</span>
          </div>

          <div>
            <label> Email
              <input
              type="text"
              name="email"
              value={this.state.userData.email}
              onChange={this.onInputChange}/>
            </label>
            <span style={{color: 'red'}} >{this.state.errors.emailError}</span>
          </div>

          <div>
            <label>
              <input
              type="checkbox"
              checked={this.state.userData.checked}
              onChange={this.onCheckboxChange} />
              <span>I agree to the terms</span>
            </label>
            <span style={{color: 'red'}} >{this.state.errors.checkError}</span>
          </div>
          <p><input type="submit" value="Submit" /></p>
        </form>
      </div>
    )
  }
}

export default Form;
