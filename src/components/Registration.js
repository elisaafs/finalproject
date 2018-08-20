import React, { Component } from "react";
import axios from "../axios";
import translations from "../translations";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        language: state.language
    };
};

class Registration extends Component {
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
        axios.post("/registration", this.state).then(resp => {
            if (resp.data.error) {
                this.setState({
                    error: resp.data.error
                });
            } else {
                location.replace("/myservices");
            }
        });
    }

    render() {
        const { language } = this.props;
        return (
            <div className="registration">
                <div className="form-wrapper">
                    {this.state.error ? (
                        <div className="error">{this.state.error}</div>
                    ) : null}
                    <form className="form-login" onSubmit={this.handleSubmit}>
                        <input
                            onChange={this.handleChange}
                            name="firstName"
                            placeholder={translations.FIRSTNAME[language]}
                            type="text"
                            className="input-login"
                        />
                        <input
                            onChange={this.handleChange}
                            name="lastName"
                            placeholder={translations.LASTNAME[language]}
                            type="text"
                            className="input-login"
                        />
                        <input
                            onChange={this.handleChange}
                            name="email"
                            placeholder="Email"
                            type="text"
                            className="input-login"
                        />
                        <input
                            onChange={this.handleChange}
                            name="password"
                            placeholder={translations.PASSWORD[language]}
                            type="password"
                            className="input-login"
                        />
                        <button className="login-button" type="submit">
                            {translations.SIGNUP_BUTTON[language]}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Registration);
