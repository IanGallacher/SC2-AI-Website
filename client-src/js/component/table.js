import React from 'react'
import { render } from 'react-dom'

function renderTableCol(row, schema_entry) {
  let {fieldName, displayValue, displayType, onClick, headerName} = schema_entry
  let contents = (displayValue) ? displayValue(row) : row[fieldName];
  return <td
    key={headerName}
    className={ onClick && "clickable" }
    onClick={() => onClick && onClick(row)}>
    { contents }
  </td>
}

function renderTableRow(row, schema) {
  return <tr key={row.id}>
    { schema.map(schema_entry => renderTableCol( row, schema_entry)) }
  </tr>
}

// Sort_direction needs to be either 1 or -1. Optional.
function comparisonFactory(i, sort_direction) {
  if(!sort_direction) var sort_direction = 1;
  return function(a, b) {
    if(a[i] < b[i])
      return -1 * sort_direction;
    if(a[i] > b[i])
      return 1 * sort_direction;
    return 0;
  }
}

/*
** ResultsTable takes a schema of the following format:
** [{label:"headername",fieldname:"field",displayType:"text"}, ...]
*/
export class ResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: this.props.table,
      sort_index: null,
      sort_direction: 1
    }
    // props.label - the name shown above the table. Optional
  }

  _deleteRow(row) {
    this.setState( {destroying: this.state.destroying.concat([row.id])},
      ()=>setTimeout(() => {
        this.setState({ table: this.state.table.filter(e => e != row),
                        destroying: this.state.destroying.filter(
                          ele => ele !== row.id)})
      }, 200)
    );
  }

  componentWillReceiveProps(props) {
    // If the prop has removed the element, update the state
    for(let c of this.state.table) {
      if(!props.table.find(e => e.id === c.id))
        this._deleteRow(c);
    }
    let newRows = props.table.filter(row => {
      return !this.state.table.find(e => e.id === row.id);
    });
    this.setState({ table: this.state.table.concat(newRows) });
  }

  updateSort = (sort_index, key) => {
    let sort_direction = (Math.abs(this.state.sort_index) === sort_index) ?
      -this.state.sort_direction : 1;
    this.setState(
      {sort_index, sort_direction},
      () => this.sortTable(key)
    );
  }

  sortTable = (key) => {
    const table = this.state.table;
    table.sort(comparisonFactory(key));
    if (this.state.sort_direction < 0) table.reverse();
    this.setState({table})
  }

  renderSortArrow = (index) => {
    var col = this.state.sort_index;
    return (col !== null && Math.abs(col) === index)
      && ((this.state.sort_direction > 0) ? "▲" : "▼");
  }

  render() {
    if(!this.props.table) { return null; }
    return <React.Fragment>
      { (this.props.label) && <h3>{this.props.label}</h3> }
      <table className="table table-striped">
        <tbody>
          <tr>
            { this.props.schema.map((schema_entry, index) => {
              let {fieldName, headerName} = schema_entry;
              return <th onClick={e => this.updateSort(index, fieldName)}>
                {headerName} {this.renderSortArrow(index)}
              </th>
            }) }
          </tr>
          {this.state.table.map(row => renderTableRow(row, this.props.schema))}
        </tbody>
      </table>
    </React.Fragment>
  }
}
