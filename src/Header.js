import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { changeLanguage } from "./actions/language";
import { setMyProfilePic, loadMyProfile } from "./actions/profile";
import { setServicePic, loadService } from "./actions/services";
import translations from "./translations";
import Registration from "./Registration";
import Login from "./Login";
import axios from "./axios";

const mapStateToProps = state => {
    return {
        loggedIn: state.me.id != undefined,
        language: state.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: language => dispatch(changeLanguage(language)),
        setProfilePic: url => dispatch(setMyProfilePic(url)),
        loadMyProfile: dispatch(loadMyProfile()),
        loadService: dispatch(loadService()),
        setServicePic: url => dispatch(setServicePic(url))
    };
};

function Header({ loggedIn, language, changeLanguage }) {
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
                    {" "}
                    <Link to="/profile">
                        {translations.PROFILE[language]}
                    </Link>{" "}
                </div>
            )}
            <Link to="/profile">{translations.PROFILE[language]}</Link>
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
