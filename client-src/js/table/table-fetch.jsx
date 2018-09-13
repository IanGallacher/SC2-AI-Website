import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

import CustomReactTable from "./../table/table.jsx";

class FetchTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: null
    };
  }

  static propTypes = {
    children: PropTypes.element,
    filter: PropTypes.func,
    location: ReactRouterPropTypes.location.isRequired,
    style: PropTypes.string,
    url: PropTypes.string.isRequired
  }

  componentDidMount() {
    axios.get(this.props.url)
      .then(response => this.setState({ table: response.data }));
  }

  render() {
    let table = this.state.table;
    return <CustomReactTable
      table={table}
      nullMessage="Nothing found!"
      style={this.props.style}>
      {this.props.children}
    </CustomReactTable>;
  }
}
export default withRouter(FetchTable);
