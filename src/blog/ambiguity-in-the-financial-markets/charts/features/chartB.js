import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { LineChart } from "../../../../components/charts";

const ChartFeatureB = () => (
  <StaticQuery
    query={graphql`
      query {
        allFeaturesCsv {
          nodes {
            id
            f2
          }
        }
      }
    `}
    render={(data) => (
      <LineChart
        data={[...data.allFeaturesCsv.nodes]}
        isDate={false}
        color={"lightblue"}
        size={{ width: 420, height: 180 }}
      />
    )}
  />
);

export default ChartFeatureB;
