import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeLanguage } from "../actions/language";
import { setMyProfilePic, loadMyProfile } from "../actions/profile";
import translations from "../translations";
import ProfilePicHeader from "./ProfilePicHeader";
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
        setProfilePic: url => dispatch(setMyProfilePic(url)),
        loadMyProfile: dispatch(loadMyProfile())
    };
};

function Header({
    loggedIn,
    language,
    changeLanguage,
    profilePicture,
    firstName,
    lastName
}) {
    console.log("state", loggedIn);
    return (
        <div className="wrapper-header">
            {!loggedIn ? (
                <div className="header">
                    <div className="logo-register">
                        <Logo />
                        <Link to="/login" className="link">
                            {translations.REGISTER_SERVICE[language]}
                        </Link>
                    </div>
                    <div className="links-header">
                        <div
                            className="language"
                            onClick={changeLanguage.bind(null, "en")}
                        >
                            EN
                        </div>
                        <div
                            className="language"
                            onClick={changeLanguage.bind(null, "de")}
                        >
                            DE
                        </div>
                        <div
                            className="language"
                            onClick={changeLanguage.bind(null, "pt")}
                        >
                            PT
                        </div>
                        <div
                            className="language last-language"
                            onClick={changeLanguage.bind(null, "es")}
                        >
                            ES
                        </div>
                        <Link className="buttons-header" to="/login">
                            {translations.LOGIN_BUTTON[language]}
                        </Link>
                        <Link className="buttons-header last" to="/signup">
                            {translations.SIGNUP_BUTTON[language]}
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="header">
                    <div className="logo-register">
                        <Logo />
                        <Link className="link" to="/registration-service">
                            {translations.REGISTER_SERVICE[language]}
                        </Link>
                    </div>
                    <div className="links-header">
                        <div
                            className="language"
                            onClick={changeLanguage.bind(null, "en")}
                        >
                            EN
                        </div>
                        <div
                            className="language"
                            onClick={changeLanguage.bind(null, "de")}
                        >
                            DE
                        </div>
                        <div
                            className="language"
                            onClick={changeLanguage.bind(null, "pt")}
                        >
                            PT
                        </div>
                        <div
                            className="language last-language"
                            onClick={changeLanguage.bind(null, "es")}
                        >
                            ES
                        </div>

                        <div className="name-pic">
                            <div className="wrapper-profilepic-header">
                                <Link to="/profile">
                                    <ProfilePicHeader
                                        image={profilePicture}
                                        first={firstName}
                                        last={lastName}
                                    />
                                </Link>
                            </div>
                            <Link className="names-header" to="/profile">
                                <div className="names-header">
                                    {firstName} {lastName}
                                </div>
                            </Link>
                        </div>
                        <a className="button-logout last" href="/logout">
                            {translations.LOGOUT_BUTTON[language]}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
