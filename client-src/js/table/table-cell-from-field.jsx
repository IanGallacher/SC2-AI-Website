import React from "react";
import PropTypes from "prop-types";

export default class TableCellFromField extends React.Component {
  static propTypes = {
    contents: PropTypes.string,
    header: PropTypes.string, // The name shown above the table.
    field: PropTypes.string,
    render: PropTypes.func,
    onClick: PropTypes.func,
    optional: PropTypes.bool,
    showColumnIf: PropTypes.bool,
    row: PropTypes.object
  }

  render() {
    let row = this.props.row;
    let {field, render, onClick, header, showColumnIf, optional} = this.props;
    if (showColumnIf && !showColumnIf()) return null;
    let contents = (render) ? render(row) : row[field];
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
