import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { ScatterChart } from "../../../../components/charts";

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
      <ScatterChart data={[...data.allDifferentialCsv.nodes]} isDate={false} />
    )}
  />
);

export default ChartDifferential;
