import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Figure = ({ source, size = 600, caption }) => {
  if (typeof window !== `undefined`) {
    size = window.innerWidth > size ? size : window.innerWidth - 80;
  }

  return (
    <figure
      style={{
        width: `${size}px`,
      }}
    >
      <GatsbyImage image={getImage(source)} alt={caption} />
    </figure>
  );
};

export default Figure;
