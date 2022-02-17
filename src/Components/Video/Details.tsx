import React from "react";
import turnNumerIntoWords from "../../Utils/turnNumbersIntoWords";

function Details(): JSX.Element {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <img
            src={
              // TODO: get channel Logo from backend
              "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg"
            }
            alt="Channel Logo"
            className="w-12 h-12 m-2 rounded-[.65em] shadow-lg"
          />
          <div className="flex flex-col items-start justify-center">
            <h2 className="font-bold">
              {
                // TODO: get channel name from backend
                "Google"
              }
            </h2>
            <p className="text-xs text-gray-400 ">
              {
                // TODO: get number of subs from backend
                turnNumerIntoWords(123456789)
              }{" "}
              subscribers
            </p>
          </div>
        </div>
        <button
          type="button"
          className="border-[#cf2d2b] border-2 py-2 px-4 m-2 rounded-lg hover:bg-[#cf2d2b] active:scale-[.98] transition-all hover:text-white text-sm font-medium"
        >
          Subscribe
        </button>
      </div>
      <p>
        Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  );
}

export default Details;
