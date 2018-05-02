import axios from "axios";
import React from "react";
import { render } from "react-dom";
import { withRouter } from "react-router";

import AlertLogic from "./../logic/alert.js";
import { TableContext } from "./../context/table-context.js";
import { UserContext } from "./../context/user-context.js";
import LoadingAnimation from "./loading.jsx";
import ResultTable from "./table.jsx";

const filterTable = (table, url) => {
  const params = new URLSearchParams(url);
  let filtered_table = table.filter(entry => {
    for(let pair of params.entries())
      if(params.get("search"))
        if(!entry.name.toLowerCase().includes(params.get("search").toLowerCase()))
          return false;
  });
  return filtered_table;
};

class FetchTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schema: schema, updateRowValue: this.updateRowValue };
  }

  componentDidMount() {
    axios.get(this.props.url)
      .then(response => this.setState({ table: response.data }))
      .catch(error => console.log(error));
  }

  updateRowValue = (row, field, val) => {
    let table = this.state.table;
    let i = table.findIndex(e => e.id === row.id);
    table[i][field] = val;
    axios.put(`${this.props.url}/${row.id}`, row)
      .then(response => this.setState({ table }))
      .catch(error => AlertLogic.addMessage(error.response.data.error));
  }

  render() {
    if(!this.state.table) return <LoadingAnimation/>;
    let table = this.state.table;
    if(this.props.filter)
      this.props.filter(table);
    table = filterTable(table, this.props.location.search);
    return <TableContext.Provider value={this.state}>
      <UserContext.Consumer>
        {user_data => <ResultTable
          table={table}
          nullMessage="Nothing found!"
          schema={this.state.schema}
          style={this.props.style}/>}
      </UserContext.Consumer>
    </TableContext.Provider>;
  }
}
export default withRouter(FetchTable);
