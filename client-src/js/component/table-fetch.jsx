import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

import ResultTable from "./table.jsx";

class FetchTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: null,
      schema: this.props.schema
    };
  }

  static propTypes = {
    filter: PropTypes.func,
    location: ReactRouterPropTypes.location.isRequired,
    style: PropTypes.string,
    url: PropTypes.string.isRequired,
    schema: PropTypes.array
  }

  componentDidMount() {
    axios.get(this.props.url)
      .then(response => this.setState({ table: response.data }));
  }

  render() {
    let table = this.state.table;
    return <ResultTable
      table={table}
      nullMessage="Nothing found!"
      schema={this.state.schema}
      style={this.props.style}/>;
  }
}
export default withRouter(FetchTable);
