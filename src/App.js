import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { recieveTasks } from './redux/reducer';
import { Route, Switch, withRouter } from 'react-router-dom';
import ToDoList from './components/ToDoList/ToDoList';
import Details from './components/Details/Details';

class App extends Component {

  componentDidMount(){
    axios.get('https://practiceapi.devmountain.com/api/tasks')
      .then(res=>this.props.recieveTasks(res.data))
      .catch(err=>console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Switch>
            <Route exact path="/" component={ToDoList} />
            <Route path="/details/:id" component={Details} />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    state: state,
  }
}


export default withRouter ( connect ( mapStateToProps, { recieveTasks } )( App ) );