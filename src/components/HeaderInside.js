import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeLanguage } from "../actions/language";
import { loadMyProfile } from "../actions/profile";
import translations from "../translations";
import Logo from "./Logo";

const mapStateToProps = state => {
    return {
        loggedIn: state.me.id != undefined,
        me: state.me,
        language: state.language,
        profilePicture: state.me.profilePic,
        firstName: state.me.firstName,
        lastName: state.me.lastName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: language => dispatch(changeLanguage(language)),
        loadMyProfile: dispatch(loadMyProfile())
    };
};

function HeaderInside({
    loggedIn,
    language,
    changeLanguage,
    firstName,
    lastName
}) {
    console.log("state", loggedIn);
    return (
        <div className="wrapper-header">
            {!loggedIn ? (
                <div className="header-search">
                    <div className="logo-register">
                        <Link to="/">
                            <Logo />
                        </Link>
                        <Link to="/login" className="link-search">
                            {translations.REGISTER_SERVICE[language]}
                        </Link>
                    </div>

                    <div className="links-header">
                        <Link className="buttons-header-search" to="/login">
                            {translations.LOGIN_BUTTON[language]}
                        </Link>
                        <Link
                            className="signup buttons-header-search "
                            to="/signup"
                        >
                            {translations.SIGNUP_BUTTON[language]}
                        </Link>
                        <div
                            className="language-header"
                            onClick={changeLanguage.bind(null, "en")}
                        >
                            EN
                        </div>
                        <div
                            className="language-header"
                            onClick={changeLanguage.bind(null, "de")}
                        >
                            DE
                        </div>
                        <div
                            className="language-header"
                            onClick={changeLanguage.bind(null, "pt")}
                        >
                            PT
                        </div>
                        <div
                            className="language-header last"
                            onClick={changeLanguage.bind(null, "es")}
                        >
                            ES
                        </div>
                    </div>
                </div>
            ) : (
                <div className="header-search">
                    <div className="logo-register">
                        <Link to="/">
                            <Logo />
                        </Link>
                        <Link className="names-header-search" to="/myservices">
                            <div className="names-header-search">
                                <div className="welcome2">
                                    {translations.WELCOME[language]}{" "}
                                </div>
                                <span className="names-header2">
                                    {firstName} {lastName}
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="links-header">
                        <div className="name-pic">
                            <div className="wrapper-profilepic-header" />
                        </div>
                        <Link
                            className="link-search header-login"
                            to="/registration-service"
                        >
                            {translations.REGISTER_SERVICE[language]}
                        </Link>
                        <a className="button-logout-header" href="/logout">
                            {translations.LOGOUT_BUTTON[language]}
                        </a>
                        <div
                            className="language-header"
                            onClick={changeLanguage.bind(null, "en")}
                        >
                            EN
                        </div>
                        <div
                            className="language-header"
                            onClick={changeLanguage.bind(null, "de")}
                        >
                            DE
                        </div>
                        <div
                            className="language-header"
                            onClick={changeLanguage.bind(null, "pt")}
                        >
                            PT
                        </div>
                        <div
                            className="language-header last"
                            onClick={changeLanguage.bind(null, "es")}
                        >
                            ES
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderInside);
