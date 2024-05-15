import PropTypes from "prop-types";

function RecipeTitles({ recipes, setSelectedRecipe }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-evenly",
        }}
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: "10px 0" }}>{recipe.title}</h3>
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                setSelectedRecipe(recipe);
              }}
            >
              See Complete Recipe
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

RecipeTitles.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  setSelectedRecipe: PropTypes.func,
};

export default RecipeTitles;
