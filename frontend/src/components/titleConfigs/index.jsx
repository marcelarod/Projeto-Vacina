import React from "react";

import style from "./title.module.css";
export default function TitleConfig(props) {

    return (
      <>
            <div className={style.title}>
                <span>{props.icon}</span>
                <h3>{props.title}</h3>
            </div>
      </>     
    )
  }