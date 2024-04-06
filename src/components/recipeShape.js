/*
  recipeShape.js

  This provides a PropTypes shape descriptor of recipe objects. This is pulled out
  since multiple components take articles as props.
*/

import PropTypes from "prop-types";

const recipeShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  servings: PropTypes.number.isRequired,
  ingredients: PropTypes.string.isRequired,
  prepSteps: PropTypes.string.isRequired,
  isPublic: PropTypes.bool.isRequired,
  edited: PropTypes.string.isRequired,
});

export default recipeShape;