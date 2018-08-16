import React from "react";
import ProfilePicService from "./ProfilePicService";
import ProfilePicServiceOther from "./ProfilePicServiceOther";
import Uploader from "./Uploader";
import HeaderInside from "./HeaderInside";
import { connect } from "react-redux";
import translations from "../translations";
import axios from "../axios";
import { Link } from "react-router-dom";
import { changeLanguage } from "../actions/language";
import Reviews from "./Reviews";
import { setServicePic } from "../actions/services";
import CategoryPicker from "./pickers/CategoryPicker";
import LanguagePicker from "./pickers/LanguagePicker";
import LocationPicker from "./pickers/LocationPicker";

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
            <div className="services-page">
                <HeaderInside />
                {iAmTheAuthor ? (
                    <div>
                        <div className="wrapper-services">
                            <span className="service-name">{name}</span>
                            <CategoryPicker
                                language={language}
                                editable={false}
                                selectedCategory={category}
                                selectedSubcategory={subcategory}
                            />
                            <div className="check-if-works">
                                <ProfilePicService
                                    image={picture}
                                    name={name}
                                    language={language}
                                    clickHandler={this.showUploader}
                                />
                                <div>
                                    <Link
                                        className="edit-service"
                                        to="/editservices"
                                    >
                                        {translations.EDIT_SERVICES[language]}
                                    </Link>
                                </div>
                            </div>
                            {this.state.uploaderIsVisible && (
                                <Uploader
                                    setImage={this.setImage}
                                    closeUploader={this.closeUploader}
                                    language={language}
                                />
                            )}

                            <LocationPicker
                                language={language}
                                editable={false}
                                placeId={placeId}
                                placeDescription={placeDescription}
                            />

                            <div className="places">
                                <span className="place-results">{contact}</span>
                                <span className="place-results">
                                    {homepage}
                                </span>
                                <span className="place-results">
                                    {description}
                                </span>
                                <span className="place-results">
                                    {languageService}
                                </span>
                                <span className="place-results">{fluence}</span>
                            </div>

                            {id ? <Reviews id={id} /> : null}
                        </div>
                    </div>
                ) : (
                    <div className="wrapper-services">
                        <ProfilePicServiceOther image={picture} name={name} />
                        {name}
                        <LanguagePicker
                            language={language}
                            editable={false}
                            showFluency={true}
                            selectedLanguage={languageService}
                            selectedFluency={fluence}
                        />
                        {contact}
                        {homepage}
                        {description}
                        {id ? <Reviews id={id} /> : null}
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
