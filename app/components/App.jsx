import AltContainer from 'alt-container';
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

	render() {

		return (
			<div>
				<button className='add-note' onClick={this.addNote}>+</button>
				
				<AltContainer
					stores={[NoteStore]}
					inject={{
						// inject notes into the child (<Notes>)
						notes: () => NoteStore.getState().notes // OR function() {return NoteStore.getState().notes;}
						
					}}
				>
					<Notes 
						onEdit={this.editNote}
						onDelete={this.deleteNote}
					/>
				</AltContainer>
			</div>
		);
	}

	addNote = () => {
		NoteActions.create({task: 'New task'});
	};

	editNote = (id, task) => {
		NoteActions.update({id, task});
	};

	deleteNote = (id) => {
		NoteActions.delete(id);
	};
}