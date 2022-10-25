import React from "react";
import { Link } from "react-router-dom";

import style from './title.module.css'

export default function TitleHome(props) {
    return (
        <div className={style.title}>
            <span style={{marginTop: '5rem'}} className={style.titleFirst}>Calendário de</span>
            <span className={style.titleFirst}><strong>Vacinação</strong></span>
        </div>
    )
}