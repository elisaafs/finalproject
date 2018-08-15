import React, { Component } from "react";
import axios from "../axios";
import translations from "../translations";
import { connect } from "react-redux";

import CategoryPicker from "./pickers/CategoryPicker";
import LanguagePicker from "./pickers/LanguagePicker";
import LocationPicker from "./pickers/LocationPicker";

const mapStateToProps = (state, props) => {
    return {
        ...props,
        language: state.language
    };
};

class RegisterService extends Component {
    constructor() {
        super();

        this.state = {
            error: null,
            category: "",
            placeId: null,
            placeDescription: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.changeFluence = this.changeFluence.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeSubcategory = this.changeSubcategory.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    changeCategory(category) {
        this.setState({ category });
    }

    changeSubcategory(subcategory) {
        this.setState({ subcategory });
    }

    changeLanguage(language) {
        this.setState({ language });
    }

    changeFluence(fluence) {
        this.setState({ fluence });
    }

    changeLocation({ placeId, placeDescription }) {
        this.setState({ placeId, placeDescription });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("/registration-service", this.state).then(resp => {
            if (resp.data.error) {
                if (resp.data.error === "requiredFields")
                    this.setState({
                        error: translations.LOGIN_BUTTON[this.props.language]
                    });
            } else {
                this.props.history.push("/profile");
            }
        });
    }

    render() {
        const { language } = this.props;
        return (
            <div className="registration-service">
                <div className="form-wrapper">
                    {this.state.error ? (
                        <div className="error">{this.state.error}</div>
                    ) : null}

                    <LocationPicker
                        language={language}
                        editable={true}
                        placeId={this.state.placeId}
                        placeDescription={this.state.placeDescription}
                        changePlace={this.changeLocation}
                    />

                    <form className="form" onSubmit={this.handleSubmit}>
                        <input
                            onChange={this.handleChange}
                            name="name"
                            placeholder={translations.NAME[language]}
                            type="text"
                        />
                        <CategoryPicker
                            language={language}
                            editable={true}
                            selectedCategory={this.state.category}
                            selectedSubcategory={this.state.subcategory}
                            changeCategory={this.changeCategory}
                            changeSubcategory={this.changeSubcategory}
                        />
                        <input
                            onChange={this.handleChange}
                            name="contact"
                            placeholder={translations.CONTACT[language]}
                            type="text"
                        />

                        <input
                            onChange={this.handleChange}
                            name="homepage"
                            placeholder={translations.HOMEPAGE[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="description"
                            placeholder={translations.DESCRIPTION[language]}
                            type="text"
                        />
                        <LanguagePicker
                            language={language}
                            editable={true}
                            showFluency={true}
                            selectedLanguage={this.state.language}
                            selectedFluency={this.state.fluence}
                            changeLanguage={this.changeLanguage}
                            changeFluency={this.changeFluence}
                        />
                        <button type="submit">
                            {translations.REGISTER_BUTTON[language]}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(RegisterService);
