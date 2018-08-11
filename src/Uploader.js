import React, { Component } from "react";
import axios from "./axios";
import translations from "./translations";

class Uploader extends Component {
    constructor(props) {
        super(props);

        this.imageSelected = this.imageSelected.bind(this);
        this.upload = this.upload.bind(this);
    }
    imageSelected(e) {
        this.setState({
            imageFile: e.target.files[0]
        });
    }
    upload() {
        var formData = new FormData();
        formData.append("file", this.state.imageFile);
        axios.post("/upload", formData).then(res => {
            this.props.setImage(res.data.url);
        });
    }
    // }
    render() {
        const { closeUploader, language } = this.props;
        return (
            <div id="uploader">
                <div className="uploader-modal">
                    <div className="uploader-inlet">
                        <div className="wrapper-inlet">
                            <h3 className="text-upload">
                                {translations.UPDATE_PROFILE_PIC[language]}
                            </h3>
                            <i
                                className="fas fa-times icon-modal"
                                onClick={closeUploader}
                            />
                        </div>
                        <div className="linha2" />
                        <div className="wrapper-inlet-2">
                            <label id="file-label" htmlFor="file-field">
                                {translations.SELECT_IMAGE[language]}
                            </label>
                            <input
                                id="file-field"
                                type="file"
                                onChange={this.imageSelected}
                                name=""
                                value=""
                            />

                            <button
                                id="upload-button"
                                className=""
                                onClick={this.upload}
                                name="button"
                            >
                                {translations.SAVE_BUTTON[language]}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Uploader;
