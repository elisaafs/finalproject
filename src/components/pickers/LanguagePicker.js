import React from "react";
import Select from "./Select";
import { languages, fluencies } from "../../config/languages";

export default function LanguagePicker({
    language,
    editable,
    showFluency,
    selectedLanguage,
    selectedFluency,
    changeLanguage,
    changeFluency
}) {
    return (
        <div>
            <Select
                language={language}
                editable={editable}
                options={languages}
                currentOption={selectedLanguage}
                changeOption={changeLanguage}
            />{" "}
            {showFluency ? (
                <Select
                    language={language}
                    editable={editable}
                    options={fluencies}
                    currentOption={selectedFluency}
                    changeOption={changeFluency}
                />
            ) : null}
        </div>
    );
}
