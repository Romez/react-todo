import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addTodo, getTodoList} from './actions';
import Input from '../../components/helpers/input/input';
import './style';

class TodoPage extends React.Component {
    static path = '/todo';

    constructor(props) {
        super(props);
        this.state = {
            inputTodo: ''
        };
    }

    componentWillMount() {
        this.props.dispatch(getTodoList());
    }

    inputChange(value) {
        this.setState({inputTodo: value, error: ''});
    }

    addTodo() {
        const { todoList } = this.props.todo;
        const id = todoList[todoList.length - 1].id + 1;
        const name = this.state.inputTodo;
        this.props.dispatch( addTodo(id, name) );

        this.setState({inputTodo: ''});
    }

    render() {
        const { inputTodo } = this.state;
        const { todoList, error } = this.props.todo;

        return (
            <div>
                <h1>Todo</h1>

                <div className="todo">
                    <div className="todoControl">
                        <Input
                            divClasses={'todoInput'}
                            onChange={this.inputChange.bind(this)}
                            value={ inputTodo }
                            error={ error }
                        />
                        <button className="addTodo" onClick={this.addTodo.bind(this)}>Добавить</button>
                    </div>
                    <div className="todoList">
                        <div className="item">
                            {todoList.map((item, i) => (
                                <div key={i} className="item">
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TodoPage.propTypes = {
    todo: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        todo: state.todo
    };
}

export default connect(mapStateToProps)(TodoPage);
