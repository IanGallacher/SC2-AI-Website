import React from "react";
import PropTypes from "prop-types";

import TableRow from "./table-row.jsx";

export default class TableBody extends React.Component {
  static propTypes = {
    child_cells: PropTypes.array,
    destroying: PropTypes.array,
    table: PropTypes.array,
    style: PropTypes.string
  }

  render() {
    let style = this.props.style;
    let table = this.props.table;
    return <tbody>{table.map((row, i) => {
      let style = "";
      if (this.props.destroying.indexOf(row.id) > -1) style += " destroying";
      return (
        <TableRow
          key={row.id}
          row={row}
          child_cells={this.props.child_cells}
          style={style}/>
      );
    })}</tbody>;
  }
}
