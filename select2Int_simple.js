import React, { Component } from 'react';
import $ from "jquery"
import "select2/dist/js/select2.js"
import "select2/dist/css/select2.css"
window.jQuery = window.$ = $

class Select2 extends Component {
  componentDidMount() {
    $(document).ready(() => {
      $('.jquerySelect2').select2();
      $('.jquerySelect2').val(this.props.defaultValue).trigger('change')
      $('.jquerySelect2').on("select2:select", this.props.onSelect);
    });
  }

  render(props) {
    let options = Object.keys(this.props.values).map( key =>
      <option
        key={key}>{this.props.values[key]}
      </option>)
    return(
      <select
        style={{width: '10%'}}
        className="jquerySelect2" >
        {options}
      </select>
    )
  }
}

class Final extends Component {
  state = {
    disabled: false,
    options: {
              1: "Foo",
              2: "Bar",
              3: "Baz"
            }
  }

  addOption = () => {
    this.setState({
      disabled: true,
      options: {...this.state.options, 4: "Spam"}
    })
  }

  onChange = (e) => {
      this.setState({
        selected: e.target.value
      })
  }

  render() {
    let defaultValue = this.state.options['2'];
    let printSelected = this.state.selected
    return(
      <div>
        <div>
          <button
            type='button'
            className='.button'
            disabled={this.state.disabled}
            onClick={this.addOption}>
            Add a new Tag
          </button>
        </div>
        <hr/>
        <Select2
          values={this.state.options}
          defaultValue={defaultValue}
          onSelect={this.onChange}/>
        <p>
          {'Selected: '}
          {printSelected || defaultValue}
        </p>
      </div>
    )
  }
}

export default Final;
