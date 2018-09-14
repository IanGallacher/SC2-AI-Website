import React from "react";
import PropTypes from "prop-types";

import TableRow from "./table-row.jsx";

export default class TableBody extends React.Component {
  static propTypes = {
    column_definitions: PropTypes.array,
    destroying: PropTypes.array,
    table: PropTypes.array,
    style: PropTypes.string
  }

  render() {
    let style = this.props.style;
    let column_definitions = this.props.column_definitions;
    let table = this.props.table;
    return <tbody>{table.map((row, i) => {
      let style = "";
      if (this.props.destroying.indexOf(row.id) > -1) style += " destroying";
      return (
        <TableRow
          key={row.id}
          row={row}
          column_definitions={column_definitions}
          style={style}/>
      );
    })}</tbody>;
  }
}
