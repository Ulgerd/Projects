import React, { Component } from 'react';
import Marked from 'marked';
import { debounce } from "debounce";

class Final extends Component {
  state = {
    input: '',
    enter: false
  };

  componentDidMount() {
    window.addEventListener('keypress', this.onEnterDown)
  }

  componentWillUnmount(){
    window.removeEventListener('keypress', this.onEnterDown)
  }

  onInputChange = debounce((input) => {
    this.setState({ input })
  }, 500);

  createMarkedText = () => {
    let markup = Marked(this.state.input);
    return { __html: markup}
  }

  onEnterDown = (e) => {
    if(e.keyCode === 13) {
      this.setState({
        enter: !this.state.enter
      })
    }
  }

  render() {
    let output = this.state.enter ?
      <div>{this.state.input}</div> :
      <div
        dangerouslySetInnerHTML={
          this.createMarkedText()}/>

    return(
      <div className='App'>
        <header className= 'App-header'>
          <h1 className= 'App-title'>Markdown Previewer</h1>
        </header>
        <div className= 'container'>
          <textarea
            cols='30'
            rows='5'
            placeholder='Type here, stupid...'
            onChange={e => this.onInputChange(
              e.target.value)}/>
            {output}
        </div>
      </div>
    )
  }
}

export default Final;
