
import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom"
import Spinner from '../../components/spinner';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import imgReset from '../../assets/reset.png'
import style from './reset.module.css'

import { api } from "../../service/api";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timerProgressBar: true,
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
export default function Reset() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const navigate = useNavigate()

    const [loading, setLoading] = useState([])
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function locationLogin(e) {
        e.preventDefault();
        window.location.href = "/login";
    }

    async function handleReset(e) {
        e.preventDefault()
        try {
            setLoading(true)
            let response = await api.put('/password/users',
                {
                    email: email,
                    password: password
                },
                {
                    withCredentials: true,
                }
            )

            if (response.status == 200) {
                Swal.fire({
                    title: "Sucesso",
                    text: "Reset de senha efetuado com sucesso.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#4EBDEF",
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login')
                    }
                })
                setEmail('')
                setPassword('')
            }
        } catch (err) {
            window.grecaptcha.reset();
            console.log(err)

            Toast.fire({
                icon: 'error',
                title: `${err.response.data.toString()}`
            })

        }
        setLoading(false)
    }

    return (
        <>
            {loading == true ? (
                <div className="spinner">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div></div>)}
            <div className={style.main}>
                <div className={style.container}>
                    <div className={style.containerImg}>
                        <img src={imgReset} />
                    </div>
                    <div className={style.containerForms}>
                        <form>
                            <h2>Alterar senha</h2>
                            <div>
                                <p>Email:</p>
                                <input type="text"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email} />
                            </div>
                            <div>
                                <p>Senha:</p>
                                <div className={style.inputShow}>
                                    <input
                                        type={passwordShown ? "text" : "password"}
                                        name="senha"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                    {passwordShown == true ?
                                        <AiFillEyeInvisible color='#000' onClick={togglePasswordVisiblity} /> :
                                        <AiFillEye color='#000' onClick={togglePasswordVisiblity} />}
                                </div>
                            </div>
                            <div className={style.formButtons}>
                                <button onClick={(e) => locationLogin(e)}>Entrar </button>
                                <button onClick={(e) => handleReset(e)} >Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}