import React from "react";

function ProfilePicOPP({ image, first, last }) {
    return (
        <div className="img-wrapper">
            <img
                className="profile-pic-opp"
                src={image}
                alt={`${first} ${last}`}
            />
        </div>
    );
}

export default ProfilePicOPP;
