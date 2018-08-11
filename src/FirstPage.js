import React from "react";
import { connect } from "react-redux";
import { changeLanguage } from "./actions/language";
import { setMyProfilePic, loadMyProfile } from "./actions/profile";
import translations from "./translations";
import Registration from "./Registration";
import Login from "./Login";
import axios from "./axios";

const mapStateToProps = state => {
    return {
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

function FirstPage({ language, changeLanguage }) {
    return (
        <div className="wrapper-main">
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

            <Registration language={language} />
            <Login language={language} />
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FirstPage);
