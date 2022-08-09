import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { StackChart } from "../../../components/charts";

const ChartAmbiguity = () => (
  <StaticQuery
    query={graphql`
      query {
        allChartAmbiguityCsv {
          nodes {
            ...ChartCsvFragment
          }
        }
      }
    `}
    render={(data) => (
      <StackChart data={[...data.allChartAmbiguityCsv.nodes]} />
    )}
  />
);

export default ChartAmbiguity;
