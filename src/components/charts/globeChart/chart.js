import Chart from "./lib/chart.js";
import LocationOptions from "./lib/utils/LocationOptions";
import React from "react";
import { base } from "@reuters-graphics/style-color/dist/categorical";
import debounce from "lodash/debounce";

class ChartComponent extends React.Component {
  state = {
    width: "mobile",
    location: ["iran"],
    spin: true,
  };

  chartContainer = React.createRef();
  chart = new Chart();

  resize = debounce(() => {
    this.chart.draw();
  }, 250);

  componentDidMount() {
    fetch(
      "https://cdn.jsdelivr.net/npm/@reuters-graphics/graphics-atlas-client@0.4.6/topojson/custom/world.json"
    )
      .then((r) => r.json())
      .then((topojson) => {
        // Use our chart module.
        this.chart
          .selection(this.chartContainer.current)
          .topojson(topojson)
          .props({
            fill: base.blue.hex,
            spin: true,
            marker: { replacementThreshold: 100000 },
          })
          .props({})
          .location(...this.state.location)
          .draw();
      });

    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  componentDidUpdate() {
    this.chart.location(...this.state.location).draw();
  }

  render() {
    return (
      <div>
          <div id="chart" ref={this.chartContainer} />
        <div className="chart-options">
          <LocationOptions setState={(state) => this.setState(state)} />
        </div>
      </div>
    );
  }
}

export default ChartComponent;
