import React from "react";
import Select from "./Select";
import {
    categories,
    foodSubcategories,
    healthSubcategories,
    beautySubcategories,
    homeSubcategories,
    professionalSubcategories,
    educationSubcategories,
    shoppingSubcategories,
    petsSubcategories,
    hotelSubcategories,
    nightlifeSubcategories
} from "../../config/categories";

const subcategoryMap = {
    none: null,
    food: foodSubcategories,
    health: healthSubcategories,
    beauty: beautySubcategories,
    home: homeSubcategories,
    "professional services": professionalSubcategories,
    education: educationSubcategories,
    shopping: shoppingSubcategories,
    pets: petsSubcategories,
    travel: hotelSubcategories,
    "night life": nightlifeSubcategories,
    other: null
};

export default function CategoryPicker({
    language,
    editable,
    selectedCategory,
    selectedSubcategory,
    changeCategory,
    changeSubcategory
}) {
    const subcategories = subcategoryMap[selectedCategory];

    const changeCategoryAndResetSub = newValue => {
        changeCategory(newValue);
        changeSubcategory("");
    };

    return (
        <div>
            <Select
                language={language}
                editable={editable}
                options={categories}
                currentOption={selectedCategory}
                changeOption={changeCategoryAndResetSub}
            />{" "}
            {subcategories ? (
                <Select
                    language={language}
                    editable={editable}
                    options={subcategories}
                    currentOption={selectedSubcategory}
                    changeOption={changeSubcategory}
                />
            ) : null}
        </div>
    );
}
