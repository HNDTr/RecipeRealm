import React, { useState } from 'react';
import RecipeCreator from '../components/RecipeCreator';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

function CreateRecipePage() {
  const [showCreator, setShowCreator] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const checkSessionAndShowCreator = async () => {
    const session = await getServerSession({}, authOptions);
    if (session) {
      setShowCreator(true);
    } else {
      setErrorMessage("You must be signed in to access this page.");
    }
  };

  return (
    <div>
      <h1>Create Recipe</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={checkSessionAndShowCreator}>Create Recipe</button>
      {showCreator && <RecipeCreator completeFunction={() => setShowCreator(false)} />}
    </div>
  );
}

export default CreateRecipePage;
