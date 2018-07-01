import PropTypes from "prop-types";

var UserPropType = PropTypes.shape({
  avatar: PropTypes.string,
  id: PropTypes.number,
  role: PropTypes.string,
  username: PropTypes.string
});
export default UserPropType;
