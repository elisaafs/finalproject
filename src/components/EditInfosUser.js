import React, { Component } from "react";
import axios from "../axios";
import { editProfile } from "../actions/editInfosUser";
import { connect } from "react-redux";
import translations from "../translations";
import Footer2 from "./Footer2";
import HeaderRegister from "./HeaderRegister";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, props) => {
    return {
        ...props,
        language: state.language,
        firstName: state.me.firstName,
        lastName: state.me.lastName,
        city: state.me.city,
        country: state.me.country,
        languageSpeak: state.me.languageSpeak,
        email: state.me.email,
        id: state.me.id,
        profilePic: state.me.profilePic
    };
};

class EditInfosUser extends Component {
    constructor(props) {
        super();

        this.state = {
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            firstName: props.firstName || "",
            lastName: props.lastName || "",
            country: props.country || "",
            city: props.city || "",
            languageSpeak: props.languageSpeak || "",
            email: props.email || "",
            password: ""
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("/profile/edit", this.state).then(resp => {
            if (resp.data.error) {
                this.setState({
                    error: resp.data.error
                });
            } else {
                this.props.dispatch(
                    editProfile(
                        this.props.id,
                        this.props.profilePic,
                        this.state
                    )
                );
                this.props.history.push("/myservices");
            }
        });
    }

    render() {
        const { language } = this.props;
        return (
            <div className="edit-page">
                <HeaderRegister />
                <div className="grow-edit">
                    <div className="form-wrapper2">
                        <div className="form-wrapper">
                            {this.state.error ? (
                                <div>{this.state.error}</div>
                            ) : null}
                            <div className="text-search2">
                                {translations.EDIT_PROFILE[language]}
                            </div>
                            <form className="form-edit">
                                <div className="wrapper-email">
                                    <input
                                        className="input-search"
                                        onChange={this.handleChange}
                                        name="firstName"
                                        value={this.state.firstName}
                                        type="text"
                                    />
                                    <div className="down-input">
                                        {translations.FIRSTNAME[language]}
                                    </div>
                                    <input
                                        className="input-search"
                                        onChange={this.handleChange}
                                        name="lastName"
                                        value={this.state.lastName}
                                        type="text"
                                    />
                                    <div className="down-input">
                                        {translations.LASTNAME[language]}
                                    </div>
                                    <input
                                        className="input-search"
                                        onChange={this.handleChange}
                                        name="email"
                                        value={this.state.email}
                                        type="text"
                                    />
                                    <div className="down-input">Email</div>

                                    <input
                                        className="input-search"
                                        onChange={this.handleChange}
                                        name="password"
                                        placeholder={
                                            translations.NEW_PASSWORD[language]
                                        }
                                        value={this.state.password}
                                        type="password"
                                    />
                                    <div className="down-input">
                                        {translations.PASSWORD[language]}
                                    </div>
                                </div>
                            </form>
                            <button
                                className="button-search"
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                                {translations.SAVE_BUTTON[language]}
                            </button>
                        </div>
                    </div>
                </div>
                <Footer2 />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(EditInfosUser));
