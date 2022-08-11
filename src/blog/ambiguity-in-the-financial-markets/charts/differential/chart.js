import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { ColoredScatterChart } from "../../../../components/charts";

const ChartDifferential = () => (
  <StaticQuery
    query={graphql`
      query {
        allDifferentialCsv {
          nodes {
            id
            value
            color
          }
        }
      }
    `}
    render={(data) => (
      <ColoredScatterChart
        data={[...data.allDifferentialCsv.nodes]}
        isDate={false}
        size={{ width: 300, height: 300 }}
        margin={{ top: 30, right: 0, bottom: 30, left: 300 }}
      />
    )}
  />
);

export default ChartDifferential;
