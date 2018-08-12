import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeLanguage } from "./actions/language";
import { setMyProfilePic, loadMyProfile } from "./actions/profile";
import translations from "./translations";

const mapStateToProps = state => {
    return {
        loggedIn: state.me.id != undefined,
        name: state.me.firstName,
        lastName: state.me.lastName,
        profilePic: state.me.profilePic,
        language: state.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: language => dispatch(changeLanguage(language)),
        setProfilePic: url => dispatch(setMyProfilePic(url)),
        loadMyProfile: dispatch(loadMyProfile())
    };
};

function Header({ loggedIn, language, changeLanguage }) {
    console.log({ name });
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
                    <Link to="/register-service">
                        {translations.REGISTER_SERVICE[language]}
                    </Link>
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
