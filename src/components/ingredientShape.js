import PropTypes from "prop-types";

const ingredientShape = PropTypes.shape({
  unit: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
});

export default ingredientShape;