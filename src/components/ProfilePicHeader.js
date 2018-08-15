import React from "react";

function ProfilePic({ image, first, last }) {
    return (
        <div className="img-wrapper">
            <img className="profile-pic" src={image} alt={`${first} ${last}`} />
        </div>
    );
}

export default ProfilePic;
