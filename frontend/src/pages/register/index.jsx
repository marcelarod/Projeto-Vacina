import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom"

import imgRegister from '../../assets/register.png'
import style from './register.module.css'

export default function Register() {
    const navigate = useNavigate()

    const [isVerify, setIsVerify] = useState(false);
    const [captcha, setCaptcha] = useState('');

    function onChange(event) {
        setIsVerify(true)
        setCaptcha(event)
    }

    function locationLogin(e) {
        e.preventDefault();
        window.location.href = "/login";
    }


    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.containerImg}>
                    <img src={imgRegister} />
                </div>
                <div className={style.containerForms}>
                    <form>
                        <h2>Cadastrar</h2>
                        <div>
                            <p>Nome:</p>
                            <input />
                        </div>
                        <div>
                            <p>Email:</p>
                            <input />
                        </div>
                        <div className={style.recaptcha}>
                            <ReCAPTCHA
                                sitekey="6LdJmGkhAAAAABc5pb5Zl92Uu7wwlyowCyg4YD0r"
                                onChange={onChange}
                            />
                        </div>
                        <div className={style.formButtons}>
                            <button onClick={(e) => locationLogin(e)}>Entrar </button>
                            <button disabled={!isVerify}>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}