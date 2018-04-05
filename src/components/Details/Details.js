import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { completeTask, recieveTasks, updateTask, deleteTask } from '../../redux/reducer';
import { Link, withRouter } from 'react-router-dom';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.location.state,
        }
    }

    deleteTask(){
        axios.delete(`https://practiceapi.devmountain.com/api/tasks/${this.state.id}`)
          .then(res=>this.props.recieveTasks(res.data))
            .catch(err=>console.log(err))
    }

    saveTask() { 
        axios.patch(`https://practiceapi.devmountain.com/api/tasks/${this.state.id}`, this.state)
            .then(res => this.props.recieveTasks(res.data))
                .catch(err=>console.log(err))
    }
    
    render() {
        console.log(this.state)
        return (
            <div className='detailed-view-container'>
                <div>
                    <div>
                    <Link to={{
            pathname: `/`,
            state: this.state
        }}>{'< Back To Tasks'}</Link>
                    </div>
                    <div className='name-container'>
                        <div>
                            <span>Task</span>
                            <br/>
                            <input onChange={e=>this.setState({title: e.target.value})} placeholder={this.state.title}/>
                        </div>
                        <Link to='/'><button onClick={()=> this.props.completeTask(this.state.id)}>Complete</button></Link>
                    </div>
                    <div className='description-container'>
                        <div>
                            <span>Description</span>
                            <br/>
                            <input onChange={ e=>this.setState({ description: e.target.value })}  placeholder={ this.state.description }/>
                        </div>
                    </div>
                    <div className='details-buttons'>
                        <Link to='/'><button onClick={()=>this.saveTask(this.state.id, this.state.title, this.state.description)}>Save</button></Link>
                        <Link to='/'><button>Cancel</button></Link>
                        <Link to='/'><button onClick={()=> this.deleteTask()}>Delete</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state,
    }
}

export default withRouter(connect(mapStateToProps, { completeTask, recieveTasks, updateTask, deleteTask })(Details));