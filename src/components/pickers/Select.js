import React from "react";

export default function Select({
    language,
    editable,
    options,
    currentOption,
    changeOption
}) {
    if (editable) {
        const changeHandler = e => {
            changeOption(e.target.value);
        };
        return (
            <select value={currentOption} onChange={changeHandler}>
                {Object.keys(options).map((entry, index) => (
                    <option key={index} value={entry}>
                        {options[entry][language]}
                    </option>
                ))}
            </select>
        );
    }

    console.log(options, currentOption, language);
    return (
        <span>
            {options[currentOption] && options[currentOption][language]}
        </span>
    );
}
