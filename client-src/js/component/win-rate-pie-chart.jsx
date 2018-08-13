import React from "react";
import PropTypes from "prop-types";

import { PieChartCustom } from "./../component/chart.jsx";

export default class WinRatePieChart extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    label: PropTypes.string,
    defeats: PropTypes.number.isRequired,
    victories: PropTypes.number.isRequired
  }

  render() {
    const props = this.props;
    const win_percentage = [
      {name: "Victories", value: props.victories},
      {name: "Defeats", value: props.defeats}
    ];
    /// if (props.victories + props.defeats <= 0) return null;
    return <div className="win-rate-zone">
      <div className="win-rate-label">{props.label}</div>
      {
        (props.victories + props.defeats <= 0)
          ? <div className="win-rate-subtitle">not enough data</div>
          : <PieChartCustom data={win_percentage}/>
      }
    </div>;
  }
}
