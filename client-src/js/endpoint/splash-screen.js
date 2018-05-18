import React from "react";

function getAlpha(distance) {
  return 1 - (distance / 150);
}

function distance(p1, p2) {
  let delta_x = p2.x - p1.x;
  let delta_y = p2.y - p1.y;
  return Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
}

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.TOTAL_POINTS = 350;
    this.setupPoints();
  }

  componentDidMount() {
    requestAnimationFrame(() => this.update());
    window.setInterval(() => {
      this.forceUpdate();
    }, 10);
  }

  componentWillUnmount() {
    window.clearInterval();
  }

  setupPoints = () => {
    this.points = [{x: 0, y: 0}];
    this.edges = [];
    let offset = 100;
    let width = this.width + offset;
    let height = this.height + offset;
    let a = [];
    for (let l = 0; l < this.TOTAL_POINTS; l++)
      a.push({
        x: Math.random() * width - offset/2,
        y: Math.random() * height - offset/2
      });
    this.initial_points = a;
    this.points = this.initial_points;
  }

  drawPoints() {
    if(!this.canvas) return;
    const canvas = this.canvas;
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext("2d");

    this.edges = [];
    this.points.forEach((point, i) => {
      let pts = this.points.slice(i+1);
      pts.sort((p1, p2) => {
        let a = distance(p1, point);
        let b = distance(p2, point);
        return a - b;
      } );
      pts.forEach((p, j) => {
        if(j > 4) return;
        this.edges.push([p, point]);
      });
    });

    this.edges.forEach(edge => {
      let p1 = edge[0];
      let p2 = edge[1];
      let dist = distance(p1, p2);
      let alpha = getAlpha(dist);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 125, 255, " + alpha + ")";
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });
  }

  update() {
    this.drawPoints();
    // Any animation of the points can go below.
    // this.points = this.initial_points.map(point => {
    //   var p = { x: point.x, y: point.y};
    //   let delta_x = this.mouse.x - p.x;
    //   let delta_y = this.mouse.y - p.y;
    //   if(delta_x < 30 && delta_x > -30
    //   && delta_y < 30 && delta_y > -30 ) {
    //     p.x += 10 - delta_x;
    //     p.y += 10 - delta_y;
    //   }
    //   return p;
    // });
  }

  render() {
    if(this.canvas)this.update();
    return <React.Fragment>
      <canvas
        className="splash-screen"
        ref={r => this.canvas = r}
        width={this.width}
        height={this.height}/>
      <div className="splash-title">
        Welcome to the SC2 AI Bot Ladder!
      </div>
    </React.Fragment>;
  }
}
