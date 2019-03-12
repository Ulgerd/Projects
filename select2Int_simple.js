import React, { Component } from 'react';
import $ from "jquery"
import "select2/dist/js/select2.js"
import "select2/dist/css/select2.css"
window.jQuery = window.$ = $

class Select2 extends Component {

  render() {
    let {values, defaultValue, onSelect} =this.props;

    return(
      <select
        value={defaultValue}
        onChange = {onSelect}
        ref ={(node) => {this.heading = node}}>
        {values.map( value =>
          <option key={value}>{value}</option>)}
      </select>
    )
  }
}

class Final extends Component {
  state = {
    selected: 'Bar',
    options: ["Foo", "Bar", "Baz"],
    add: ["Spam", "Boo"]
  }

  componentDidMount() {
    $(this.select2.heading).select2()
    $(this.select2.heading).on("select2:select", this.onChange);
  }

  componentWillUnmount() {
    $(this.select2.heading).select2('destroy')
    $(this.select2.heading).off("select2:select");
  }

  addOption = () => {
    let {options, add} = this.state;
    let newAdd = [...add];
    this.setState({
      options: [...options, add[0]],
      add: [...newAdd.splice(1,)]
    })
  }

  onChange = (e) => {
      this.setState({
        selected: e.target.value
      })
  }

  render() {
    let {selected, add, options} = this.state;
    return(
      <div>
        <div>
          <button
            type='button'
            className='.button'
            disabled={add.length===0}
            onClick={this.addOption}>
            Add a new Tag
          </button>
        </div>
        <hr/>
        <Select2
          values={options}
          defaultValue={selected}
          onSelect={this.onChange}
          ref ={(node) => {this.select2 = node}}/>
        <p>
          {'Selected: '}
          {selected}
        </p>
      </div>
    )
  }
}

export default Final;
