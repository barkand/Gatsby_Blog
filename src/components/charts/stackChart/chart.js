import React from "react";
import * as d3 from "d3";
import FetchCsv from "./fetchCsv";

export default function Chart({
  data = [],
  size = { width: 600, height: 300 },
}) {
  const [dataChart, setDataChart] = React.useState([]);
  const svgRef = React.useRef(null);

  if (typeof window !== `undefined`) {
    size.width =
      window.innerWidth > size.width ? size.width : window.innerWidth - 80;
    size.height = size.width / 2;
  }

  React.useEffect(() => {
    if (dataChart.length === 0) {
      FetchCsv(data).then((jsonData) => {
        setDataChart(jsonData);
      });
    }
    // eslint-disable-next-line
  }, [data]);

  var margin = { top: 30, right: 20, bottom: 30, left: 20 };

  var lineOpacity = "0.4";
  var lineOpacityHover = "0.9";
  var otherLinesOpacityHover = "0.2";
  var lineStroke = "2px";
  var lineStrokeHover = "3px";

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
          key = {
            min: Math.min(key.min, d.x),
            max: Math.max(key.max, d.x),
          };
          val = {
            min: Math.min(val.min, d.y1),
            max: Math.max(val.max, d.y1),
          };
        });
      });

      /* Scale */
      var xScale = d3
        .scaleLinear()
        .domain([key.min, key.max * 1.2])
        .range([0, size.width]);

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

      /* Add area into SVG */
      var area = d3
        .area()
        .x((d) => xScale(d.x))
        .y0((d) => yScale(d.y0))
        .y1((d) => yScale(d.y1));

      let lines = svg.append("g").attr("class", "lines");

      lines
        .selectAll(".line-group")
        .data(dataChart)
        .enter()
        .append("g")
        .attr("class", "line-group")

        /* Mouse over */
        .on("mouseover", function (d, i) {
          svg
            .append("text")
            .attr("class", "title-text")
            .style("fill", color(i))
            .text(d.name)
            .attr("text-anchor", "middle")
            .attr("x", (size.width - margin.left) / 2)
            .attr("y", 5);
        })

        /* Mouse out */
        .on("mouseout", function (d) {
          svg.select(".title-text").remove();
        })

        /* area */
        .append("path")
        .attr("class", "area")
        .attr("d", (d) => area(d.values))
        .style("stroke", (d, i) => color(i)) //fill
        .style("opacity", lineOpacity)

        /* Mouse over */
        .on("mouseover", function (d) {
          d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
          d3.select(this)
            .style("opacity", lineOpacityHover)
            .style("stroke-width", lineStrokeHover)
            .style("cursor", "pointer");
        })

        /* Mouse out */
        .on("mouseout", function (d) {
          d3.selectAll(".line").style("opacity", lineOpacity);
          d3.select(this)
            .style("stroke-width", lineStroke)
            .style("cursor", "none");
        });

      /* Add Axis into SVG */
      var xAxis = d3.axisBottom(xScale).ticks(5);
      var yAxis = d3.axisLeft(yScale);

      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${size.height - margin.top})`)
        .call(xAxis);

      svg.append("g").attr("class", "y axis").call(yAxis);
    }

    // eslint-disable-next-line
  }, [dataChart]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}
