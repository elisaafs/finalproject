import React from "react";
import ProfilePicService from "./ProfilePicService";
import ProfilePicServiceOther from "./ProfilePicServiceOther";
import UploaderService from "./UploaderService";
import HeaderRegister from "./HeaderRegister";
import { connect } from "react-redux";
import translations from "../translations";
import axios from "../axios";
import { Link } from "react-router-dom";
import { changeLanguage } from "../actions/language";
import Reviews from "./Reviews";
import CategoryPicker from "./pickers/CategoryPicker";
import Footer2 from "./Footer2";
import LocationPicker from "./pickers/LocationPicker";
import LanguagePicker from "./pickers/LanguagePicker";

const mapStateToProps = state => {
    return {
        myId: state.me.id,
        language: state.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: language => dispatch(changeLanguage(language))
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
        this.setState({ picture: url });
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
                <HeaderRegister />
                {iAmTheAuthor ? (
                    <div className="grow-service">
                        <div className="wrapper-services">
                            <span className="service-name">{name}</span>
                            <div className="service-categorie">
                                <CategoryPicker
                                    language={language}
                                    editable={false}
                                    selectedCategory={category}
                                />
                            </div>
                            <div className="wrapper-parts">
                                <div className="parte1">
                                    <div>
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
                                                    {
                                                        translations
                                                            .EDIT_SERVICES[
                                                            language
                                                        ]
                                                    }
                                                </Link>
                                            </div>
                                        </div>
                                        {this.state.uploaderIsVisible && (
                                            <UploaderService
                                                setImage={this.setImage}
                                                closeUploader={
                                                    this.closeUploader
                                                }
                                                language={language}
                                                serviceId={id}
                                            />
                                        )}
                                    </div>
                                    <div className="parte1-1">
                                        <div className="places">
                                            <span className="place-results extra">
                                                {description}
                                            </span>
                                            <span className="place-results">
                                                {contact}
                                            </span>
                                            <span className="place-results">
                                                <a href="{homepage}">
                                                    {homepage}
                                                </a>
                                            </span>

                                            <span className="place-results">
                                                <i className="fas fa-globe-americas pins" />
                                                <LanguagePicker
                                                    language={language}
                                                    editable={false}
                                                    showFluency={true}
                                                    selectedLanguage={
                                                        languageService
                                                    }
                                                    selectedFluency={fluence}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="parte2">
                                    <LocationPicker
                                        language={language}
                                        editable={false}
                                        placeId={placeId}
                                    />
                                    <div className="pindescription">
                                        <i className="fas fa-map-pin pin" />{" "}
                                        {placeDescription}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {id ? <Reviews id={id} /> : null}
                    </div>
                ) : (
                    <div className="grow-service">
                        <div className="wrapper-services">
                            <span className="service-name">{name}</span>
                            <div className="service-categorie">
                                <CategoryPicker
                                    language={language}
                                    editable={false}
                                    selectedCategory={category}
                                />
                            </div>
                            <div className="wrapper-parts">
                                <div className="parte1">
                                    <div>
                                        <div className="check-if-works">
                                            <ProfilePicServiceOther
                                                image={picture}
                                                name={name}
                                            />
                                        </div>
                                        {this.state.uploaderIsVisible && (
                                            <UploaderService
                                                setImage={this.setImage}
                                                closeUploader={
                                                    this.closeUploader
                                                }
                                                language={language}
                                                serviceId={id}
                                            />
                                        )}
                                    </div>
                                    <div className="parte1-1">
                                        <div className="places">
                                            <span className="place-results extra">
                                                {description}
                                            </span>
                                            <span className="place-results">
                                                {contact}
                                            </span>
                                            <span className="place-results">
                                                {homepage}
                                            </span>

                                            <span className="place-results">
                                                <i className="fas fa-globe-americas pins" />
                                                <LanguagePicker
                                                    language={language}
                                                    editable={false}
                                                    showFluency={true}
                                                    selectedLanguage={
                                                        languageService
                                                    }
                                                    selectedFluency={fluence}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="parte2">
                                    <LocationPicker
                                        language={language}
                                        editable={false}
                                        placeId={placeId}
                                    />
                                    <div className="pindescription">
                                        <i className="fas fa-map-marker-alt pin" />{" "}
                                        {placeDescription}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {id ? <Reviews id={id} /> : null}
                    </div>
                )}
                <Footer2 />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
