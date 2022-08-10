import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { LineChart } from "../../../../components/charts";

const ChartFeatureA = () => (
  <StaticQuery
    query={graphql`
      {
        allFeaturesCsv {
          nodes {
            id
            f1
          }
        }
      }
    `}
    render={(data) => (
      <LineChart
        data={[...data.allFeaturesCsv.nodes]}
        isDate={false}
        color={"orange"}
        size={{ width: 420, height: 180 }}
      />
    )}
  />
);

export default ChartFeatureA;
