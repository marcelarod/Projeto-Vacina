
import imgReset from '../../assets/reset.png'
import style from './reset.module.css'

export default function Reset() {

    function locationLogin(e) {
        e.preventDefault();
        window.location.href = "/login";
    }

    return (
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
                            <input />
                        </div>
                        <div className={style.formButtons}>
                            <button onClick={(e) => locationLogin(e)}>Entrar </button>
                            <button>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}