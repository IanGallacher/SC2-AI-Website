import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'
import { API_URL } from './app.js'

import { AuthorProfile, AuthorTradingCard } from './../component/profile.js'

export default class AuthorBios extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { author: [], author_id: -1, profile: [] };
  }

  setAuthorFromURL() {
    let author_id = -1;
    let profile = [];
    const search = this.props.location.search;
    if(search!="") {
      const params = new URLSearchParams(search);
      author_id = params.get('author');
    }
    this.setState({
      profile: this.state.author[author_id-1],
      author_id: author_id
    });
  }

  componentDidMount() {
    // Get all the authors from the server.
    const url = API_URL + "/authors";

    axios.get(url)
    .then((response) => {
      this.setState({
        author: response.data
      });
      this.setAuthorFromURL();
    })
    .catch((error) => {
      console.log("ERROR");
      console.log(error);
    });
  }

  componentDidUpdate() {
    this.setAuthorFromURL();
  }

  render() {
    if(this.state.author_id == -1)
    {
      return (
        <div className="author-content">
          <h3>Authors</h3>
            {
              this.state.author.map(function(user) {
                console.log("assdfa");
                console.log(user);
              return (
                <div key={user.id}>
                  <AuthorTradingCard user={user}/>
                </div>
              );
            })
          }
        </div>
      );
    }
    else {
      if(this.state.profile != []) {
        return (
          <AuthorProfile author_id={this.state.author_id}/>
        );
      } else {
        return ("Warning: no profile");
      }
    }
  }
}
