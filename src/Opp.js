import React, { Component } from "react";
import axios from "./axios";
import translations from "./translations";
import ProfilePicOpp from "./ProfilePicOpp";
import Header from "./Header";
import { connect } from "react-redux";
import { changeLanguage } from "./actions/language";

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

class Opp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        axios
            .get("/user/" + this.props.match.params.id + ".json")
            .then(({ data }) => {
                if (data.redirect) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        languageSpeak: data.data.language_speak || "",
                        id: data.data.id,
                        city: data.data.city || "",
                        country: data.data.country || "",
                        first_name: data.data.first_name,
                        last_name: data.data.last_name,
                        profile_pic: data.data.profile_pic || "/default.png"
                    });
                }
            });
    }
    render() {
        console.log("language", language);
        const {
            first_name,
            last_name,
            profile_pic,
            country,
            language_speak,
            city
        } = this.state;
        const { language } = this.props;

        return (
            <div id="other-persons">
                <Header />
                <div className="big-wrapper">
                    <div className="wrapper-relative">
                        <ProfilePicOpp
                            image={profile_pic}
                            first={first_name}
                            last={last_name}
                        />
                        {first_name}
                        {last_name}
                    </div>
                    <div className="wrapper-friendsof">
                        <div className="wrapper-bio">
                            <div className="profile-intro-opp">
                                {translations.PROFILE[language]}
                            </div>
                            <div className="linha" />
                            <div className="bio-opp">
                                {" "}
                                {translations.LIVES[language]}
                                {city}
                                {country}
                            </div>

                            <div className="bio-opp">
                                {translations.LANGUAGES_SPEAK[language]}
                                {language_speak}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Opp);
