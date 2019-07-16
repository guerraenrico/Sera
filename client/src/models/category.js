import PropTypes from "prop-types";

export const CategoryType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  selected: PropTypes.bool // Only client side
});
