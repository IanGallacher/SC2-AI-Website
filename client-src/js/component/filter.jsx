import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

class FilterTag extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    category: PropTypes.string,
    query: PropTypes.string,
    location: ReactRouterPropTypes.location.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  }

  removeFilter = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    params.delete(this.props.category);
    this.props.history.push(`/bots/?${params.toString()}`);
  }

  render() {
    return <div className="filter-tag">
      {`${this.props.category}: ${this.props.query}`}
      <span className="modal-exit" onClick={this.removeFilter}>&times;</span>
    </div>;
  }
}

// Default export, using withRouter().
class FilterBar extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  }

  render() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    let entry_list = [];
    for(let pair of params.entries()) entry_list.push(pair);

    // Don't draw the filter bar if there is nothing to draw.
    let is_hidden = (entry_list.length <= 0) ? "filter-hidden" : "";

    // Filter based on search params.
    return <div className={`filter-bar ${is_hidden}`}>
      <div className="filter-bar-label">Filters:</div>
      {
        entry_list.map(pair => {
          return <FilterTag key={pair[0]} category={pair[0]} query={pair[1]}
            location={this.props.location} history={this.props.history}/>;
        })
      }
    </div>;
  }
}
export default withRouter(FilterBar);
