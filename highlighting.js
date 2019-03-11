import React, { Component } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/idea.css';


class Final extends Component {
  state = {
    counter: 0,
    snippets: ['console.log("Hello React!");',
               'function foo() { return null }',
               'let ys = [...xs, 1]']
  }

  componentDidMount() {
    hljs.highlightBlock(this.block);
  }

  componentDidUpdate() {
    hljs.highlightBlock(this.block);
  }

  nextSnippet = () => {
    let {counter} = this.state;
    this.setState({
      counter: counter === 2 ? 0 : counter+1
    })
  }

  printSnippet = () => {
    let {snippets, counter} = this.state;
    let snippet = snippets[counter];
    return { __html: snippet }
  }

  render() {
    return(
      <div>
        <button
          type="button"
          onClick={this.nextSnippet}>
            Next Snippet
        </button>
        <pre>
          <code
            className='js'
            dangerouslySetInnerHTML={this.printSnippet()}
            ref ={(block) => this.block = block}>
          </code>
        </pre>
      </div>
    )
  }
}

export default Final;
