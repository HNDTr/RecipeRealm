import { useRouter } from "next/router";
import PropTypes from "prop-types";
import RecipeCreator from "../components/RecipeCreator";

export default function Creator({ pushCurrentRecipe }) {
    const router = useRouter();

    const completeFunction = async (recipe) => {
        if (recipe) {
            const response = await fetch(`/api/articles`, {
                method: "POST",
                body: JSON.stringify(recipe),
                headers: new Headers({
                   Accept: "application/json",
                   "Content-Type": "application/json",
                }),
             });
            
            if (response.ok){
                const returnRecipe = await response.json();
                pushCurrentRecipe(returnRecipe);
            } 
        } else {
            router.back();
        }
    };

    return(     
        <RecipeCreator
            completeFunction={(recipe) => completeFunction(recipe)}
        />
    );
}

Creator.propTypes = {
    pushCurrentRecipe: PropTypes.func.isRequired,
  };