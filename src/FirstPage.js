import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { changeLanguage } from "./actions/language";
import { setMyProfilePic, loadMyProfile } from "./actions/profile";

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

function FirstPage() {
    return (
        <div className="wrapper-main">
            <Header />
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FirstPage);
