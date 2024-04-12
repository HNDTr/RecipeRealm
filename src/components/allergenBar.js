import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AllergenBar({ allergens, setAllergens }) {
  const commonAllergens = ['Peanuts', 'Tree nuts', 'Milk', 'Eggs', 'Wheat', 'Soy', 'Fish', 'Shellfish'];
  const [selectedAllergen, setSelectedAllergen] = useState('');

  const handleSelectAllergen = (event) => {
    const newAllergen = event.target.value;
    setSelectedAllergen(newAllergen);
    setAllergens([...allergens, newAllergen]);
  };

  return (
    <div>
      <select value={selectedAllergen} onChange={handleSelectAllergen}>
        <option value="">Select Allergen</option>
        {commonAllergens.map((allergen) => (
          <option key={allergen} value={allergen} disabled={allergens.includes(allergen)}>
            {allergen}
          </option>
        ))}
      </select>
    </div>
  );
}

AllergenBar.propTypes = {
  allergens: PropTypes.arrayOf(PropTypes.string).isRequired,
  setAllergens: PropTypes.func.isRequired,
};

export default AllergenBar;