import React from "react";
import PropTypes from "prop-types";

export default class TablePagination extends React.Component {
  static propTypes = {
    getPage: PropTypes.func,
    rows: PropTypes.array
  }

  render() {
    let {getPage, rows} = this.props;
    return <div>
      <ul className="pagination">
        {
          rows.map(row =>
            <li key={row}>
              <a href={`#${row}`} onClick={() => getPage(row)}>{row}</a>
            </li>
          )
        }
      </ul>
    </div>;
  }
}
