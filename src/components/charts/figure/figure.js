import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Figure = ({ source, caption = "", size = 600, marginTop = 0 }) => {
  if (typeof window !== `undefined`) {
    size = window.innerWidth - 10 > size ? size : window.innerWidth - 80;
    if (marginTop < 0) {
      marginTop =
        window.innerWidth > 1350
          ? marginTop
          : marginTop + (1350 - window.innerWidth) / 2;
    }
  }

  return (
    <center>
      <figure
        style={{
          width: `${size}px`,
          marginTop: `${marginTop}px`,
        }}
      >
        <GatsbyImage image={getImage(source)} alt={caption} />
      </figure>
    </center>
  );
};

export default Figure;
