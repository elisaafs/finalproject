import React, { Component } from "react";
import { Link } from "react-router-dom";
import translations from "./translations";

class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        const { city, country, languageSpeak, language } = this.props;
        return (
            <div className="wrapper-bio">
                <div className="wrapper-intro-profile">
                    <div className="profile-intro">
                        {translations.PROFILE[language]}
                    </div>
                    <div className="wrapper-three">
                        <div className="big-wrapper-three">
                            <div className="wrapper-three-menu">
                                <Link
                                    className="menu-arrow a-name"
                                    to={`/editprofile`}
                                >
                                    {translations.EDIT_PROFILE[language]}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-me">
                    {translations.ABOUT_ME[language]}:
                </div>
                {city}
                {country}
                {languageSpeak}
            </div>
        );
    }
}

export default Bio;
