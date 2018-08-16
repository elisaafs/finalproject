import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import LogoBig from "./LogoBig";
import { changeLanguage } from "../actions/language";
import translations from "../translations";
import { Link } from "react-router-dom";
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

class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.backgroundImage = `${Math.floor(Math.random() * 25) + 1}.jpg`;
    }

    render() {
        const { language } = this.props;
        return (
            <div
                className="wrapper-main"
                style={{ backgroundImage: `url(${this.backgroundImage})` }}
            >
                <Header />
                <div className="logo-text">
                    <div className="wrapper-lupa">
                        <LogoBig />
                        <div className="text-main">
                            {translations.WE_SPEAK[language]}
                        </div>
                        <Link to="/search" className="search-now">
                            {translations.SEARCH_NOW[language]}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FirstPage);
