


import Searching from "../components/Searching";
import RecipeTitles from "@/components/RecipeTitles";
import SearchBar from "@/components/SearchBar";

function GlobalRecipe() {
  const handleRecipeClick = (recipe) => {
    // eslint-disable-next-line no-console
    console.log("Recipe clicked:", recipe);
  };
  
  const onSearch = (searchText) => {
    // eslint-disable-next-line no-console
    // We will use this search text to filter recipes and decide what to show.
    console.log("Search text:", searchText);
  };

  return (
    <div>
      <SearchBar onSearch={onSearch} /> 
      <Searching />
      <RecipeTitles onRecipeClick={handleRecipeClick} />
    </div>
  );
}

export default GlobalRecipe;
