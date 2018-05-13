import React from "react";

export default class FAQ extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <h3>{"How Do I get on bot on the ladder?"}</h3>
        </div>
      Compile you code into either a release DLL or a command center config file.  Then either upload through your profile, or add a download link.  Your DLL should export the following functions:
        <br />
        <pre><code>void *CreateNewAgent(); // Returns a pointer to a class deriving from sc2::Agent
          <br />
      const char *GetAgentName(); // Returns a string identifier for the agent name
          <br />
      int GetAgentRace(); // Returns the agents prefered race. should be sc2::Race cast to int.
        </code></pre><br />

      Once you register your bot, it will need to be verified to check for crashes etc. and will be entered into the next season.

        <div>
          <h3>Can I update my bot?</h3>
        </div>
      At the moment the best way to do that is to submit a new bot and deactivate the old one. Currently bots can not be updated while the season is progressing, but the updated version will be added in to the next season.

        <div>
          <h3>How long do seasons last?</h3>
        </div>
      Normally 2 weeks, but can be longer if not enough games are being played
      </React.Fragment>
    );
  }
}
