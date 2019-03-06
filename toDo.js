import React, { Component } from 'react';
import Nanoid from 'nanoid/generate';

function idGen() {
   return Nanoid('1234567890abcdef', 4)
}

function ReturnBold(props) {
  return (props.text === props.filter) ? <b>{props.text}</b> : props.text;
}

class Input extends Component{
  constructor(props) {
    super(props);
    this.state = {
      'value': ""
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value});
  }

  handleSubmit = () => {
    this.props.onAdd(this.state.value);
    this.setState({
      value: ""});
  }

  render() {
    return(
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}>
        </input>
        <span> </span>
        <button
          onClick={this.handleSubmit}
          disabled ={!this.state.value}>Add
        </button>
      </div>
    )
  }
}

class Note extends Component {

  handleChange = (e) => {
    this.props.onCheck(this.props.id);
  }

  render() {
    if ( (this.props.filter === 'Active' &&
          this.props.value.checked) ||
         (this.props.filter === 'Done' &&
         !this.props.value.checked) ) {
     return null
    }

    return(
      <li
        style={this.props.value.checked ?
              {textDecoration:"line-through"}:
              {textDecoration:"none"} }  >
        <input
          type="checkbox"
          checked={this.props.value.checked}
          onChange={this.handleChange} />
        <span onClick={this.handleChange}>
          {this.props.value.note}
        </span>
        <button
          type='button'
          onClick={()=>this.props.onX(this.props.id)}>
          X
        </button>
        <small> ( {this.props.id} )</small>
      </li>
    )
  }
}

class Final extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'filter': 'All',
      'notes': {
          [idGen()]: {note: "Do First", checked: true},
          [idGen()]: {note: 'Do Second', checked: false},
          [idGen()]: {note: "Do third", checked: false}
      }
    }
}

addNote = (value) => {
  let {notes} = this.state;
  this.setState({
    notes: {...notes, [idGen()]: {
      note:value,
      checked:false}}
  })
}

delNote = (id) => {
  let {notes} = this.state;
  delete notes[id];
  this.setState({
    notes: {...notes}
  })
}

onFilterChange = (value) => {
  this.setState({
    filter: value
  })
}

onCheck = (id) => {
  let {notes} = this.state;
  let note = notes[id]
  this.setState({
    notes: {...notes,
    [id]: {...note, checked: !note.checked}}
  })
}

toArray = (key, obj) => {
  return (obj => obj[key])
}

  render() {
    let {notes, filter} =this.state;
    let notesDeploy = Object.keys(notes).map( key => <Note
          id={key}
          key={key}
          value={notes[key]}
          filter={filter}
          onX={this.delNote}
      	  onCheck={this.onCheck}/> )

    return(
      <div>
        <Input onAdd={this.addNote}/>
        <div>
          <ul style ={{
            cursor:'pointer',
            listStyleType: 'none',
            paddingLeft: 0}}>
          {notesDeploy}
          </ul>
          <div>
            <p>
              {'Show: '}
              <a
                href='#all'
                onClick = {() => this.onFilterChange('All')}>
                <ReturnBold filter={this.state.filter} text = 'All' />
              </a>
              {', '}
              <a
                href='#active'
                onClick = {() => this.onFilterChange('Active')}>
                <ReturnBold filter={this.state.filter} text = 'Active' />
              </a>
              {', '}
              <a
                href='#done'
                onClick = {() => this.onFilterChange('Done')}>
                <ReturnBold filter={this.state.filter} text = 'Done' />
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Final;
