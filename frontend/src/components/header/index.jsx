import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { CgProfile } from 'react-icons/cg'
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineHome } from 'react-icons/ai'

import style from "./header.module.css"

export default function Header(props) {
   
    return (
        <div className={style.containerHeader}>
            <div className={style.logo}>
                <IoIosArrowBack onClick={props.funcao} color='#5A58A8' size={25} />
            </div>
            <div className={style.infoUser}>
                <div className={style.infos}>
                   <Link to='/'>< AiOutlineHome color='#5A58A8' size={35}/></Link>
                </div>
                <CgProfile color='#5A58A8' size={35} />
                <div className={style.nameFunction}>
                    <span><strong>Marcela Rodrigues</strong></span>
                    <span>
                         Usuário padrão
                        </span>
                </div>
            </div>
        </div>
    )
}