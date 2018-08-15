import React from "react";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Bio from "./Bio";
import Header from "./Header";
import { connect } from "react-redux";
import translations from "../translations";
import { Link } from "react-router-dom";
import { changeLanguage } from "../actions/language";
import { setMyProfilePic, loadMyProfile } from "../actions/profile";

const mapStateToProps = state => {
    return {
        me: state.me,
        language: state.language,
        profilePicture: state.me.profilePic,
        firstName: state.me.firstName,
        lastName: state.me.lastName,
        city: state.me.city,
        country: state.me.country,
        languageSpeak: state.me.languageSpeak
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: language => dispatch(changeLanguage(language)),
        setProfilePic: url => dispatch(setMyProfilePic(url)),
        loadMyProfile: dispatch(loadMyProfile())
    };
};

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
    }

    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    closeUploader() {
        this.setState({
            uploaderIsVisible: false
        });
    }

    setImage(url) {
        this.setState({
            uploaderIsVisible: false
        });
        this.props.setProfilePic(url);
    }

    render() {
        const {
            firstName,
            lastName,
            profilePicture,
            language,
            city,
            country,
            languageSpeak
        } = this.props;

        return (
            <div id="profile">
                <Header />
                <div className="big-wrapper">
                    <Link to="/registration-service">
                        {translations.REGISTER_SERVICE[language]}
                    </Link>
                    <Link to="/myservices">
                        {translations.REGISTERED_SERVICES[language]}
                    </Link>
                    <div className="wrapper-relative">
                        <ProfilePic
                            image={profilePicture}
                            first={firstName}
                            last={lastName}
                            language={language}
                            clickHandler={this.showUploader}
                        />
                    </div>
                    {firstName}
                    {lastName}

                    <div className="bio-wallpost-wrapper">
                        <Bio
                            city={city}
                            country={country}
                            languageSpeak={languageSpeak}
                            language={language}
                        />
                    </div>
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={this.setImage}
                        closeUploader={this.closeUploader}
                        language={language}
                    />
                )}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
