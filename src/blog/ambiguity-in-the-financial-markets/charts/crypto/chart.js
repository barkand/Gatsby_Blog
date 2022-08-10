import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { MultilineChart } from "../../../../components/charts";

const ChartCrypto = () => (
  <StaticQuery
    query={graphql`
      query {
        allCryptoCsv {
          nodes {
            ...CryptoCsvFragment
          }
        }
      }
    `}
    render={(data) => (
      <MultilineChart data={[...data.allCryptoCsv.nodes]} isDate={true} />
    )}
  />
);

export default ChartCrypto;
