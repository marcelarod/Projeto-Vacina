import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import ReCAPTCHA from "react-google-recaptcha";

import imgLogin from '../../assets/login.png'
import style from './login.module.css'

export default function Login() {
    const navigate = useNavigate()

    const [isVerify, setIsVerify] = useState(false);
    const [captcha, setCaptcha] = useState('');

    function onChange(event) {
        setIsVerify(true)
        setCaptcha(event)
    }

    function locationRegister(e) {
        e.preventDefault();
        window.location.href = "/register";
    }

    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.containerImg}>
                    <img src={imgLogin} />
                </div>
                <div className={style.containerForms}>
                    <form>
                        <h2>Entrar</h2>
                        <div>
                            <p>Email:</p>
                            <input />
                        </div>
                        <div>
                            <p>Senha:</p>
                            <input />
                        </div>
                        <Link to='/reset' >Esqueceu sua senha? Clique aqui</Link>
                        <div className={style.recaptcha}>
                            <ReCAPTCHA
                                sitekey="6LdJmGkhAAAAABc5pb5Zl92Uu7wwlyowCyg4YD0r"
                                onChange={onChange}
                            />
                        </div>
                        <div className={style.formButtons}>
                            <button onClick={(e) => locationRegister(e)} >Cadastrar </button>
                            <button disabled={!isVerify}>Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}