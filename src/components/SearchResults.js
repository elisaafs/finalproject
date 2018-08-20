import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer2 from "./Footer2";
import Profile from "./Profile";
import HeaderRegister from "./HeaderRegister";
import { Link } from "react-router-dom";
import CategoryPicker from "./pickers/CategoryPicker";
import LanguagePicker from "./pickers/LanguagePicker";
import LocationPicker from "./pickers/LocationPicker";
import { loadMyServices } from "../actions/myServices";
import translations from "../translations";

const mapStateToProps = (state, props) => {
    return {
        ...props,
        language: state.language,
        searchResults: state.serviceSearch.searchResults,
        myServices: state.myServices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMyServices: () => dispatch(loadMyServices())
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

    componentDidMount() {
        if (this.props.useMyServices) {
            this.props.loadMyServices();
        }
    }

    render() {
        if (!this.props.useMyServices && !this.props.searchResults) {
            return <Redirect to="/search" />;
        }

        const { language } = this.props;

        const services = this.props.useMyServices
            ? this.props.myServices
            : this.props.searchResults;

        if (!services) {
            return null;
        }

        const searchResultsComponents = services.map((searchResult, index) => (
            <div className="wrapper-results" key={index}>
                <LocationPicker
                    language={language}
                    editable={false}
                    placeId={searchResult.place_id}
                />

                <div className="wrapper-services-box">
                    <img src={searchResult.picture || "default.png"} />
                    <Link
                        className="link-result"
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
                        {searchResult.address}{" "}
                        {searchResult.distance
                            ? `(${formatNumber(searchResult.distance)} km)`
                            : ""}
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
        ));
        return (
            <div>
                <div className="results-page">
                    <HeaderRegister />
                    {this.props.useMyServices ? <Profile /> : null}

                    <div className="grow-results">
                        {services.length ? (
                            searchResultsComponents
                        ) : (
                            <div className="no-services">
                                {translations.NO_SERVICES[language]}
                            </div>
                        )}
                    </div>
                    <Footer2 />
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResults);
