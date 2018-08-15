import React from "react";

function GoogleMap({ placeId }) {
    return (
        <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyANStqHKHy9SVYeSWQeYBwE-9mK3S-HQvA&q=place_id:${encodeURIComponent(
                placeId
            )}`}
        />
    );
}

export default GoogleMap;
