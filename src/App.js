import React, {Component} from 'react'
import Table from './Table'
import Form from './Form'
import firebase from './firebase.js'


class App extends Component {
	state = {
		characters: [],
		ids: [],
	}

	componentDidMount = () => {
		this.db = firebase.firestore();

		this.unsubscribe = this.db.collection("jobs").onSnapshot((collection) => {
			let newPplList = []
			let newIDList = []

			collection.forEach(function(doc){
				let personData = doc.data()
				let newPerson = {
					name: personData.name,
					job: personData.job,
				}
				newPplList.push(newPerson)
				newIDList.push(doc.id)
			})
			this.setState({
				characters: newPplList,
				ids: newIDList,
			})
		})
	}

	componentWillUnmount = () => {
		this.unsubscribe();
	}


	removeCharacter = (index) => {
		const {characters} = this.state

		this.setState({
			characters: characters.filter((character, i) => {
				return i !== index
			}),
		})

		this.db.collection("jobs").doc(this.state.ids[index]).delete().then( function() {
			console.log("Document successfully deleted")
		}).catch (function(error){
			console.error("Error removing document: ", error)
		})
	}

	handleSubmit = (character) => {
		let charID = 0
		this.db.collection("jobs").add(character).then(function(docRef){
			charID = docRef.id
			console.log("Document written with ID: ", docRef.id);
		}).catch(function(error){
			console.log("Error writing document: ", error);
		});

		this.setState({characters: [...this.state.characters, character],
						ids: [...this.state.ids, charID]
		})
	}


	render() {
		const {characters} = this.state

		return (
			<div className="container">
				<Table characterData={characters} removeCharacter={this.removeCharacter} />
				<Form handleSubmit={this.handleSubmit} />
			</div>
		)
	}
}

export default App