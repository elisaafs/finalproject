import React, { Component } from "react";
import axios from "./axios";
import translations from "./translations";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => {
    return {
        ...props,
        language: state.language
    };
};

class RegisterService extends Component {
    constructor() {
        super();

        this.state = {
            error: null,
            category: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.changeFluence = this.changeFluence.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("/registration-service", this.state).then(resp => {
            if (resp.data.error) {
                if (resp.data.error === "requiredFields")
                    this.setState({
                        error: translations.LOGIN_BUTTON[this.props.language]
                    });
            } else {
                this.props.history.push("/profile");
            }
        });
    }

    createSelect(name, list) {
        return (
            <select
                name={name}
                value={this.state[name]}
                onChange={this.handleChange}
            >
                {list.map((entry, index) => (
                    <option key={index} value={entry.value}>
                        {entry.name}
                    </option>
                ))}
            </select>
        );
    }

    changeCategory(event) {
        this.setState({ category: event.target.value });
    }

    changeLanguage(event) {
        this.setState({ language: event.target.value });
    }

    changeFluence(event) {
        this.setState({ fluence: event.target.value });
    }

    createCategoryEntries() {
        return [
            {
                value: "",
                name: translations.CHOOSE_CATEGORY[this.props.language]
            },
            {
                value: "food",
                name: translations.FOOD[this.props.language]
            },
            {
                value: "health",
                name: translations.HEALTH[this.props.language]
            },
            {
                value: "beauty",
                name: translations.BEAUTY[this.props.language]
            },
            {
                value: "home",
                name: translations.HOME_SERVICES[this.props.language]
            },
            {
                value: "automotive",
                name: translations.AUTOMOTIVE[this.props.language]
            },
            {
                value: "professional services",
                name: translations.PROFESSIONAL_SERVICES[this.props.language]
            },
            {
                value: "education",
                name: translations.EDUCATION[this.props.language]
            },
            {
                value: "shopping",
                name: translations.SHOPPING[this.props.language]
            },
            {
                value: "pets",
                name: translations.PETS[this.props.language]
            },
            {
                value: "travel",
                name: translations.HOTELS[this.props.language]
            },
            {
                value: "night life",
                name: translations.NIGHTLIFE[this.props.language]
            },
            {
                value: "other",
                name: translations.OTHER[this.props.language]
            }
        ];
    }

    createFoodSubcategoryEntries() {
        return [
            {
                value: "",
                name: translations.CHOOSE_SUB[this.props.language]
            },
            {
                value: "restaurant",
                name: translations.RESTAURANTS[this.props.language]
            },
            {
                value: "bakerie",
                name: translations.BAKERIES[this.props.language]
            },
            {
                value: "coffee",
                name: translations.COFFEE[this.props.language]
            },
            {
                value: "bar",
                name: translations.PUBS[this.props.language]
            }
        ];
    }

    createHealthSubcategoryEntries() {
        return [
            {
                value: "",
                name: translations.CHOOSE_SUB[this.props.language]
            },
            {
                value: "doctor",
                name: translations.DOCTOR[this.props.language]
            },
            {
                value: "dentist",
                name: translations.DENTIST[this.props.language]
            },
            {
                value: "psychologist",
                name: translations.PSYCHOLOGY[this.props.language]
            },
            {
                value: "physioterapist",
                name: translations.PHYSIO[this.props.language]
            },
            {
                value: "speech terapy",
                name: translations.SPEECH[this.props.language]
            },
            {
                value: "alternative medicine",
                name: translations.ALTERNATIVE[this.props.language]
            }
        ];
    }

    createBeautySubcategoryEntries() {
        return [
            {
                value: "",
                name: translations.CHOOSE_SUB[this.props.language]
            },
            {
                value: "hair stylist",
                name: translations.HAIR[this.props.language]
            },
            {
                value: "barber",
                name: translations.BARBER[this.props.language]
            },
            {
                value: "waxing",
                name: translations.WAXING[this.props.language]
            },
            {
                value: "manicure",
                name: translations.MANICURE[this.props.language]
            },
            {
                value: "design",
                name: translations.DESIGN[this.props.language]
            },
            {
                value: "massage",
                name: translations.MASSAGE[this.props.language]
            }
        ];
    }

    createHomeSubcategoryEntries() {
        return [
            {
                value: "",
                name: translations.CHOOSE_SUB[this.props.language]
            },
            {
                value: "cleaning",
                name: translations.CLEANING[this.props.language]
            },
            {
                value: "bricklayer",
                name: translations.BRICKLAYER[this.props.language]
            },
            {
                value: "painter",
                name: translations.PAINTER[this.props.language]
            },
            {
                value: "plumber",
                name: translations.PLUMBER[this.props.language]
            },
            {
                value: "carpinter",
                name: translations.CARPINTEIRO[this.props.language]
            },
            {
                value: "electrician",
                name: translations.ELECTRICIAN[this.props.language]
            },
            {
                value: "gardener",
                name: translations.GARDENER[this.props.language]
            }
        ];
    }

    createLanguageEntries() {
        return [
            {
                value: "",
                name: translations.CHOOSE_LANGUAGE[this.props.language]
            },
            {
                value: "english",
                name: translations.ENGLISH[this.props.language]
            },
            {
                value: "german",
                name: translations.GERMAN[this.props.language]
            },
            {
                value: "portuguese",
                name: translations.PORTUGUESE[this.props.language]
            },
            {
                value: "spanish",
                name: translations.SPANISH[this.props.language]
            },
            {
                value: "french",
                name: translations.FRENCH[this.props.language]
            },
            {
                value: "russian",
                name: translations.RUSSIAN[this.props.language]
            },
            {
                value: "turkish",
                name: translations.TURKISH[this.props.language]
            },
            {
                value: "italian",
                name: translations.ITALIAN[this.props.language]
            }
        ];
    }

    createFluenceEntries() {
        return [
            {
                value: "",
                name: translations.PROFICIENCY[this.props.language]
            },
            {
                value: "basic",
                name: translations.BASIC[this.props.language]
            },
            {
                value: "intermediary",
                name: translations.INTERMEDIATE[this.props.language]
            },
            {
                value: "fluent",
                name: translations.ADVANCED[this.props.language]
            }
        ];
    }

    render() {
        const { language } = this.props;
        return (
            <div className="registration-service">
                <div className="form-wrapper">
                    {this.state.error ? (
                        <div className="error">{this.state.error}</div>
                    ) : null}
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input
                            onChange={this.handleChange}
                            name="name"
                            placeholder={translations.NAME[language]}
                            type="text"
                        />
                        {this.createSelect(
                            "category",
                            this.createCategoryEntries()
                        )}
                        {this.state.category === "food"
                            ? this.createSelect(
                                  "subcategory",
                                  this.createFoodSubcategoryEntries()
                              )
                            : null}
                        {this.state.category === "health"
                            ? this.createSelect(
                                  "subcategory",
                                  this.createHealthSubcategoryEntries()
                              )
                            : null}
                        {this.state.category === "beauty"
                            ? this.createSelect(
                                  "subcategory",
                                  this.createBeautySubcategoryEntries()
                              )
                            : null}
                        {this.state.category === "home"
                            ? this.createSelect(
                                  "subcategory",
                                  this.createHomeSubcategoryEntries()
                              )
                            : null}

                        <input
                            onChange={this.handleChange}
                            name="contact"
                            placeholder={translations.CONTACT[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="address"
                            placeholder={translations.ADDRESS[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="city"
                            placeholder={translations.CITY[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="country"
                            placeholder={translations.COUNTRY[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="homepage"
                            placeholder={translations.HOMEPAGE[language]}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="description"
                            placeholder={translations.DESCRIPTION[language]}
                            type="text"
                        />
                        {this.createSelect(
                            "language",
                            this.createLanguageEntries()
                        )}
                        {this.createSelect(
                            "fluence",
                            this.createFluenceEntries()
                        )}

                        <button type="submit">
                            {translations.REGISTER_BUTTON[language]}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(RegisterService);
