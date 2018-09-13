import React from "react";
import PropTypes from "prop-types";

export default class TableCell extends React.Component {
  static propTypes = {
    contents: PropTypes.string,
    column: PropTypes.object,
    header: PropTypes.string, // The name shown above the table.
    fieldName: PropTypes.string,
    render: PropTypes.func,
    onClick: PropTypes.func,
    optional: PropTypes.bool,
    showColumnIf: PropTypes.bool,
    row: PropTypes.object
  }

  render() {
    // return null;
    let row = this.props.row;
    let {fieldName, render, onClick, header, showColumnIf, optional} = this.props.column;
    if (showColumnIf && !showColumnIf()) return null;
    let contents = (render) ? render(row) : row[fieldName];
    let cellClass = optional ? "optional" : "";
    cellClass += onClick ? " clickable" : "";
    return <td
      key={header}
      className={ cellClass }
      onClick={() => onClick && onClick(row)}>
      <div className="collapse-container">{ contents }</div>
    </td>;
  }
}
