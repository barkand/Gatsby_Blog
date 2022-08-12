import React from "react";

const LocationOptions = (props) => {
  return (
    <div className="location-options">
      <button onClick={() => props.setState({ location: ["United States"] })}>
        USA
      </button>
      <button
        onClick={() =>
          props.setState({ location: ["europe", [13.404954, 52.520008]] })
        }
      >
        Europe
      </button>
      <button onClick={() => props.setState({ location: ["australia"] })}>
        Australia
      </button>
      <button onClick={() => props.setState({ location: ["Iran"] })}>
        Iran
      </button>
    </div>
  );
};

export default LocationOptions;
