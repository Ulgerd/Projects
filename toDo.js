import React, { Component } from 'react';
import Nanoid from 'nanoid/generate';

function idGen() {
   return Nanoid('1234567890abcdef', 4)
}

class Input extends Component{
  constructor(props) {
    super(props);
    this.state = {
      'value': ""
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = () => {
    this.props.onAdd(this.state.value);
    this.setState({value: ""});
  }

  render() {
    return(
        <div>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}></input>
            <span> </span>
            <button
              onClick={this.handleSubmit}
              disabled ={!this.state.value}>
              Add</button>
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
  this.setState(state => ({
    ...state, notes: {...state.notes, [idGen()]: {note:value, checked:false}}
  }))
}

delNote = (id) => {
  let prevNotes = {...this.state.notes};
  delete prevNotes[id];
  this.setState(state => ({
     ...state, notes: {...prevNotes}
   }))
}

onFilterChange = (value) => {
  this.setState(state => ({
    ...state, filter: value
  }))
}

onCheck = (id) => {
  let prevNotes = {...this.state.notes};
  prevNotes[id] = {...prevNotes[id], checked: !prevNotes[id].checked}
  this.setState(state => ({
    ...state, notes: {...prevNotes}
  }))
}

returnBald = (text) => {
  return (text === this.state.filter) ? <b>{text}</b> : text;
}

  render() {
    let notes=[];
    for (let key in this.state.notes) {
        notes.push(<Note
          id={key}
          key={key}
          value={this.state.notes[key]}
          filter={this.state.filter}
          onX={this.delNote}
          onCheck={this.onCheck}/>)
    }
    return(
      <div>
        <Input onAdd={this.addNote}/>
        <div>
          <ul style ={{
            cursor:'pointer',
            listStyleType: 'none',
            paddingLeft: 0}}>
          {notes}
          </ul>
          <div>
            <p>
            {'Show: '}
            <a href='#all' onClick = {() => this.onFilterChange('All')}>
              {this.returnBald('All')}
            </a>
            {', '}
            <a href='#active' onClick = {() => this.onFilterChange('Active')}>
              {this.returnBald('Active')}
            </a>
            {', '}
            <a href='#done' onClick = {() => this.onFilterChange('Done')}>
              {this.returnBald('Done')}
            </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

}

export default Final;
