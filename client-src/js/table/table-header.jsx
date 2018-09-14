import React from "react";
import PropTypes from "prop-types";

export default class TableHeader extends React.Component {
  static propTypes = {
    column_definitions: PropTypes.array,
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
    let columns = this.props.column_definitions;
    return <thead>
      <tr>
        { columns.map(({header, fieldName, sortable, showColumnIf, optional}, index) => {
          if (showColumnIf && !showColumnIf()) return null;
          let cell_class = optional ? "optional" : "";
          return (
            <th key={index} className={cell_class} onClick={
              () => sortable !== false && this.props.updateSort(index, fieldName, columns)
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
