import React from "react";
import PropTypes from "prop-types";

import TableCell from "./table-cell.jsx";

export default class TableRow extends React.Component {
  static propTypes = {
    column_definitions: PropTypes.array,
    style: PropTypes.string,
    row: PropTypes.object
  }

  render() {
    return <tr key={this.props.row.id} className={this.props.style}>
      {
        this.props.column_definitions.map(column => {
          return (
            <TableCell
              key={column.header}
              row={this.props.row}
              column={column}/>
          );
        })
      }
    </tr>;
  }
}
