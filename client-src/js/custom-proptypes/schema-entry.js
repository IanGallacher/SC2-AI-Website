import PropTypes from "prop-types";

let SchemaEntryPropType = PropTypes.shape({
  columnLabel: PropTypes.string.isRequired,
  // Specify either fieldName or render to tell the table how to draw the row.
  fieldName: PropTypes.string,
  render: PropTypes.func,
  // Set sortable to false to disable sorting when clicking the column header.
  sortable: PropTypes.bool,
  // If there is a render function or non-numeric value in the column,
  // give a sortValue so we know how to sort the column.
  sortValue: PropTypes.func,
  // Optional function to describe what happens when the cell is clicked.
  onClick: PropTypes.func
});
export default SchemaEntryPropType;