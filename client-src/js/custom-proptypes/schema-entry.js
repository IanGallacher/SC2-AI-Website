import PropTypes from "prop-types";

let SchemaEntryPropType = PropTypes.shape({
  columnLabel: PropTypes.string.isRequired,
  // Specify either fieldName or render to tell the table how to draw the row.
  fieldName: PropTypes.string,
  render: PropTypes.func,
  // Set sortable to false to disable sorting when clicking the column header.
  sortable: PropTypes.bool,
  // Optional function to describe what happens when the cell is clicked.
  onClick: PropTypes.func
});
export default SchemaEntryPropType;