import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { ScatterChart } from "../../../../components/charts";

const ChartUnstructured = () => (
  <StaticQuery
    query={graphql`
      query {
        allUnstructuredCsv {
          nodes {
            id
            value
          }
        }
      }
    `}
    render={(data) => (
      <ScatterChart data={[...data.allUnstructuredCsv.nodes]} isDate={true} />
    )}
  />
);

export default ChartUnstructured;
