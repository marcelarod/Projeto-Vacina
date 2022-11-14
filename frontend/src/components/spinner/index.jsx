import React from "react";
import {ImSpinner2} from 'react-icons/im';

import Style from "./spinner.module.css";


export default function Spinner() {

    return (
     <div className={Style.loading}>
         <i><ImSpinner2 className={Style.spinnerLoading}/></i>
    </div>
    )
}