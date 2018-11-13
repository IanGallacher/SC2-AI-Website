import React from "react";
import PropTypes from "prop-types";

export default class TableRow extends React.Component {
  static propTypes = {
    child_cells: PropTypes.array,
    style: PropTypes.string,
    row: PropTypes.object
  }

  render() {
    return <tr key={this.props.row.id} className={this.props.style}>
      {
        this.props.child_cells && this.props.child_cells.map(child_cell => {
          return React.cloneElement(
            child_cell,
            { key: child_cell.props.header, row: this.props.row }
          );
        })
      }
    </tr>;
  }
}
