import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

class FilterTag extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = { pair: PropTypes.array }

  render() {
    return <div className="filter-tag">
      {`${this.props.pair[0]}: ${this.props.pair[1]}`}
    </div>;
  }
}

// Default export, using withRouter().
class FilterBar extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired
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
        entry_list.map(pair => <FilterTag key={pair[0]} pair={pair}/>)
      }
    </div>;
  }
}
export default withRouter(FilterBar);
