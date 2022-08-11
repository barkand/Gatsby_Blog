import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { ColoredScatterChart } from "../../../../components/charts";

const ChartDifferential = () => (
  <StaticQuery
    query={graphql`
      query {
        allDifferentialCsv {
          nodes {
            x
            y
            color
          }
        }
      }
    `}
    render={(data) => (
      <ColoredScatterChart
        data={[...data.allDifferentialCsv.nodes]}
        isDate={false}
      />
    )}
  />
);

export default ChartDifferential;
