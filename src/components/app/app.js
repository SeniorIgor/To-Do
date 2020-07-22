import React, { Component } from 'react';

import AppHeader from './../app-header';
import SearchPanel from './../search-panel';
import TodoList from './../todo-list';
import ItemStatusFilter from './../item-status-filter';
import ItemAddForm from "./../item-add-form";

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Build Awesome App'),
      this.createTodoItem('Have a launch')
    ],
    term: "",
    filter: "all",
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {

    this.setState(({ todoData }) => {
      
      const idx = todoData.findIndex((el) => el.id === id);  
      const newData = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newData,
      }
    })
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem],
      };
    });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem,  
                      [propName]: !oldItem[propName] };

    return [
      ...arr.slice(0, idx), 
      newItem, 
      ...arr.slice(idx + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    })
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    })
  };

  search(items, term) {
    if(term.length === 0) return items;

    return items.filter((item) => item.label
                .toLowerCase().includes(term.toLowerCase()));
  }

  onSearchChange = (term) => {
    this.setState({ term });
  };

  filter = (items, filter) => {
    switch(filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(
      this.search(todoData, term), filter);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={ todoCount } done={ doneCount } />
        <div className="top-panel">
          <SearchPanel onSearchChange={ this.onSearchChange } />
          <ItemStatusFilter onFilterChange={ this.onFilterChange }
                            filter={ filter } />
        </div>
  
        <TodoList 
          todos={ visibleItems }
          onDeleted={ this.deleteItem } 
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone } />

        <ItemAddForm onItemAdded={ this.addItem } />
      </div>
    );
  }
}