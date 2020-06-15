import React, { Component } from "react";
import Todo from "../components/Todo";
import shortid from "shortid";

class TodoList extends Component {
  state = {
    currentValue: "",
    todos: [],
    todoFilter: "all",
    toggleAllComplete: true,
  };

  addTodo = () => {
    if (this.state.currentValue) {
      this.setState({
        todos: [
          ...this.state.todos,
          {
            id: shortid.generate(),
            text: this.state.currentValue,
            complete: false,
          },
        ],
        currentValue: "",
      });
    }
  };

  onEnterAddTodo = (e) => {
    if (e.key === "Enter") {
      this.addTodo();
    }
  };

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      }),
    });
  };

  handleFilter = (status) => {
    this.setState({
      todoFilter: status,
    });
  };

  handleEdit = (id) => (e) => {
    const todos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: e.target.value,
        };
      }
      return todo;
    });
    this.setState({
      todos,
    });
  };

  handleDelete = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  removeAllComplete = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => !todo.complete),
    });
  };

  toggleAllComplete = () => {
    this.setState({
      todos: this.state.todos.map((todo) => ({
        ...todo,
        complete: this.state.toggleAllComplete,
      })),
      toggleAllComplete: !this.state.toggleAllComplete,
    });
  };

  handleCurrentValue = (e) => {
    this.setState({
      currentValue: e.target.value,
    });
  };

  render() {
    let todos = [];

    if (this.state.todoFilter === "all") {
      todos = this.state.todos;
    } else if (this.state.todoFilter === "active") {
      todos = this.state.todos.filter((todo) => !todo.complete);
    } else if (this.state.todoFilter === "done") {
      todos = this.state.todos.filter((todo) => todo.complete);
    }
    return (
      <div>
        <div className="todoInput">
          <span 
            onClick={this.toggleAllComplete}
          >
            <i class="fa fa-caret-down"></i>
          </span>
          <input
            name="text"
            value={this.state.currentValue}
            onChange={this.handleCurrentValue}
            onKeyDown={this.onEnterAddTodo}
            placeholder="What do you want to do?"
            required
          />
      
        </div>
        
        <ul className="todoList">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              toggleComplete={() => this.toggleComplete(todo.id)}
              onDelete={() => this.handleDelete(todo.id)}
              onEdit={this.handleEdit(todo.id)}
              todo={todo}
            />
          ))}
        </ul>

        <div className="todoFilter">
          <span>
            Todos left:{" "}
            {this.state.todos.filter((todo) => !todo.complete).length}
          </span>

          <div className="todoFilter__status">
            <button
              onClick={() => this.handleFilter("all")}
              className={this.state.todoFilter === "all" && "activeMenu"}
            >
              All
            </button>
            <button
              onClick={() => this.handleFilter("active")}
              className={this.state.todoFilter === "active" && "activeMenu"}
            >
              Active
            </button>
            <button
              onClick={() => this.handleFilter("done")}
              className={this.state.todoFilter === "done" && "activeMenu"}
            >
              Done
            </button>
          </div>
          
          {this.state.todos.some((todo) => todo.complete) ? (
            <button
              className="todoFilter__delete"
              onClick={this.removeAllComplete}
            >
              Remove all completed
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default TodoList;
