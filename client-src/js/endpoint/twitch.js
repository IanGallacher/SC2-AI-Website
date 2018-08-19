import React from "react";

export default class TwitchStream extends React.PureComponent {
  componentDidMount() {
    new Twitch.Embed("twitch-embed", {
      width: "100%",
      height: "100%",
      channel: "starcraft2ai"
    });
  }
  render() {
    return <div id="twitch-embed" className="embed"></div>;
  }
}
