import React from 'react'
import { render } from 'react-dom'

export class FAQ extends React.Component {
  render() {
    return (
      <div id="faq">
      <div className="header">
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

      <div className="header">
      <h3>Can I update my bot?</h3>
      </div>
      At the moment the best way to do that is to submit a new bot and deactivate the old one. Currently bots can not be updated while the season is progressing, but the updated version will be added in to the next season.

      <div className="header">
      <h3>How long do seasons last?</h3>
      </div>
      Normally 2 weeks, but can be longer if not enough games are being played
      </div>
    );
  }
}

export class Learning extends React.Component {
  render() {
    return (
      <div id="learning">

      <div className="header">
      <h3>Starcraft API</h3>
      </div>
      The best place to start creating bots is with the starcraft API.  THis is available at
      <a href="https://github.com/Blizzard/s2client-api">https://github.com/Blizzard/s2client-api</a>  This contains examples tutorials on how to create a starcraft 2 bots

      <div className="header">
      <h3>PySC2</h3>
      </div>
      The deepmind python library:
      <a href="https://github.com/deepmind/pysc2">https://github.com/deepmind/pysc2</a> is a great place to start for running minigames, and using machine learning techniques to overcome challenges.

      <div className="header">
      <h3>Command Center</h3>
      </div>

      A good place to go to start creating SC2 bots is the Command Center framework available at
      <a href="https://github.com/davechurchill/commandcenter" >https://github.com/davechurchill/commandcenter</a>
      </div>
    );
  }
}

export class HelpfulResources extends React.Component {
  render() {
    return (
      <div id="helpful-resources">
        <div className="header">
        <h3>Discord</h3>
        </div>
        The best place to Talk to us is in Discord.  You can join: <a href="https://discord.gg/qTZ65sh">https://discord.gg/qTZ65sh</a>

        <div className="header">
        <h3>Other Resources</h3>
        </div>

        There is also a facebook group: <a href="https://www.facebook.com/groups/969196249883813/">https://www.facebook.com/groups/969196249883813/</a>
        <br />
        And a reddit community <a href="https://www.reddit.com/r/sc2ai/">https://www.reddit.com/r/sc2ai/</a>
        <br />
        Both of these can be useful resources for developing bots.
      </div>
    );
  }
}