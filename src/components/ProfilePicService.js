import React from "react";
import translations from "../translations";

function ProfilePicService({ image, name, language, clickHandler }) {
    return (
        <div className="img-wrapper-service">
            <img
                className="profile-pic-service"
                src={image}
                alt={name}
                onClick={clickHandler}
            />
            <div className="change-picture-2">
                <div className="text-change-picture" onClick={clickHandler}>
                    <i className="fas fa-camera camera" />{" "}
                    {translations.UPDATE_PROFILE_PIC_SERVICE[language]}
                </div>
            </div>
        </div>
    );
}

export default ProfilePicService;
