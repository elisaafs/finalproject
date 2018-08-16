import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer from "./Footer";
import translations from "../translations";
import HeaderInside from "./HeaderInside";
import { Link } from "react-router-dom";
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
        if (!this.props.searchResults) {
            return <Redirect to="/search" />;
        }

        const { language } = this.props;

        const searchResultsComponents = this.props.searchResults.map(
            (searchResult, index) => (
                <div className="wrapper-results" key={index}>
                    <LocationPicker
                        language={language}
                        editable={false}
                        placeId={searchResult.place_id}
                    />

                    <div className="wrapper-services-box">
                        <Link
                            class="link-result"
                            to={`/service/${searchResult.id}`}
                        >
                            <div className="name-s">{searchResult.name}</div>
                        </Link>{" "}
                        <div className="cate-s">
                            <CategoryPicker
                                language={language}
                                editable={false}
                                selectedCategory={searchResult.category}
                            />
                        </div>
                        <div className="address-s">
                            <i className="fas fa-map-marker-alt pin" />
                            {searchResult.address} ({formatNumber(
                                searchResult.distance
                            )}{" "}
                            km)
                        </div>
                        <div className="language-results">
                            <i className="fas fa-globe-americas globo" />
                            <LanguagePicker
                                language={language}
                                editable={false}
                                selectedLanguage={searchResult.language}
                                selectedFluency={searchResult.fluence}
                            />
                        </div>
                    </div>
                </div>
            )
        );
        return (
            <div>
                <div className="results-page">
                    <HeaderInside />
                    <div className="grow-results">
                        {searchResultsComponents}
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SearchResults);
