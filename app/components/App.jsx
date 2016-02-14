//import uuid from 'node-uuid';
import React from 'react';
import Note from './Note';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

/*
var App = React.createClass({
	render: function() {
		const notes = [
			{
				id: uuid.v4(),
				task: 'Learn Webpack'
			},
			{
				id: uuid.v4(),
				task: 'Learn React'
			},
			{
				id: uuid.v4(),
				task: 'Do laundry'
			}
		];

		return (
			<div>
				<ul>
					{notes.map(note => 
						<li key={note.id}>{note.task}</li>
					)}
				</ul>
			</div>
		);
	}
});

export default App;*/
export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = NoteStore.getState();
		console.log(this.state);
	}

	ComponentDidMount() {
		NoteStore.listen(this.storeChanged);
	}

	ComponentWillUnmount() {
		NoteStore.unlisten(this.storeChanged);
	}

	storeChanged = (state) => {
		this.setState(state);
	};

	render() {
		const notes = this.state.notes;

		return (
			<div>
				<button className='add-note' onClick={this.addNote}>+</button>
				<Notes 
					notes={notes} 
					onEdit={this.editNote}
					onDelete={this.deleteNote}
				/>
			</div>
		);
	}

	addNote = () => {
		console.log('addNote called');
		NoteActions.create({task: 'New task'});
	};

	editNote = (id, task) => {
		NoteActions.update({id, task});
	};

	deleteNote = (id) => {
		NoteActions.delete(id);
	};
}