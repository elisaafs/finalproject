import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { changeLanguage } from "../actions/language";
import translations from "../translations";
import { setMyProfilePic, loadMyProfile } from "../actions/profile";

const mapStateToProps = state => {
    return {
        language: state.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: language => dispatch(changeLanguage(language)),
        setProfilePic: url => dispatch(setMyProfilePic(url)),
        loadMyProfile: () => dispatch(loadMyProfile())
    };
};

function FirstPage({ language }) {
    return (
        <div className="wrapper-main">
            <Header />
            <div className="wrapper-cover">
                <img className="cover" src="1.jpg" />{" "}
            </div>
            <div className="we-speak">
                {translations.WE_SPEAK[language]}{" "}
                <span>{translations.WE_SPEAK_II[language]}</span>
            </div>
            <div className="text-main">{translations.TEXT_MAIN[language]}</div>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FirstPage);
