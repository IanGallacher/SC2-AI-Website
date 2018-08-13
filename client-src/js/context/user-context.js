import React from "react";

export const UserContext = React.createContext(
  {
    username: "",
    id: "",
    role: "",
    calorie_goal: localStorage.getItem("calorie_goal"),
    upadateGoal: () => {},
  }
);
