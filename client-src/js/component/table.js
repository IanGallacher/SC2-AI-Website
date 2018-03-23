import React from 'react'
import { render } from 'react-dom'

function renderTableRow(row, schema) {
  return (
    <tr key={row.id}>
      {
        schema.map( function(schema_entry) {
            return ( <td>{row[schema_entry.fieldName]}</td> );
        })
      }
    </tr>
  );
}

function comparisonFactory(i) {
  return function(a, b) {
    if(a[i] < b[i])
      return -1;
    if(a[i] > b[i])
      return 1;
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
    this.state = { table: this.props.table }
    // props.label - the name shown above the table. Optional
  }

  onSort = (e, index) => {
    const table = this.state.table;
    table.sort(comparisonFactory(index));
    this.setState({table})
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
              { this.props.schema.map( (schema_entry) => {
                  return (
		      <th onClick={e => this.onSort(e, schema_entry.fieldName)}>
		      {schema_entry.headerName}</th>
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
