import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import translations from "../translations";
import { getReviews, postReviews } from "../actions/reviews";

const mapStateToProps = (state, props) => {
    return {
        loggedIn: state.me.id != undefined,
        language: state.language,
        ...props,
        reviews: state.reviews[props.id],
        users: state.users
    };
};

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.handleNewTitle = this.handleNewTitle.bind(this);
        this.handleNewReview = this.handleNewReview.bind(this);
        this.addNewReview = this.addNewReview.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(getReviews(this.props.dispatch, this.props.id));
    }

    addNewReview() {
        this.props.dispatch(
            postReviews(
                this.state.newReview,
                this.state.newTitle,
                this.props.id
            )
        );
        this.setState({ newReview: "", newTitle: "" });
    }

    handleNewTitle(e) {
        this.setState({ newTitle: e.target.value });
    }

    handleNewReview(e) {
        this.setState({ newReview: e.target.value });
    }

    createReviews(reviews, emptyMessage) {
        if (reviews && reviews.length > 0) {
            return reviews.map(reviews => {
                const author = this.props.users[reviews.author_id];
                const firstName = author ? author.first_name : "";
                const lastName = author ? author.last_name : "";
                const profilePic = author ? (
                    <img src={author.profile_pic || "/default.png"} />
                ) : null;

                return (
                    <div key={reviews.id} className="single-friend">
                        <div className="friendsof-wrapper">
                            <div className="img-comment">
                                <div className="img-comment2">
                                    <div className="img-name-wallpost">
                                        <div className="wrapper-online-img">
                                            <Link
                                                className="picture-review"
                                                to={`/user/${
                                                    reviews.author_id
                                                }`}
                                            >
                                                {profilePic}
                                            </Link>
                                            <Link
                                                className="a-name"
                                                to={`/user/${
                                                    reviews.author_id
                                                }`}
                                            >
                                                <div className="friendof-name">
                                                    {firstName} {lastName}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="titleandcomment">
                                        <div className="title">
                                            {reviews.title}
                                        </div>
                                        <div className="comment">
                                            {reviews.comment}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }

        if (!reviews) {
            return null;
        }

        return <div className="no-wallpost-requests">{emptyMessage}</div>;
    }

    createReviewsView() {
        return this.createReviews(this.props.reviews);
    }

    render() {
        const { language, loggedIn } = this.props;
        return (
            <div id="reviews">
                {!loggedIn ? (
                    <div className="extra-wrapper-friendsof">
                        {this.createReviewsView()}
                    </div>
                ) : (
                    <div className="big-wrapper-friendsof">
                        <div className="extra-extra-wrapper">
                            <h1 className="review-title">
                                <i className="fas fa-pencil-alt pencil" />
                                {translations.MY_REVIEW[language]}
                            </h1>
                            <div className="extra-wrapper-friendsof">
                                {this.createReviewsView()}
                            </div>
                            <div className="wrapper-inlet-online">
                                <textarea
                                    onChange={this.handleNewTitle}
                                    name="title"
                                    placeholder={translations.TITLE[language]}
                                    className="textarea-title"
                                    value={this.state.newTitle}
                                />
                                <textarea
                                    onChange={this.handleNewReview}
                                    name="comment"
                                    placeholder={
                                        translations.SHARE_YOUR[language]
                                    }
                                    className="textarea-comment"
                                    value={this.state.newReview}
                                />
                                <button
                                    className="button-search"
                                    onClick={this.addNewReview}
                                    type="submit"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Reviews);
