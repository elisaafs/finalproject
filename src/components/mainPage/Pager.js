import React, { Component } from "react";
import RandomPage from "../RandomPage";
import ServicesPage from "./ServicesPage";
import PageSwitch from "./PageSwitch";

class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.pages = [RandomPage, ServicesPage];
        this.switchHandler = this.switchHandler.bind(this);
        this.transitionEnd = this.transitionEnd.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.classes = [];
        this.state = {
            activeDot: 0,
            inTransition: false,
            showLoginForm: false,
            showSignupForm: false
        };
    }

    switchHandler(clickedPage) {
        if (this.state.inTransition) {
            return;
        }
        if (clickedPage === this.state.activeDot) {
            return;
        }

        if (clickedPage < this.state.activeDot) {
            //moveDown
            this.classes[clickedPage] = "moveDownIn";
            this.classes[this.state.activeDot] = "moveDownOut";
        } else {
            //moveUp
            this.classes[clickedPage] = "moveUpIn";
            this.classes[this.state.activeDot] = "moveUpOut";
        }

        this.setState({
            inTransition: true
        });
        setTimeout(() => {
            this.setState({
                activeDot: clickedPage,
                inCssTransition: true
            });
        });
    }

    transitionEnd() {
        this.setState({
            inTransition: false,
            inCssTransition: false
        });
        this.classes = [];
    }

    signupHandler() {
        this.setState({
            showSignupForm: true,
            showLoginForm: false
        });
    }

    loginHandler() {
        this.setState({
            showLoginForm: true,
            showSignupForm: false
        });
    }

    render() {
        const pageElements = this.pages.map((Page, index) => {
            let classes = "page ";
            if (this.state.inTransition) {
                if (this.state.inCssTransition) {
                    classes += "transitioning ";
                }
                classes += this.classes[index] || "outside";
            } else {
                if (this.state.activeDot === index) {
                    classes += "inside";
                } else {
                    classes += "outside";
                }
            }

            return (
                <div
                    key={index}
                    className={classes}
                    onTransitionEnd={this.transitionEnd}
                >
                    <Page
                        loginHandler={this.loginHandler}
                        signupHandler={this.signupHandler}
                        switchHandler={this.switchHandler}
                        showLoginForm={this.state.showLoginForm}
                        showSignupForm={this.state.showSignupForm}
                    />
                </div>
            );
        });

        return (
            <div className="pager">
                {pageElements}
                <PageSwitch
                    numberOfDots={this.pages.length}
                    activeDot={this.state.activeDot}
                    switchHandler={this.switchHandler}
                />
            </div>
        );
    }
}

export default Pager;
