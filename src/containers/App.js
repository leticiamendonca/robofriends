import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
//import { robots } from './robots';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	} 
}


class App extends Component {
	//constructor() {
		//super()
		//this.state = { robots: [] }
		//}

		componentDidMount() {
			this.props.onRequestRobots();
			//console.log(this.props.store.getState())
			//fetch('https://jsonplaceholder.typicode.com/users')
			//.then(response => response.json())
			//.then(users => this.setState({ robots: users}));
		}

		//onSearchChange = (event) => {
		//this.setState({ searchfield: event.target.value })
		//console.log(this.state.robots)
		//setState is important in React.
		//event.target.value returns what the event object holds
		// console.log(event.target.value);
	//}

	render() {
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return isPending ? 
			<h1>Fetching Robots</h1> :
		(
			<div className='tc'>
				<h1 className='f1'>Robosearch</h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
					<CardList robots={filteredRobots} />
					</ErrorBoundary>
				</Scroll>
			</div>
		);		
		
	}	
}

export default connect(mapStateToProps, mapDispatchToProps)(App);