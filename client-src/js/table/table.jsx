import React from "react";
import PropTypes from "prop-types";

import LoadingAnimation from "./../component/loading.jsx";

import TableBody from "./table-body.jsx";
import TableHeader from "./table-header.jsx";

function columnValue(row, index, column) {
  return column.sortValue ? column.sortValue(row) : row[index];
}

// Sort_direction needs to be either 1 or -1. Optional.
function comparisonFactory(col_index, schema_entry, sort_direction) {
  sort_direction = sort_direction || 1;
  return (a, b) => {
    let val_a = columnValue(a, col_index, schema_entry);
    let val_b = columnValue(b, col_index, schema_entry);
    if(val_a < val_b)
      return -1 * sort_direction;
    if(val_a > val_b)
      return 1 * sort_direction;
    return 0;
  };
}

export default class CustomReactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
      sort_index: null,
      sort_direction: 1,
      destroying: []
    };
    // Cache what destroying is before adding it to state.
    this.destroying = [];
  }

  static propTypes = {
    children: PropTypes.array,
    table: PropTypes.array, // Immutable table data.
    label: PropTypes.string, // The name shown above the table.
    nullMessage: PropTypes.string // What to show if there is no table contents.
  }
  // Figure out what components have been added or removed.
  // We use that information to animate the addition/removal.
  UNSAFE_componentWillReceiveProps(props) {
    // If we have not yet recieved a table, there is nothing to do.
    if(props.table === null) return;
    // If the prop has removed the element, update the state.
    for(let c of this.state.table) {
      if(!props.table.find(e => e.id === c.id)) this._deleteRow(c);
    }
    let new_table = this.state.table;
    for(let c of props.table) {
      if(!this.state.table.find(e => e.id === c.id)) { new_table.push(c); }
    }
    this.setState({
      destroying: this.destroying,
      table: new_table
    });
  }

  _deleteRow(row) {
    this.destroying = this.destroying.concat([row.id]);
    setTimeout(() => {
      this.destroying = this.destroying.filter(ele => ele !== row.id);
      this.setState({
        table: this.state.table.filter(e => e != row),
        destroying: this.destroying
      });
    }, 200);
  }

  updateSort = (sort_index, key, schema) => {
    let sort_direction = (Math.abs(this.state.sort_index) === sort_index) ?
      -this.state.sort_direction : 1;

    this.setState(
      {sort_index, sort_direction},
      () => this.sortTable(comparisonFactory(key, schema[sort_index]))
    );
  }

  sortTable = comparison => {
    const table = this.state.table;
    table.sort(comparison);
    if (this.state.sort_direction < 0) table.reverse();
    this.setState({table});
  }

  render() {
    const children = this.props.children;
    let column_definitions = [];
    if(!this.props.table) return <LoadingAnimation/>;
    React.Children.map(children, child => column_definitions.push(child.props));
    return (
      <table className="table table-striped">
        <TableHeader
          sort_direction={this.state.sort_direction}
          sort_index={this.state.sort_index}
          column_definitions={column_definitions}
          updateSort={this.updateSort}/>
        <TableBody
          table={this.state.table}
          child_cells={this.props.children}
          destroying={this.state.destroying}/>
      </table>
    );
  }
}
