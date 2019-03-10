import React, { Component } from 'react';
import $ from "jquery"
import "select2/dist/js/select2.js"
import "select2/dist/css/select2.css"
window.jQuery = window.$ = $

class Select2 extends Component {
  componentDidMount() {
    $(document).ready(() => {
      let $sel = $('.jquerySelect2');
      $sel.select2();
      $sel.val(this.props.defaultValue).trigger('change')
      $sel.on("select2:select", e =>
        this.props.onSelect(e.params.data.id));
      $sel.on("select2:unselect", e =>
        this.props.onSelect(e.params.data.id));
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
        className="jquerySelect2"
        multiple="multiple" >
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
    let {selected} = this.state;
    let arr = [...selected];
    arr.splice(selected.indexOf(e), 1)
    let newSelected = (selected.indexOf(e) !== -1) ?
      [...arr] :
      [...selected, e]
    this.setState({
      selected: newSelected
    })
  }

  render() {
    let {selected, add, options} = this.state;
    let printSelected = selected.map(
      key => ` ${key}`)
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
          {printSelected}
        </p>
      </div>
    )
  }
}

export default Final;
