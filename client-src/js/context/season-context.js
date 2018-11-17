import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

import { API_URL } from "./../app.js";
import { Dropdown, DropdownOption } from "./../component/form.jsx";

export const SeasonContext = React.createContext(
  {
    changeSeason: () => {},
    selected: "",
    all_seasons: []
  }
);

export const getSeasonFromUrl = (url) => {
  let season_id = null;
  if(url != "") {
    const params = new URLSearchParams(url);
    season_id = params.get("season");
  }
  return Number.parseInt(season_id || "1");
};

export const SeasonSelector = props => {
  return <SeasonContext.Consumer>{seasonContext =>
    <Dropdown onChange={(event) => {
      seasonContext.changeSeason(Number.parseInt(event.target.value));
    }} {...props}>
      { seasonContext.all_seasons.map(
        opt => <DropdownOption key={opt.id} value={String(opt.id)} label={opt.name}/>
      )}
    </Dropdown>
  }</SeasonContext.Consumer>;
};

class SeasonProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { all_seasons: [], selected: null };
  }

  static propTypes = {
    children: PropTypes.element,
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location.isRequired,
    root: PropTypes.object,
    seasonContext: PropTypes.shape({
      changeSeason: PropTypes.function,
      selected: PropTypes.string,
      seasons: PropTypes.array
    })
  }

  componentDidMount() {
    let axios_url = `${API_URL}/seasons`;
    axios.get(axios_url).then(
      response => this.props.root.setState({
        seasonContext: {
          changeSeason: this.changeSeason,
          all_seasons: response.data,
          selected: response.data[0]
        }
      })
    );
  }

  changeSeason = (newSeasonId) => {
    let seasonContext = this.props.root.state.seasonContext;
    const params = new URLSearchParams(this.props.location.search);
    params.set("season", newSeasonId);
    this.props.history.push({ search: params.toString() });
    this.props.root.setState({
      seasonContext: {
        changeSeason: seasonContext.changeSeason,
        all_seasons: seasonContext.all_seasons,
        selected: seasonContext.all_seasons[newSeasonId]
      }
    });
  }

  render() {
    return <SeasonContext.Provider value={this.props.seasonContext}>
      {this.props.children}
    </SeasonContext.Provider>;
  }
}
export default withRouter(SeasonProvider);
