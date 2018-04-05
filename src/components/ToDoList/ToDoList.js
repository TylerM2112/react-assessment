import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { completeTask, recieveTasks } from '../../redux/reducer';
import { Link, withRouter } from 'react-router-dom';


class ToDoList extends Component {
  constructor(props){
    super(props);

    this.state = {
      ...props.location.state,
      tasks:[],
      newTask: '',
    }
  }
  componentDidMount(){
    axios.get('https://practiceapi.devmountain.com/api/tasks')
      .then(res=>this.props.recieveTasks(res.data))
      .catch(err=>console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({tasks:nextProps.state.tasks},()=>this.displayTasks);
  }

  addTask(){
    axios.post('https://practiceapi.devmountain.com/api/tasks',{title:this.state.newTask})
      .then(res => {
        this.props.recieveTasks(res.data)
      })
      .catch(err=>alert(err))
  }

  deleteTask(e){
    axios.delete(`https://practiceapi.devmountain.com/api/tasks/${e}`)
      .then(res=>this.props.recieveTasks(res.data))
        .catch(err=>console.log(err))
  }

  completeTask(e){
    this.props.completeTask(e);
    alert(e)

    axios.put(`https://practiceapi.devmountain.com/api/tasks/${e}`)
      .then(res=>this.props.recieveTasks(res.data))
      .catch(err=>console.log(err))
  }

  displayTasks(){
    if(this.state.tasks.length > 0){
      return this.state.tasks.map(e=>{
        return (
          <div className={e.completed ? "taskDiv completedTask" : "taskDiv"}>
          <Link to={{
            pathname: `/details/${e.id}`,
            state: e
        }}>
                <div className="task">{e.title}</div>
              </Link>
              <button onClick={() => this.completeTask(e.id)}>{e.completed ? "Completed!" : "Completed?"}</button>
              <div onClick={() => this.deleteTask(e.id)}>X</div>
            </div>

          )
          })
        }
    }
  render() {
    return (
      <div>
        <div className="toDo">
          <h1>TO-DO:</h1>
          <input onChange={e => this.setState({ newTask: e.target.value })} placeholder={this.state.newTask}/>
          <br />
          <button onClick={()=>this.addTask()}>Add new To-Do</button>
        </div>

        <div className="taskList">
          {this.displayTasks()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    state:state,
  }
}

export default withRouter ( connect(mapStateToProps,{completeTask,recieveTasks})(ToDoList) );