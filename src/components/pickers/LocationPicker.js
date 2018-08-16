import React from "react";
import axios from "../../axios";
import translations from "../../translations";
import GoogleMap from "../GoogleMap";

export default class LocationPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchInput: "" };
        this.searchLocation = this.searchLocation.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }

    changeInput(e) {
        this.setState({ searchInput: e.target.value });
    }

    searchLocation() {
        axios
            .get("/place-complete", {
                params: { input: this.state.searchInput }
            })
            .then(resp => {
                if (!resp.data.error) {
                    this.props.changePlace({
                        placeId: resp.data.place_id,
                        placeDescription: resp.data.description
                    });
                }
            });
    }

    render() {
        const { language, editable, placeId, placeDescription } = this.props;
        return (
            <div>
                {editable ? (
                    <div className="wrapper-location">
                        <input
                            onChange={this.changeInput}
                            name="location"
                            placeholder={translations.LOCATION[language]}
                            type="text"
                            className="input-search"
                        />
                        <div onClick={this.searchLocation}>
                            <img
                                className="lupa-search"
                                src="Lupa-search.png"
                            />
                        </div>
                    </div>
                ) : null}
                {placeId ? (
                    <GoogleMap className="google" placeId={placeId} />
                ) : null}
                {placeDescription ? (
                    <div className="place-description">{placeDescription}</div>
                ) : null}
            </div>
        );
    }
}
