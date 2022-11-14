import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import ReCAPTCHA from "react-google-recaptcha";
import Spinner from '../../components/spinner';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import imgLogin from '../../assets/login.png'
import style from './login.module.css'

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

export default function Login() {
  const navigate = useNavigate()

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [isVerify, setIsVerify] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [loading, setLoading] = useState([])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onChange(event) {
    setIsVerify(true)
    setCaptcha(event)
  }

  async function handleLogin(e) {
    e.preventDefault()
    try {
      setLoading(true)
      let response = await api.post('auth',
        {
          "email": email,
          "password": password
        },
        {
          params: {
            recaptcha: captcha
          },
          withCredentials: true,
        }
      )

      if (response.status == 200) {
        Toast.fire({
          icon: 'success',
          title: 'Login efetuado com sucesso!'
        })
        setEmail('')
        setPassword('')

      }
      navigate('/')
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


  function locationRegister(e) {
    e.preventDefault();
    window.location.href = "/register";
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
            <img src={imgLogin} />
          </div>
          <div className={style.containerForms}>
            <form>
              <h2>Entrar</h2>
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
              <Link to='/reset' >Esqueceu sua senha? Clique aqui</Link>
              <div className={style.recaptcha}>
                <ReCAPTCHA
                  sitekey="6LcJTwEjAAAAACdvKw2dJRpJkS7JUyKQZrc0EnXJ"
                  onChange={onChange}
                />
              </div>
              <div className={style.formButtons}>
                <button onClick={(e) => locationRegister(e)} >Cadastrar </button>
                <button disabled={!isVerify} onClick={(e) => handleLogin(e)}>Entrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}