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
        <div className="language-picker">
            <Select
                language={language}
                editable={editable}
                options={languages}
                currentOption={selectedLanguage}
                changeOption={changeLanguage}
            />
            {showFluency
                ? [
                      editable ? " " : " (",
                      <Select
                          key="select"
                          language={language}
                          editable={editable}
                          options={fluencies}
                          currentOption={selectedFluency}
                          changeOption={changeFluency}
                      />,
                      editable ? null : ")"
                  ]
                : null}
        </div>
    );
}
