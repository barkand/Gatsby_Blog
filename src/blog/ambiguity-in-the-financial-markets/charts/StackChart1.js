import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { StackChart } from "../../../components/charts";

const StackChart1 = () => (
  <StaticQuery
    query={graphql`
      query AllChart {
        allChart1Csv {
          nodes {
            ...ChartCsvFragment
          }
        }
      }
    `}
    render={(data) => <StackChart data={[...data.allChart1Csv.nodes]} />}
  />
);

export default StackChart1;
