import React from "react";
import ProfilePicService from "./ProfilePicService";
import ProfilePicServiceOther from "./ProfilePicServiceOther";
import Uploader from "./Uploader";
import Header from "./Header";
import GoogleMap from "./GoogleMap";
import { connect } from "react-redux";
import translations from "../translations";
import axios from "../axios";
import { Link } from "react-router-dom";
import { changeLanguage } from "../actions/language";
import Reviews from "./Reviews";
import { setServicePic } from "../actions/services";

const mapStateToProps = state => {
    return {
        myId: state.me.id,
        language: state.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: language => dispatch(changeLanguage(language)),
        setServicePic: url => dispatch(setServicePic(url))
    };
};

class Services extends React.Component {
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
        this.props.setServicePic(url);
    }

    componentDidMount() {
        console.log("mount", this.props.match);
        axios
            .get("/service/" + this.props.match.params.id + ".json")
            .then(({ data }) => {
                this.setState({
                    placeId: data.data.place_id,
                    id: data.data.id,
                    placeDescription: data.data.place_description,
                    category: data.data.category,
                    contact: data.data.contact,
                    subcategory: data.data.subcategory,
                    description: data.data.description,
                    author: data.data.author_id,
                    name: data.data.name,
                    languageService: data.data.language,
                    homepage: data.data.homepage,
                    fluence: data.data.fluence,
                    picture: data.data.picture || "/default.png"
                });
            });
    }

    render() {
        const {
            name,
            author,
            homepage,
            picture,
            placeDescription,
            placeId,
            languageService,
            category,
            subcategory,
            contact,
            description,
            fluence,
            id
        } = this.state;

        const { language, myId } = this.props;
        const iAmTheAuthor = myId === author;

        return (
            <div id="services">
                <Header />
                {iAmTheAuthor ? (
                    <div>
                        <ProfilePicService
                            image={picture}
                            name={name}
                            language={language}
                            clickHandler={this.showUploader}
                        />
                        <div>
                            <Link to="/editservices">
                                {translations.EDIT_SERVICES[language]}
                            </Link>
                            <Link to="/myservices">
                                Check your registered services
                            </Link>
                        </div>
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                setImage={this.setImage}
                                closeUploader={this.closeUploader}
                                language={language}
                            />
                        )}
                    </div>
                ) : (
                    <ProfilePicServiceOther image={picture} name={name} />
                )}
                <GoogleMap placeId={placeId} />
                {name}
                {category}
                {subcategory}
                {contact}
                {placeDescription}
                {homepage}
                {description}
                {languageService}
                {fluence}
                {id ? <Reviews id={id} /> : null}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
