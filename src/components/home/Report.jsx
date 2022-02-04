import React from "react";
import Iframe from "react-iframe";

const Report = ({
  selectDevice,
  selectVenue,
  selectLivePage,
  selectTimestamp,
}) => {
  return (
    <div className="my-2">
      {selectVenue?.value &&
        selectLivePage?.value &&
        selectTimestamp?.value &&
        selectDevice?.value && (
          <>
            <Iframe
              url={`https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/${selectVenue?.value}/${selectLivePage?.value}/${selectTimestamp?.value}/${selectDevice?.value}.html`}
              width="100%"
              height="500px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
            <small>
              Detailed Report URL:
              <a
                href={`https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/${selectVenue?.value}/${selectLivePage?.value}/${selectTimestamp?.value}/${selectDevice?.value}.html`}
              >
                https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/
                {selectVenue?.value}/{selectLivePage?.value}/
                {selectTimestamp?.value}/{selectDevice?.value}.html
              </a>{" "}
            </small>
          </>
        )}
    </div>
  );
};

export default Report;
