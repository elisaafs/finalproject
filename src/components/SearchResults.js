import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import translations from "../translations";

import CategoryPicker from "./pickers/CategoryPicker";
import LanguagePicker from "./pickers/LanguagePicker";
import LocationPicker from "./pickers/LocationPicker";

const mapStateToProps = (state, props) => {
    return {
        ...props,
        language: state.language,
        searchResults: state.serviceSearch.searchResults
    };
};

function formatNumber(x) {
    if (x < 10) {
        return x.toFixed(1);
    } else {
        return Math.ceil(x);
    }
}

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("results", this.props.searchResults);
        if (!this.props.searchResults) {
            return <Redirect to="/search" />;
        }

        const { language } = this.props;

        const searchResultsComponents = this.props.searchResults.map(
            (searchResult, index) => (
                <div key={index}>
                    <div>{searchResult.name}</div>
                    <div>{searchResult.address}</div>
                    <div>{formatNumber(searchResult.distance)} km</div>
                    <LocationPicker
                        language={language}
                        editable={false}
                        placeId={searchResult.place_id}
                        placeDescription={searchResult.place_description}
                    />
                    <CategoryPicker
                        language={language}
                        editable={false}
                        selectedCategory={searchResult.category}
                        selectedSubcategory={searchResult.subcategory}
                    />
                    <LanguagePicker
                        language={language}
                        editable={false}
                        showFluency={true}
                        selectedLanguage={searchResult.language}
                        selectedFluency={searchResult.fluence}
                    />
                </div>
            )
        );
        return searchResultsComponents;
    }
}

export default connect(mapStateToProps)(SearchResults);
