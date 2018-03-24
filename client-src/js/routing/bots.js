import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'

import { API_URL } from './app.js'
import BotTable from './../component/bots.js'
import { ResultTable } from './../component/table.js'

export default class Bots extends React.Component {
  render() {
    console.log(this);
    return (
      <BotTable/>
    );
  }
}
