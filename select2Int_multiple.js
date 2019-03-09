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
    let newSelected;
    if (this.state.selected.indexOf(e) !== -1) {
      let arr = this.state.selected;
      arr.splice(this.state.selected.indexOf(e), 1)
      newSelected = [...arr];
    } else {
      newSelected = [...this.state.selected, e]
    }
    this.setState({
      selected: newSelected
    })
  }

  render() {
    let printSelected = this.state.selected.map(
       key => ` ${key}`)
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
          defaultValue={this.state.selected}
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
