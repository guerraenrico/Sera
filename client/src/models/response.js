import PropTypes from "prop-types";

export const ResponseType = {
  success: PropTypes.bool.isRequired,
  data: PropTypes.shape(),
  error: PropTypes.shape(),
  accessToken: PropTypes.string
};
