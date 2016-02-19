import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';
import update from 'react-addons-update';

class LaneStore {
	constructor() {
		this.bindActions(LaneActions);

		this.lanes = [];
	}

	create(lane) {
		console.log('createNewLane');
		const lanes = this.lanes;
		lane.id = uuid.v4();
		lane.notes = lane.notes || [];

		this.setState({
			lanes: lanes.concat(lane)
		});
		console.log(this.lanes);
	}

	update(updatedLane) {
		const lanes = this.lanes.map (lane => {
			if (lane.id === updatedLane.id) {
				return Object.assign({},lane, updatedLane);
			}
			return lane;
		});

		this.setState({lanes});
	}

	delete(id) {
		this.setState({
			lanes: this.lanes.filter(lane => lane.id !== id)
		});
	}

	attachToLane({laneId, noteId}) {
		const lanes = this.lanes.map( (lane) => {
			if (lane.notes.includes(noteId)) {
				lane.notes = lane.notes.filter(note => note !== noteId);
			}
			if (lane.id === laneId) {
				if (lane.notes.includes(noteId)) {
					console.warn('this note is already attached to this lane');
				} else {
					lane.notes.push(noteId);
				}
			}
			return lane;
		});

		this.setState({lanes});
	}

	detachFromLane({laneId, noteId}) {
		const lanes = this.lanes.map( (lane) => {
			if (lane.id === laneId) {
				lane.notes = lane.notes.filter(note => note !== noteId);
			}
			return lane;
		});

		this.setState({lanes});
	}

	move({sourceId, targetId}) {
		// get all the lanes
		const lanes = this.lanes;

		// get the source lane by picking the first lane that has the sourceId
		const sourceLane = lanes.filter(lane => lane.notes.includes(sourceId))[0];
		// get the target lane by picking the first lane that has the targetId
		const targetLane = lanes.filter(lane => lane.notes.includes(targetId))[0];

		// get the index in notes array of sourceId and target Id
		const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
		const targetNoteIndex = targetLane.notes.indexOf(targetId);

		if (sourceLane === targetLane) {
			sourceLane.notes = update(
				sourceLane.notes, {
					$splice: [
						[sourceNoteIndex, 1],
						[targetNoteIndex, 0, sourceId]
					]
				}
			);
		} else {
			// get rid of the sourceId in sourceLane notes array and add it to target lane
			sourceLane.notes.splice(sourceNoteIndex,1);
			targetLane.notes.splice(targetNoteIndex,0, sourceId);
		}

		this.setState({lanes});
	}
}

export default alt.createStore(LaneStore, 'LaneStore');