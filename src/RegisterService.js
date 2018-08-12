import React, { Component } from "react";
import axios from "./axios";
import translations from "./translations";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        language: state.language
    };
};

class RegisterService extends Component {
    constructor() {
        super();

        this.state = {
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("/registration-service", this.state).then(resp => {
            if (resp.data.error) {
                this.setState({
                    error: resp.data.error
                });
            } else {
                location.replace("/profile");
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
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input
                            onChange={this.handleChange}
                            name="name"
                            placeholder={translations.NAME[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="categorie"
                            placeholder={translations.CATEGORIE[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="subCategorie"
                            placeholder={translations.SUBCATEGORIE[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="contact"
                            placeholder={translations.CONTACT[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="address"
                            placeholder={translations.ADDRESS[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="city"
                            placeholder={translations.CITY[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="country"
                            placeholder={translations.COUNTRY[language]}
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
                            name="language"
                            placeholder={translations.LANGUAGE[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="description"
                            placeholder={translations.DESCRIPTION[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="fluence"
                            placeholder={translations.FLUENCE[language]}
                            type="text"
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
