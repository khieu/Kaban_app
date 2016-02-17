import AltContainer from 'alt-container';
import React from 'react';

import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
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
				<button className='add-lane' onClick={this.addLane}>+</button>
				
				<AltContainer
					stores={[LaneStore]}
					inject={{
						// inject notes into the child (<Notes>)
						lanes: () => LaneStore.getState().lanes || [] // OR function() {return NoteStore.getState().notes;}
						
					}}
				>
					<Lanes />
				</AltContainer>
			</div>
		);
	}

	addLane = () => {
		LaneActions.create({name: 'new Lane'});
	};
}