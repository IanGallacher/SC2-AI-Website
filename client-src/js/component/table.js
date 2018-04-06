import React from 'react'
import { render } from 'react-dom'

function renderTableCol(row, schema_entry) {
  var col = row[schema_entry.fieldName];
  if(schema_entry.displayType === "download")
    col = "download"
  return (
    <td className={ schema_entry.onClick && "clickable" }
        onClick={() => schema_entry.onClick(row)}>
          { (schema_entry.displayValue) ? schema_entry.displayValue(row) : col }
        </td>
  );
}

function renderTableRow(row, schema) {
  return (
    <tr key={row.id}>
      { schema.map( (schema_entry) => renderTableCol( row, schema_entry) ) }
    </tr>
  );
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
    this.state = { table: this.props.table,
                   // sort_column is the index of the col to sort.
                   sort_column: null,
                   // If sort_direction is negative, sort in reverse order.
                   sort_direction: 1 }
    // props.label - the name shown above the table. Optional
  }

  onSort = (e, index) => {
    const table = this.state.table;
    table.sort(comparisonFactory(index));
    if (this.state.sort_direction < 0) table.reverse();
    this.setState({table: table})
  }

  setSortColumn = (index) => {
    if (Math.abs(this.state.sort_column) === index)
      this.setState({sort_column: index,
                     sort_direction: -this.state.sort_direction})
    else
      this.setState({sort_column: index,
                     sort_direction: -1})
  }

  renderSortArrow(index) {
    var col = this.state.sort_column;
    return (col !== null && Math.abs(col) === index)
      && ((this.state.sort_direction > 0) ? "▲" : "▼");
  }

  render() {
    var that = this;
    if(!this.props.table) { return null; }
    return (
      <React.Fragment>
        { (this.props.label) ? (
            <h3>{this.props.label}</h3>
          ) : (
            <React.Fragment/>
          )
        }
        <table className="table table-striped">
          <tbody>
          	<tr>
              { this.props.schema.map( (schema_entry, index) => {
                  return (
          		      <th onClick={e => { this.setSortColumn(index);
                                        this.onSort(e, schema_entry.fieldName);
                                      }
                    }>
          		      {schema_entry.headerName} {this.renderSortArrow(index)}
                    </th>
            		  );
              }) }
            </tr>
            { this.props.table.map(function(row) {
                return renderTableRow(row, that.props.schema);
            }) }
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
