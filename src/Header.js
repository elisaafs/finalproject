import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeLanguage } from "./actions/language";
import { setMyProfilePic, loadMyProfile } from "./actions/profile";
import translations from "./translations";
import ProfilePicHeader from "./ProfilePicHeader";

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
        <div className="wrapper-main">
            {!loggedIn ? (
                <div>
                    <Link to="/login">
                        {translations.LOGIN_BUTTON[language]}
                    </Link>
                    <Link to="/signup">
                        {translations.SIGNUP_BUTTON[language]}
                    </Link>
                </div>
            ) : (
                <div>
                    <Link to="/profile">{translations.PROFILE[language]}</Link>
                    <Link to="/registration-service">
                        {translations.REGISTER_SERVICE[language]}
                    </Link>
                    {firstName}
                    {lastName}
                    <ProfilePicHeader
                        image={profilePicture}
                        first={firstName}
                        last={lastName}
                    />
                </div>
            )}

            <div onClick={changeLanguage.bind(null, "en")}>
                Switch to English
            </div>
            <div onClick={changeLanguage.bind(null, "de")}>
                Umschalten auf Deutsch
            </div>
            <div onClick={changeLanguage.bind(null, "pt")}>
                Mudar para Português
            </div>
            <div onClick={changeLanguage.bind(null, "es")}>
                Cambiar a Español
            </div>
            {translations.WE_SPEAK[language]}
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
