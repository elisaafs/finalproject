import React, { Component } from "react";
import { Link } from "react-router-dom";
import translations from "../translations";

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
                    <div className="wrapper-three">
                        <div className="big-wrapper-three">
                            <div className="wrapper-three-menu" />
                        </div>
                    </div>
                </div>
                <div className="about-me">
                    {translations.ABOUT_ME[language]}:
                </div>
                <div>
                    {translations.I_LIVE[language]} {city}, {country}
                </div>
                <div>
                    {translations.LANGUAGES_I_SPEAK[language]} {languageSpeak}
                </div>
            </div>
        );
    }
}

export default Bio;
