import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" },
  ];

  render() {

    const { onFilterChange, filter } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {

      const style = (filter === name) ? "btn-info" : "btn-outline-secondary";

      return (
        <button type="button"
                key={ name }
                onClick={ () => onFilterChange(name) }
                className={`btn ${style}`} >{ label }</button>
      );
    });

    return (
      <div className="btn-group">
        { buttons }
      </div>
    );
  }
}