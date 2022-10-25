import React from "react";
import { Link } from "react-router-dom";

import style from './button.module.css'

export default function ButtonHome(props) {
    return (
        <div className={style.divButtonHome} style={props.active === false ?{filter:' opacity(0.5) grayscale(1)', pointerEvents:'none'}: {}}>
            <Link exact="true" to={`${props.route}`}>
                <button className={style.buttonHome}>
                    <p>{props.icon}</p> 
                    <label> {props.label}</label>
                </button>
            </Link>
        </div>
    )
}