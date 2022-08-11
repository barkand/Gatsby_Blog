import React from "react";
import * as d3 from "d3";
import FetchCsv from "./fetchCsv";

export default function Chart({
  data = [],
  size = { width: 600, height: 300 },
  margin = { top: 30, right: 20, bottom: 30, left: 40 },
  isDate = true,
  color = "steelBlue",
}) {
  const [dataChart, setDataChart] = React.useState([]);
  const svgRef = React.useRef(null);

  if (typeof window !== `undefined` && window.innerWidth <= size.width)
    size.width = window.innerWidth - 110;

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
          .range([0, size.width]);
      }

      var yScale = d3
        .scaleLinear()
        .domain([val.min, val.max * 1.2])
        .range([size.height - margin.top, 0]);

      /* Add SVG */
      var svg = svgEl
        .append("svg")
        .attr("width", size.width + margin.left + "px")
        .attr("height", size.height + margin.top + "px")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      /* Add area into SVG */
      var area = d3
        .area()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))
        .curve(d3.curveMonotoneX);

      let line = svg.append("g");

      line
        .selectAll(".line-single")
        .data(dataChart)
        .enter()
        .append("g")
        .attr("class", "line-single")

        /* area */
        .append("path")
        .attr("class", "area")
        .attr("d", (d) => area(d.values))
        .style("stroke", color);

      /* Add Axis into SVG */
      var xAxis = d3.axisBottom(xScale).ticks(5);
      var yAxis = d3.axisLeft(yScale);

      /* Draw x axis */
      let xLineArea = size.height - margin.top;
      /* Move up x axis when min.y is negative */
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
