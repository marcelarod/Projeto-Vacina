import React from "react";

import Style from "./buttonAdd.module.css";


import {IoAddOutline} from 'react-icons/io5'

export default function ButtonAdd(props) {

    return (
      <button className={Style.buttonAdd} {...props}><IoAddOutline size={25}/></button>    
    )
  }