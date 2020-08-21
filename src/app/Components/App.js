import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    addTask(e) {
        //console.log(this.state);
        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                console.log(data);
                M.toast({ html: 'Task Updated' });
                this.setState({ title: '', description: '', _id: '' });
                this.fetchTasks();
            });
        }
        else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                console.log(data)
                M.toast({ html: 'Task saved' });
                this.setState({ title: '', description: '' });
                this.fetchTasks();
            }).catch(err => console.error(err));
        }

        e.preventDefault();
    }
    componentDidMount() {
        this.fetchTasks();
    }
    deleteTask(id) {
        //console.log('eliminado id--> ', id);
        if (confirm('¿Ya pero eres o no eres?')) {
            fetch(`api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                console.log(data);
                M.toast({ html: 'Task Deleted' });
                this.fetchTasks();
            });
        }
    }
    editTask(id) {
        //console.log('editando id--> ', id);
        fetch(`/api/tasks/${id}`).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        });
    }
    fetchTasks(e) {
        fetch('/api/tasks').then(res => res.json()).then(data => {
            //console.log(data);
            this.setState({ tasks: data });
            console.log(this.state.tasks);
        }).catch(err => console.error(err));

    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div>
                {/*NAVOGATION*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN STACK</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" name="title" placeholder="Task Title" onChange={this.handleChange} value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea placeholder="Task Description" name="description" className="materialize-textarea" onChange={this.handleChange} value={this.state.description} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <button type="submit" className="btn light-blue darken-4 col s12">
                                                Enviar
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" onClick={() => this.editTask(task._id)} style={{ margin: '4px' }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;