import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = () => {
    return {};
};

function Footer2() {
    return <div className="footer2" />;
}

export default withRouter(connect(mapStateToProps)(Footer2));
