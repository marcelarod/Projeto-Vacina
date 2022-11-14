import React from "react";
import { Link } from "react-router-dom";

import style from './title.module.css'

export default function TitlePages(props) {
    return (
        <div>
           <h1 className={style.containerTitle}>{props.name}</h1>
        </div>
    )
}