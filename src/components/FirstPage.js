import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import LogoBig from "./LogoBig";
import { changeLanguage } from "../actions/language";
import translations from "../translations";
import { Link } from "react-router-dom";
import { loadMyProfile } from "../actions/profile";
import Login from "./Login";
import Registration from "./Registration";

const mapStateToProps = state => {
    return {
        language: state.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: language => dispatch(changeLanguage(language)),
        loadMyProfile: () => dispatch(loadMyProfile())
    };
};

class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.backgroundImage = `${Math.floor(Math.random() * 37) + 1}.jpg`;
    }

    createContent(page) {
        switch (page) {
            case "login":
                return <Login history={this.props.history} />;
            case "signup":
                return <Registration history={this.props.history} />;
            default:
                return [
                    <LogoBig key="logo" />,
                    <div key="we-speak" className="text-main">
                        {translations.WE_SPEAK[this.props.language]}
                    </div>,
                    <Link key="search" to="/search" className="search-now">
                        {translations.SEARCH_NOW[this.props.language]}
                    </Link>
                ];
        }
    }

    render() {
        const content = this.createContent(this.props.match.params.page);
        return (
            <div
                className="wrapper-main"
                style={{ backgroundImage: `url(${this.backgroundImage})` }}
            >
                <Header />
                <div className="logo-text">
                    <div className="wrapper-lupa">{content}</div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FirstPage);
