import React from "react";
import PropTypes from "prop-types";

export default class TableHeader extends React.Component {
  static propTypes = {
    child_cells: PropTypes.array,
    sort_direction: PropTypes.number,
    sort_index: PropTypes.number,
    updateSort: PropTypes.func
  }

  renderSortArrow = (index) => {
    var col = this.props.sort_index;
    return <div className="sort-arrow"> {
      (col !== null && Math.abs(col) === index)
      && (this.props.sort_direction > 0 ? "▲" : "▼") }</div>;
  }

  render() {
    let columns = this.props.child_cells.map(cell => cell.props.schema);
    return <thead>
      <tr>
        { columns.map((schema, index) => {
          if (!schema) return null;
          let {header, field, sortable, showColumnIf, optional} = schema;
          if (showColumnIf && !showColumnIf()) return null;
          let cell_class = optional ? "optional" : "";
          return (
            <th key={index} className={cell_class} onClick={
              () => sortable !== false && this.props.updateSort(index, field, columns)
            }>
              {header}
              {this.renderSortArrow(index)}
            </th>
          );
        }) }
      </tr>
    </thead>;
  }
}
