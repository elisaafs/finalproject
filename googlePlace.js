const axios = require("axios");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; //
} else {
    secrets = require("./secrets"); //
}

const googleMapsApiKey = secrets.GOOGLE_MAPS_API_KEY;

exports.getPlaceId = async function(place) {
    const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
        {
            params: {
                key: googleMapsApiKey,
                input: place,
                inputtype: "textquery"
            }
        }
    );

    const candidates = data.candidates;
    if (candidates) {
        return candidates.map(candidate => candidate.place_id);
    }
    return [];
};

exports.getPlaceIdByText = async function(text) {
    const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json`,
        {
            params: {
                key: googleMapsApiKey,
                query: text
            }
        }
    );

    console.log(data);
    const result = data.results && data.results[0];
    if (result) {
        return {
            place_id: result.place_id,
            description: result.name
        };
    }
    return null;
};

exports.autoCompletePlace = async function(place) {
    const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
            params: {
                key: googleMapsApiKey,
                input: place
            }
        }
    );

    const predictions = data.predictions;
    if (predictions && predictions.length) {
        return {
            description: predictions[0].description,
            place_id: predictions[0].place_id
        };
    }
    return [];
};

exports.getPlaceDetails = async function(placeId) {
    const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
            params: {
                key: googleMapsApiKey,
                placeid: placeId
            }
        }
    );

    return {
        longitude:
            data.result &&
            data.result.geometry &&
            data.result.geometry.location &&
            data.result.geometry.location.lng,
        latitude:
            data.result &&
            data.result.geometry &&
            data.result.geometry.location &&
            data.result.geometry.location.lat,
        address: data.result && data.result.formatted_address
    };
};
