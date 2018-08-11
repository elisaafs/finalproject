import React from "react";
import { connect } from "react-redux";
import { changeLanguage } from "./actions/language";
import translations from "./translations";

const mapStateToProps = state => {
    return {
        language: state.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: language => dispatch(changeLanguage(language))
    };
};

function FirstPage({ language, changeLanguage }) {
    return (
        <div className="wrapper-main">
            <div onClick={changeLanguage.bind(null, "en")}>
                Switch to English
            </div>
            <div onClick={changeLanguage.bind(null, "de")}>
                Switch to German
            </div>
            <div onClick={changeLanguage.bind(null, "pt")}>
                Switch to Portuguese
            </div>
            <div onClick={changeLanguage.bind(null, "es")}>
                Switch to Spanish
            </div>
            {translations.WE_SPEAK[language]}
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FirstPage);
