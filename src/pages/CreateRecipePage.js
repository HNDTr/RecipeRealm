import React, { useState } from 'react';
import RecipeCreator from '../components/RecipeCreator';

function CreateRecipePage() {
  const [showCreator, setShowCreator] = useState(false);

  return (
    <div>
      <h1>Create Recipe</h1>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={() => setShowCreator(true)}>Create Recipe</button>
      {showCreator && <RecipeCreator completeFunction={() => setShowCreator(false)} />}
    </div>
  );
}

export default CreateRecipePage;