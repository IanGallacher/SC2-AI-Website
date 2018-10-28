import React from "react";

export default function ProfileDetail(icon, label, description, is_link) {
  if(description == null) return;
  let content = <div><i className={`fab ${icon}`}/> {`${label}: ${description}`}</div>;
  if(is_link == true) return <a href={description}>
    {content}
  </a>;
  else return content;
}
