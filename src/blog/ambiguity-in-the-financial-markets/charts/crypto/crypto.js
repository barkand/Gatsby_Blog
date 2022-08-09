import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { MultilineChart } from "../../../../components/charts";

const ChartCrypto = () => (
  <StaticQuery
    query={graphql`
      query {
        allChartCryptoCsv {
          nodes {
            ...ChartCryptoCsvFragment
          }
        }
      }
    `}
    render={(data) => (
      <MultilineChart data={[...data.allChartCryptoCsv.nodes]} isDate={true} />
    )}
  />
);

export default ChartCrypto;
