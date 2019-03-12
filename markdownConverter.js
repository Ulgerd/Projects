import React, { Component } from 'react';
import Marked from 'marked';
import { debounce } from "debounce";

class Final extends Component {
  state = {
    input: '',
    enter: false
  };

  textRef = React.createRef();

  componentDidMount() {
    window.addEventListener('keypress', this.onEnterDown)
  }

  componentWillUnmount(){
    window.removeEventListener('keypress', this.onEnterDown)
  }

  onInputChange = (input) => {
    this.setState({ input })
    this.createMarkedText()
  }

  createMarkedText = debounce( () => {
    let {enter, input} = this.state;
    let markup = Marked(input);
    this.textRef.current.innerHTML =
      enter ? input : markup;
  }, 500);

  onEnterDown = (e) => {
    if(e.keyCode === 13) {
      this.setState({
        enter: !this.state.enter
      })
    }
    this.createMarkedText()
  }

  render() {
    let output = <div ref={this.textRef}/>

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
