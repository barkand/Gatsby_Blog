import React from "react";
import * as d3 from "d3";
import FetchCsv from "./fetchCsv";

export default function Chart({
  data = [],
  size = { width: 600, height: 300 },
  dotted = false,
  isDate = false,
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
      FetchCsv(data, isDate).then((jsonData) => {
        setDataChart(jsonData);
      });
    }
    // eslint-disable-next-line
  }, [data]);

  var margin = { top: 30, right: 20, bottom: 30, left: 45 };

  var lineOpacity = "0.25";
  var lineOpacityHover = "0.85";
  var otherLinesOpacityHover = "0.1";
  var lineStroke = "1.5px";
  var lineStrokeHover = "2.5px";

  var circleOpacity = "0.85";
  var circleOpacityOnLineHover = "0.25";

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
          if (isDate) {
            key = {
              min: Math.min(key.min, d.x),
              max: Math.max(key.max, d.x),
            };
          }
          val = {
            min: Math.min(val.min, d.y ?? 0),
            max: Math.max(val.max, d.y ?? 0),
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

      var color = d3.scaleOrdinal(d3.schemeCategory10);

      /* Add SVG */
      var svg = svgEl
        .append("svg")
        .attr("width", size.width + margin.left + "px")
        .attr("height", size.height + margin.top + "px")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      /* Add line into SVG */
      var line = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));

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

        /* line */
        .append("path")
        .attr("class", "line")
        .attr("d", (d) => line(d.values))
        .style("stroke", (d, i) => color(i))
        .style("opacity", lineOpacity)

        /* Mouse over */
        .on("mouseover", function (d) {
          d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
          d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
          d3.select(this)
            .style("opacity", lineOpacityHover)
            .style("stroke-width", lineStrokeHover)
            .style("cursor", "pointer");
        })

        /* Mouse out */
        .on("mouseout", function (d) {
          d3.selectAll(".line").style("opacity", lineOpacity);
          d3.selectAll(".circle").style("opacity", circleOpacity);
          d3.select(this)
            .style("stroke-width", lineStroke)
            .style("cursor", "none");
        });

      if (dotted === true) {
        /* Add circles in the line */
        var duration = 250;
        var circleRadius = 1;
        var circleRadiusHover = 3;

        lines
          .selectAll("circle-group")
          .data(dataChart)
          .enter()
          .append("g")
          .style("fill", (d, i) => color(i))
          .selectAll("circle")
          .data((d) => d.values)
          .enter()
          .append("g")
          .attr("class", "circle")

          /* circle Mouse over */
          .on("mouseover", function (d) {
            d3.select(this)
              .style("cursor", "pointer")
              .append("text")
              .attr("class", "text")
              .text(`${d.y}`)
              .attr("x", (d) => xScale(d.x) + 5)
              .attr("y", (d) => yScale(d.y) - 10);
          })

          /* circle Mouse out */
          .on("mouseout", function (d) {
            d3.select(this)
              .style("cursor", "none")
              .transition()
              .duration(duration)
              .selectAll(".text")
              .remove();
          })
          .append("circle")
          .attr("cx", (d) => xScale(d.x))
          .attr("cy", (d) => yScale(d.y))
          .attr("r", circleRadius)
          .style("opacity", circleOpacity)
          .on("mouseover", function (d) {
            d3.select(this)
              .transition()
              .duration(duration)
              .attr("r", circleRadiusHover);
          })
          .on("mouseout", function (d) {
            d3.select(this)
              .transition()
              .duration(duration)
              .attr("r", circleRadius);
          });
      }

      /* Add Axis into SVG */
      var xAxis = d3.axisBottom(xScale).ticks(5);
      var yAxis = d3.axisLeft(yScale);

      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${size.height - margin.top})`)
        .call(xAxis);

      svg.append("g").attr("class", "y axis").call(yAxis);

      /* Title */
      svg
        .append("text")
        .attr("x", -60)
        .attr("y", 20)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .attr("font-size", " calc(1.5vmin)")
        .text("Total values");
    }

    // eslint-disable-next-line
  }, [dataChart]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}
