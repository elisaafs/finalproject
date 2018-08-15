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
        this.handleChange = this.handleChange.bind(this);
        this.addNewReview = this.addNewReview.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(getReviews(this.props.dispatch, this.props.id));
    }

    addNewReview() {
        this.props.dispatch(postReviews(this.state.newPost, this.props.id));
        this.setState({ newReview: "" });
    }

    handleChange(e) {
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
                                <div className="img-name-wallpost">
                                    <div className="wrapper-online-img">
                                        <Link to={`/user/${reviews.author_id}`}>
                                            {profilePic}
                                        </Link>
                                    </div>
                                    <Link
                                        className="a-name"
                                        to={`/user/${reviews.author_id}`}
                                    >
                                        <div className="friendof-name">
                                            {firstName} {lastName}
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="comment">{reviews.rate}</div>
                            <div className="comment">{reviews.comment}</div>
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
        return this.createReviews(
            this.props.reviews,
            "Be the first one to leave a review."
        );
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
                            <h1 className="online-title">
                                <i className="fas fa-utensils friendsof" />
                                {translations.EDIT_SERVICES[language]}
                            </h1>
                            <div className="extra-wrapper-friendsof">
                                {this.createReviewsView()}
                            </div>
                            <div className="wrapper-inlet-online">
                                <textarea
                                    onChange={this.handleChange}
                                    name="comment"
                                    className="textarea-comment"
                                    value={this.state.newReview}
                                />
                                <button
                                    className="button-comment"
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
