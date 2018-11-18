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
    selected: {},
    all_seasons: []
  }
);

export const getSeasonFromUrl = (url) => {
  let season_id = null;
  if(url != "") {
    const params = new URLSearchParams(url);
    season_id = params.get("season");
  }
  return Number.parseInt(season_id);
};

export class SeasonSelector extends React.Component {
  static contextType = SeasonContext;

  render() {
    return (
      <Dropdown
        // Make sure the most recent season is selected by default.
        value={`${this.context.all_seasons.findIndex(val => this.context.selected.id == val.id) + 1}`}
        onChange={(event) => {
          this.context.changeSeason(Number.parseInt(event.target.value));
        }} {...this.props}>
        {
          this.context.all_seasons.map(
            opt => <DropdownOption key={opt.id} value={String(opt.id)} label={opt.name}/>
          )
        }
      </Dropdown>
    );
  }
}

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
      selected: PropTypes.object,
      seasons: PropTypes.array
    })
  }

  componentDidMount() {
    let axios_url = `${API_URL}/seasons`;
    axios.get(axios_url).then(
      response => {
        let id_from_url = getSeasonFromUrl(this.props.location.search);
        let season_key = response.data.findIndex(val => id_from_url == val.id);
        season_key = season_key == -1 ? (response.data.length-1) : season_key;
        this.props.root.setState({
          seasonContext: {
            changeSeason: this.changeSeason,
            all_seasons: response.data,
            selected: response.data[season_key]
          }
        });
      }
    );
  }

  changeSeason = (newSeasonId) => {
    let seasonContext = this.props.root.state.seasonContext;
    const params = new URLSearchParams(this.props.location.search);
    params.set("season", newSeasonId);
    this.props.history.push({ search: params.toString() });
    let season_key = seasonContext.all_seasons.findIndex(val => newSeasonId == val.id);
    this.props.root.setState({
      seasonContext: {
        changeSeason: seasonContext.changeSeason,
        all_seasons: seasonContext.all_seasons,
        selected: seasonContext.all_seasons[season_key]
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
