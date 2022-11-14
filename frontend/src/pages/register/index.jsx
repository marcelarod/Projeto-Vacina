import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom"
import Spinner from '../../components/spinner';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import imgRegister from '../../assets/register.png'
import style from './register.module.css'

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


export default function Register() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const navigate = useNavigate()

    const [isVerify, setIsVerify] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const [loading, setLoading] = useState([])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function onChange(event) {
        setIsVerify(true)
        setCaptcha(event)
    }

    function locationLogin(e) {
        e.preventDefault();
        window.location.href = "/login";
    }

    async function handleRegister(e) {
        e.preventDefault()
        try {
            setLoading(true)
            let response = await api.post('users',
                {
                    name: name,
                    email: email,
                    password: password
                },
                {
                    params: {
                        recaptcha: captcha
                    },
                    withCredentials: true,
                }
            )

            if (response.status == 200) {
                Swal.fire({
                    title: "Sucesso",
                    text: "Registro efetuado com sucesso.",
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
                setName('')
            }
        } catch (err) {
            window.grecaptcha.reset();
            setIsVerify(false)
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
                        <img src={imgRegister} />
                    </div>
                    <div className={style.containerForms}>
                        <form>
                            <h2>Cadastrar</h2>
                            <div>
                                <p>Nome:</p>
                                <input type="text"
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name} />
                            </div>
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
                            <div className={style.recaptcha}>
                                <ReCAPTCHA
                                    sitekey="6LcJTwEjAAAAACdvKw2dJRpJkS7JUyKQZrc0EnXJ"
                                    onChange={onChange}
                                />
                            </div>
                            <div className={style.formButtons}>
                                <button onClick={(e) => locationLogin(e)}>Entrar </button>
                                <button onClick={(e) => handleRegister(e)} disabled={!isVerify}>Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}