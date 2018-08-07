import React from "react";
import PropTypes from "prop-types";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Sector
} from "recharts";
const RADIAN = Math.PI / 180;

export const SimpleLineChart = (data, key) => {
  key = key || "value";
  return <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name"/>
      <YAxis domain={["dataMin - 20", "dataMax + 20"]}/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Line type="monotone" dataKey={key} stroke="#8884d8"/>
    </LineChart>
  </ResponsiveContainer>;
};

const renderActiveShape = (p) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = p;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}/>
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}/>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey} textAnchor={textAnchor}
        fill="#333">{`Games: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export class PieChartCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: null };
  }

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number
    })).isRequired,
    height: PropTypes.number,
    width: PropTypes.number
  }

  onPieEnter = (data, index) => {
    this.setState({ activeIndex: index });
  }

  onPieLeave = () => {
    this.setState({ activeIndex: null });
  }

  render() {
    const props = this.props;
    let width = props.width || 200;
    let height = props.height || 300;
    const COLORS = ["#00CC22", "#BB1100", "#FFBB28", "#FF8042"];
    let offset = -(400 - width)/2;
    let style= {
      top: "-25px"
    };
    if(this.state.activeIndex !== null) {
      style.width = "400px";
      style.left = `${offset}px`;
      width = 400;
    }
    return <PieChart width={width} height={height} style={style}>
      <Pie
        activeIndex={this.state.activeIndex}
        activeShape={renderActiveShape}
        data={this.props.data}
        dataKey="value"
        isAnimationActive={false}
        cx={width/2}
        cy={height/2}
        innerRadius={50}
        outerRadius={80}
        onMouseEnter={this.onPieEnter}
        onMouseLeave={this.onPieLeave}>
        {
          this.props.data.map((entry, index) => <Cell
            key={index} fill={COLORS[index % COLORS.length]}/>)
        }
      </Pie>
    </PieChart>;
  }
}
