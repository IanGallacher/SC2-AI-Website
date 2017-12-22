import React from 'react'
import { render } from 'react-dom'

function renderTableRow(row) {
  return (
    <tr key={row.id}>
      {
        Object.keys(row).map( key => {
          if(key == "id") return;
          else return ( <td>{row[key]}</td> );
        })
      }
    </tr>
  );
}

export class ResultTable extends React.Component {
  constructor(props) {
    super(props);
    // props.label - the name shown above the table. Optional
  }
  render() {
    if(!this.props.table) { return null; }
    return (
      <React.Fragment>
        <h3>{this.props.label}</h3>
        <table className="table table-striped">
          <tbody>
          	<tr>
              { this.props.table_name.map(function(column_name) {
                  return (<th>{column_name}</th>);
              }) }
            </tr>
            { this.props.table.map(function(row) {
                return renderTableRow(row);
            }) }
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
