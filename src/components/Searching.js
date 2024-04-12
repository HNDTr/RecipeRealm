/*
    Own Notes:
        - We want the results of what shows up on the page to change based on the searchText
        and filters so we must keep these in sync using states.

        - Here we will show all of the filters as well. 
            Filters - Difficulty, Time commitment, Ingredients, Allergens, 
        
        - We'll be making multiple filters, so FilterDropDown is responsible for making reusable dropDown filters.

        - All of this will rendered in globalRecipeBook.js
*/

export default function RecipeSearch(recipes){
    const [searchText, setSearchText] = useState('');
    const [foodAllergiesSelected, setFoodAllergiesSelected] = useState([]);
    const [dietaryRestrictionsSelected, setdietaryRestrictionsSelected] = useState([]);
    const [timeSelected, setTimeSelected] = useState([]);
    const [difficultySelected, setDifficultySelected] = useState([]);
    

    return(
        <div>
            <FilterDropdown title = "Food Allergies" options={allergiesOptions} onSelect={setFoodAllergiesSelected}/>
            <FilterDropdown title="Dietary Restrictions" options={dietaryRestrictionsOptions} onSelect = {setdietaryRestrictionsSelected}/>
            <FilterDropdown title="Time" options={timeOptions} onSelect = {setTimeSelected}/>
            <FilterDropdown title="Difficulty" options={difficultyOptions} onSelect={setDifficultySelected}/>
            </div>
    )
}

RecipeSearch.propTypes = {
    recipes: recipeShape
}