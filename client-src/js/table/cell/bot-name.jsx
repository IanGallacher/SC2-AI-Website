import React from "react";
import PropTypes from "prop-types";

import TableCell from "./../table-cell.jsx";

export default function createBotNameSchema (context) {
  return {
    header: "Bot name",
    field: "name",
    sortValue: row => (row.name || "").toLowerCase(),
    onClick: row => context.props.history.push(`/bot/?bot_id=${row.id}`)
  };
}
