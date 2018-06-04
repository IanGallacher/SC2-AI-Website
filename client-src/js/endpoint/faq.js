import React from "react";

export default class FAQ extends React.Component {
  render() {
    return <div className="text-zone">
      <div>
        <h3>I get an &quot;Unable to open map&quot; error when trying to open a Replay</h3>
      </div>
      Besides the replay you need the map files. <a href="/assets/Maps.zip">You can download them here.</a> Put the folder &quot;Maps&quot; in the StarCraft 2 root directory, e.g. under windows you then have &quot;C:\Program Files (x86)\StarCraft II\Maps\&quot;.

      <div>
        <h3>I want to develop a bot. Where to start?</h3>
      </div>
      <a href="http://wiki.sc2ai.net/Main_Page">Check out the &quot;Getting started&quot; section of our wiki</a>. It lists the different frameworks in which you can develop your bot and gives some example bots.

      <div>
        <h3>When can I submit my bot?</h3>
      </div>
      Whenever you like. Once you register your bot, it will need to be verified to check for crashes etc. and will be entered into the ladder as soon as possible.

      <div>
        <h3>Can I update my bot after submission?</h3>
      </div>
      Yes. After verification it replaces the old version of your bot and inherits its win/loss/ELO stats. A continuous ELO rating is used to encourage well rounded bots and not &quot;one trick ponies&quot;.

      <div>
        <h3>You have more in detail questions?</h3>
      </div>
      <a href="https://discord.gg/qTZ65sh">This discord (https://discord.gg/qTZ65sh) is the perfect place to ask them.</a>
    </div>;
  }
}
