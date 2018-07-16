import React from "react";
import PropTypes from "prop-types";
import LoadingAnimation from "./loading.jsx";

import SchemaEntryPropType from "./../custom-proptypes/schema-entry.js";

function renderTableCell(row, schema_entry) {
  let {fieldName, render, onClick, columnLabel, showColumnIf} = schema_entry;
  if (showColumnIf && !showColumnIf()) return null;
  let contents = (render) ? render(row) : row[fieldName];
  return <td
    key={columnLabel}
    className={ onClick && "clickable" }
    onClick={() => onClick && onClick(row)}>
    <div className="collapse-container">{ contents }</div>
  </td>;
}

function renderTableRow(row, schema, style) {
  return <tr key={row.id} className={style}>
    { schema.map(schema_entry => renderTableCell(row, schema_entry)) }
  </tr>;
}

function columnValue(row, index, schema_entry) {
  if(schema_entry.sortValue)
    return schema_entry.sortValue(row);
  else
    return row[index];
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

export default class ResultTable extends React.Component {
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
    table: PropTypes.array, // Immutable table data.
    label: PropTypes.string, // The name shown above the table.
    schema: PropTypes.arrayOf(SchemaEntryPropType).isRequired,
    nullMessage: PropTypes.string
  }
  // Figure out what components have been added or removed.
  // We use that information to animate the addition/removal.
  UNSAFE_componentWillReceiveProps(props) {
    // If we have not yet recieved a table, there is nothing to do.
    if(props.table === null) return;
    // If the prop has removed the element, update the state.
    for(let c of this.state.table) {
      if(!props.table.find(e => e.id === c.id))
        this._deleteRow(c);
    }
    for(let c of props.table) {
      if(!this.state.table.find(e => e.id === c.id)) {
        let new_m = this.state.table;
        new_m.push(c);
        this.setState( {table: new_m} );
      }
    }
    this.setState({
      destroying: this.destroying
    });
  }

  _deleteRow(row) {
    this.destroying = this.destroying.concat([row.id]);
    setTimeout(() => {
      this.destroying = this.destroying.filter(ele => ele !== row.id);
      this.setState({ table: this.state.table.filter(e => e != row),
        destroying: this.destroying
      });
    }, 200);
  }

  updateSort = (sort_index, key, schema) => {
    let sort_direction = (Math.abs(this.state.sort_index) === sort_index) ?
      -this.state.sort_direction : 1;

    this.setState(
      {sort_index, sort_direction}, () => this.sortTable(comparisonFactory(key, schema[sort_index]))
    );
  }

  sortTable = (comparison) => {
    const table = this.state.table;
    table.sort(comparison);
    if (this.state.sort_direction < 0) table.reverse();
    this.setState({table});
  }

  renderSortArrow = (index) => {
    var col = this.state.sort_index;
    return <div className="sort-arrow"> {
      (col !== null && Math.abs(col) === index)
      && ((this.state.sort_direction > 0) ? "▲" : "▼") }</div>;
  }

  TableHeader = ({schema}) => {
    return <tr>
      { schema.map(({columnLabel, fieldName, sortable, showColumnIf}, index) => {
        if (showColumnIf && !showColumnIf()) return null;
        return (
          <th key={index} onClick={
            () => sortable !== false && this.updateSort(index, fieldName, schema)
          }>
            {columnLabel}
            {this.renderSortArrow(index)}
          </th>
        );
      }) }
    </tr>;
  }

  renderTable = (contents, schema) => {
    return <table className="table table-striped">
      <thead>
        <this.TableHeader schema={schema}/>
      </thead>
      <tbody>
        <tr><td colSpan={schema.length}>{contents}</td></tr>
      </tbody>
    </table>;
  }

  render() {
    var that = this;
    let {schema, label, nullMessage} = this.props;
    let table = this.state.table;
    if(!this.props.table) return this.renderTable(<LoadingAnimation/>, schema);
    if(table && table.length == 0) return this.renderTable(nullMessage, schema);

    return <React.Fragment>
      { (label) && <h3>{label}</h3> }
      <table className="table table-striped">
        <thead>
          <this.TableHeader schema={schema}/>
        </thead>
        <tbody>
          {
            this.state.table.map(row => {
              let style = "";
              if (this.state.destroying.indexOf(row.id) > -1)
                style += " destroying";
              return renderTableRow(row, that.props.schema, style);
            })
          }
        </tbody>
      </table>
    </React.Fragment>;
  }
}
