import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { StackChart } from "../../../../components/charts";

const ChartAmbiguity = () => (
  <StaticQuery
    query={graphql`
      query {
        allAmbiguityCsv {
          nodes {
            ...AmbiguityCsvFragment
          }
        }
      }
    `}
    render={(data) => (
      <StackChart data={[...data.allAmbiguityCsv.nodes]} />
    )}
  />
);

export default ChartAmbiguity;
