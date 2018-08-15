import React from "react";
import { connect } from "react-redux";

import axios from "../axios";
import translations from "../translations";

import CategoryPicker from "./pickers/CategoryPicker";
import LanguagePicker from "./pickers/LanguagePicker";
import LocationPicker from "./pickers/LocationPicker";
import {
    changeSearchPlaceId,
    changeSearchLanguage,
    changeSearchCategory,
    changeSearchSubcategory,
    changeSearchResults
} from "../actions/serviceSearch";

const mapStateToProps = (state, props) => {
    return {
        ...props,
        language: state.language,
        placeId: state.serviceSearch.placeId,
        placeDescription: state.serviceSearch.placeDescription,
        selectedLanguage: state.serviceSearch.language,
        selectedCategory: state.serviceSearch.category,
        selectedSubcategory: state.serviceSearch.subcategory
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLocation: location => dispatch(changeSearchPlaceId(location)),
        changeLanguage: language => dispatch(changeSearchLanguage(language)),
        changeCategory: category => dispatch(changeSearchCategory(category)),
        changeSubcategory: subcategory =>
            dispatch(changeSearchSubcategory(subcategory)),
        changeSearchResults: searchResults =>
            dispatch(changeSearchResults(searchResults))
    };
};

class ServiceSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const searchParams = {
            placeId: this.props.placeId,
            language: this.props.selectedLanguage,
            category: this.props.selectedCategory,
            subcategory: this.props.selectedSubcategory
        };
        axios.get("/search-service", { params: searchParams }).then(resp => {
            if (resp.data.error) {
                if (resp.data.error === "requiredFields")
                    this.setState({
                        error: translations.LOGIN_BUTTON[this.props.language]
                    });
            } else {
                this.props.changeSearchResults(resp.data);
                this.props.history.push("/search-results");
            }
        });
    }

    render() {
        const { language } = this.props;
        return (
            <div>
                <div>
                    {this.state.error ? (
                        <div className="error">{this.state.error}</div>
                    ) : null}

                    <LocationPicker
                        language={language}
                        editable={true}
                        placeId={this.props.placeId}
                        placeDescription={this.props.placeDescription}
                        changePlace={this.props.changeLocation}
                    />

                    <form className="form" onSubmit={this.handleSubmit}>
                        <CategoryPicker
                            language={language}
                            editable={true}
                            selectedCategory={this.props.selectedCategory}
                            selectedSubcategory={this.props.selectedSubcategory}
                            changeCategory={this.props.changeCategory}
                            changeSubcategory={this.props.changeSubcategory}
                        />
                        <LanguagePicker
                            language={language}
                            editable={true}
                            showFluency={false}
                            selectedLanguage={this.props.selectedLanguage}
                            changeLanguage={this.props.changeLanguage}
                        />
                        <button type="submit">
                            {translations.SEARCH[language]}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceSearch);
