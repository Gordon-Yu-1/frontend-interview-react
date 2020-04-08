const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] } // uses state to hold the todos (not a third party library)
        this.saveTodo = this.saveTodo.bind(this); // knows about 'this' issue with classes. Best practice.
        this.inputRef = React.createRef(); // knows about refs
    }

    // knows about async/await, lifecycle events
    async componentDidMount() {
        const res = await fetch("http://localhost:3000/todos");
        const json = await res.json();
        this.setState({ todos: json });
    }

    async saveTodo(e) {
        e.preventDefault(); // knows form submission behvaior
        const options = {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todo: this.inputRef.current.value })
        };
        const res = await fetch('http://localhost:3000/todos', options);
        const json = await res.json();
        this.setState({ todos: json });
        this.inputRef.current.value = null;
        return false;
    }

    render() {
        return (
            <form onSubmit={this.saveTodo}>
                <ul>
                    {this.state.todos.map((todo, i) => 
                        <li key={i}>{todo}</li>)}
                </ul>
                <input placeholder='add todo' ref={this.inputRef} />
            </form>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));