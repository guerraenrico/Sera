import PropTypes from "prop-types";

export const MessageType = PropTypes.shape({
  show: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  text: PropTypes.string
});
