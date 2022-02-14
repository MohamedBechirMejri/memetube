import React from "react";

function Details(): JSX.Element {
  return (
    <div>
      <div>
        <div>
          <img src="#" alt="Channel Logo" />
          <div>
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
