import React from "react";

function Details(): JSX.Element {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <img src="#" alt="Channel Logo" />
          <div className="flex flex-col items-start justify-center">
            <h2>Channel Name</h2>
            <p>Subscribers</p>
          </div>
        </div>
        <button type="button">Subscribe</button>
      </div>
      <p>
        Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  );
}

export default Details;
