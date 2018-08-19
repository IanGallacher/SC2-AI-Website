import axios from "axios";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { API_URL } from "./../app.js";

import AuthorTradingCard from "./../component/author-trading-card.jsx";

export default class AuthorList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { author: [], author_id: -1, profile: [] };
  }

  static propTypes = { location: ReactRouterPropTypes.location.isRequired }

  setAuthorFromURL() {
    let author_id = -1;
    const search = this.props.location.search;
    if(search != "") {
      const params = new URLSearchParams(search);
      author_id = params.get("author_id");
    }
    this.setState({
      profile: this.state.author[author_id-1],
      author_id: author_id
    });
  }

  componentDidMount() {
    // Get all the authors from the server.
    const url = `${API_URL}/authors`;

    axios.get(url).then(response => this.setState({ author: response.data }));
  }

  render() {
    return <div className="author-content">
      <h3>Authors</h3>
      {
        this.state.author.map(user => {
          return (
            <div key={user.id}>
              <AuthorTradingCard user={user}/>
            </div>
          );
        })
      }
    </div>;
  }
}
