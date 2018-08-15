import React from "react";
import translations from "../translations";

function ProfilePic({ image, first, last, language, clickHandler }) {
    return (
        <div className="img-wrapper">
            <img
                className="profile-pic"
                src={image}
                alt={`${first} ${last}`}
                onClick={clickHandler}
            />
            <div className="change-picture">
                <div className="text-change-picture" onClick={clickHandler}>
                    <i className="fas fa-camera camera" />{" "}
                    {translations.UPDATE_PROFILE_PIC[language]}
                </div>
            </div>
        </div>
    );
}

export default ProfilePic;
