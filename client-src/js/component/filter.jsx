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
    children: PropTypes.element,
    location: ReactRouterPropTypes.location.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  }

  render() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    let entry_list = [];
    for(let pair of params.entries()) entry_list.push(pair);

    // Don't draw the filter bar if there is nothing to draw.
    let children_count = React.Children.count(this.props.children);
    let total_count = entry_list.length + children_count;
    let is_hidden_class = (total_count <= 0) ? "filter-hidden" : "";

    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { className: "filter-tag" }));

    // Filter based on search params.
    return <div className={`filter-bar ${is_hidden_class}`}>
      <div className="filter-bar-label">Filters:</div>
      {childrenWithProps}
      {
        entry_list.map(pair => <FilterTag
          key={pair[0]}
          category={pair[0]}
          query={pair[1]}
          location={this.props.location}
          history={this.props.history}
        />)
      }
    </div>;
  }
}
export default withRouter(FilterBar);
