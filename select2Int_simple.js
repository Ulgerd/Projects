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
    selected: ['Bar'],
    options:{
              1: "Foo",
              2: "Bar",
              3: "Baz"
            },
    add:    {
              4: "Spam",
              5: "Boo"
            }
  }

  addOption = () => {
    let {add,options} = this.state;
    Object.keys(add).map(key => {
      if (!(key in options)) {
        this.setState({
          options: {
            ...options,
            [key]: add[key]}
        })
      }
      return null;
    })
}

  onChange = (e) => {
      this.setState({
        selected: e.target.value
      })
  }

  render() {
    let {selected, add, options} = this.state;
    let everythingAdded = Object.keys(add).every(
      key => key in options)
    return(
      <div>
        <div>
          <button
            type='button'
            className='.button'
            disabled={everythingAdded}
            onClick={this.addOption}>
            Add a new Tag
          </button>
        </div>
        <hr/>
        <Select2
          values={options}
          defaultValue={selected}
          onSelect={this.onChange}/>
        <p>
          {'Selected: '}
          {selected}
        </p>
      </div>
    )
  }
}

export default Final;
