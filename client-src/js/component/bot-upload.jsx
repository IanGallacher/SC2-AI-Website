import React from "react";
import PropTypes from "prop-types";

import BotPropType from "./../custom-proptypes/bot.js";
import { TextInput, TextArea, Dropdown, DropdownOption } from "./form.jsx";
import FormZone from "./../component/form-zone.jsx";

export default class BotUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    bot: BotPropType,
    label: PropTypes.string,
    method: PropTypes.string.isRequired
  }

  render() {
    let bot = this.props.bot;
    let uploadPath = `/bots${bot ? `/${bot.id}` : ""}`;
    return <FormZone uploadPath={uploadPath} method={this.props.method}>
      <h3>{this.props.label}</h3>
      <TextInput name="name" placeholder={ bot ? bot.name : "Bot Name" }/>
      <input name="file" type="file" className="btn"/>
      <TextArea name="summary" placeholder={ bot ? bot.summary : "Summary (optional)" }/>
      <TextArea name="description" placeholder={bot ? bot.description : "Description (optional)"}/>
      <TextInput name="license" placeholder={bot ? bot.license : "License (optional)"}/>
      <TextInput name="github" placeholder="Github (optional)"/>
      <Dropdown name="downloadable" defaultValue={bot && bot.downloadable}>
        <DropdownOption value="Please select a downloadable status."/>
        <DropdownOption value="false" label="Downloadable: False"/>
        <DropdownOption value="true" label="Downloadable: True"/>
      </Dropdown>
      <Dropdown name="race" defaultValue={bot && bot.race}>
        <DropdownOption value="Please select a race."/>
        <DropdownOption value="Terran"/>
        <DropdownOption value="Protoss"/>
        <DropdownOption value="Zerg"/>
        <DropdownOption value="Random"/>
      </Dropdown>
    </FormZone>;
  }
}
