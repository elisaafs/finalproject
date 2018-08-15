import React from "react";

function PageSwitch({ numberOfDots, activeDot, switchHandler }) {
    const arrayOfComponents = [];

    for (let i = 0; i < numberOfDots; i++) {
        const className =
            i === activeDot
                ? "page-switch-dot-active"
                : "page-switch-dot-inactive";

        arrayOfComponents.push(
            <div
                key={i}
                className={className}
                onClick={switchHandler.bind(null, i)}
            />
        );
    }

    return <div className="page-switch">{arrayOfComponents}</div>;
}

export default PageSwitch;
