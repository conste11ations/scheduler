import React from "react";
import Header from "./Header.js"
import "./styles.scss";

export default function Appointment(props) {
  console.log(props);
  return (<article className="appointment"><Header time={props.time} /></article>);
}