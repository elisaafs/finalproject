import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { withRouter, Route } from "react-router-dom";
import { setMyProfilePic } from "./actions";
import EditInfosUser from "./EditInfosUser";
import FirstPage from "./FirstPage";

const mapStateToProps = state => {
    return {
        profilePic: state.me.profilePic,
        firstName: state.me.firstName,
        lastName: state.me.lastName,
        city: state.me.city,
        country: state.me.country,
        email: state.me.email,
        password: state.me.hashedPassword,
        id: state.me.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setProfilePic: url => dispatch(setMyProfilePic(url))
    };
};

function Main({
    profilePic,
    firstName,
    lastName,
    setProfilePic,
    id,
    country,
    city,
    password,
    email
}) {
    return (
        <div className="wrapper-main">
            <Route
                exact
                path="/profile"
                render={() => (
                    <Profile
                        profilePic={profilePic}
                        firstName={firstName}
                        lastName={lastName}
                        city={city}
                        setProfilePic={setProfilePic}
                        country={country}
                        id={id}
                    />
                )}
            />
            <Route
                exact
                path="/editprofile"
                render={() =>
                    id ? (
                        <EditInfosUser
                            firstName={firstName}
                            lastName={lastName}
                            email={email}
                            city={city}
                            password={password}
                            country={country}
                        />
                    ) : null
                }
            />
            <Route exact path="/" render={() => <FirstPage />} />
        </div>
    );
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Main)
);
