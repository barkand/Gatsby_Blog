import React from "react";
import * as d3 from "d3";
import FetchCsv from "./fetchCsv";

export default function Chart({
  data = [],
  size = { width: 300, height: 300 },
  margin = { top: 30, right: -50, bottom: 30, left: 300 },
  isDate = true,
}) {
  const [dataChart, setDataChart] = React.useState([]);
  const svgRef = React.useRef(null);

  if (
    typeof window !== `undefined` &&
    window.innerWidth < size.width + margin.left + margin.right
  ) {
    size.width = window.innerWidth - margin.left - margin.right - 40;
    margin.right = 0;
    margin.left = size.width;
  }

  React.useEffect(() => {
    if (dataChart.length === 0) {
      FetchCsv(data, isDate).then((jsonData) => {
        setDataChart(jsonData);
      });
    }
    // eslint-disable-next-line
  }, [data]);

  const svgWidth = size.width + margin.left + margin.right;
  const svgHeight = size.height + margin.top + margin.bottom;

  React.useEffect(() => {
    if (dataChart.length > 0) {
      const svgEl = d3.select(svgRef.current);

      let key = { min: 0, max: 0 };
      let val = { min: 0, max: 0 };

      /* Format data */
      dataChart.forEach((d) => {
        d.values.forEach((d) => {
          if (!isDate) {
            key = {
              min: Math.min(key.min, d.x),
              max: Math.max(key.max, d.x),
            };
          }
          val = {
            min: Math.min(val.min, d.y),
            max: Math.max(val.max, d.y),
          };
        });
      });

      var xScale;
      if (isDate) {
        xScale = d3
          .scaleTime()
          .domain(d3.extent(dataChart[0].values, (d) => d.x))
          .range([0, size.width]);
      } else {
        xScale = d3
          .scaleLinear()
          .domain([key.min, key.max * 1.2])
          .range([-1 * size.width, size.width]);
      }

      var yScale = d3
        .scaleLinear()
        .domain([val.min, val.max * 1.2])
        .range([size.height - margin.top, 0]);

      var color = d3.scaleOrdinal(d3.schemeCategory10);

      /* Add SVG */
      var svg = svgEl
        .append("svg")
        .attr("width", size.width + margin.left + "px")
        .attr("height", size.height + margin.top + "px")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      /* Add circle */
      svg
        .selectAll("circle-group")
        .data(dataChart)
        .enter()
        .append("g")
        .selectAll("circle")
        .data((d) => d.values)
        .enter()
        .append("g")
        .attr("class", "circle")
        .attr("fill", (d, i) => color(d.c))

        .append("circle")
        .data((d) => d.values)
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 5);

      /* Add Axis into SVG */
      var xAxis = d3.axisBottom(xScale).ticks(5);
      var yAxis = d3.axisLeft(yScale);

      /* Draw x axis */
      let xLineArea = size.height - margin.top;
      if (val.min < 0) {
        let yd = yScale.domain();
        xLineArea -= Math.ceil(
          xLineArea / ((Math.abs(yd[0]) + yd[1]) / Math.abs(yd[0]))
        );
      }

      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${xLineArea})`)
        .call(xAxis);

      svg.append("g").attr("class", "y axis").call(yAxis);
    }

    // eslint-disable-next-line
  }, [dataChart]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}
