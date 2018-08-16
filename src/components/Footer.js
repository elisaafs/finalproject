import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = () => {
    return {};
};

function Footer() {
    return <div className="footer" />;
}

export default withRouter(connect(mapStateToProps)(Footer));
