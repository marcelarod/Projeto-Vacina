import React from "react";

import style from "./label.module.css";


export default function Label(props) {

    return (
        <label className={style.label} {...props}></label>
    )
}