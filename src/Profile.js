import React from "react";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import RegisterService from "./RegisterService";
import Bio from "./Bio";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setCover = this.setCover.bind(this);
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
            profilePic,
            language,
            city,
            country,
            languageSpeak
        } = this.props;

        return (
            <div id="profile">
                <div className="big-wrapper">
                    <div className="wrapper-relative">
                        <ProfilePic
                            image={profilePic}
                            first={firstName}
                            last={lastName}
                            language={language}
                            clickHandler={this.showUploader}
                        />
                    </div>
                    <div className="bio-wallpost-wrapper">
                        <Bio
                            city={city}
                            country={country}
                            languageSpeak={languageSpeak}
                            language={language}
                        />
                    </div>
                    <RegisterService language={language} />
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

export default Profile;
