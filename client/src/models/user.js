import PropTypes from "prop-types";

export const UserType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  googleId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  pictureUrl: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  updatedAt: PropTypes.instanceOf(Date).isRequired
});
