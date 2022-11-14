import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from 'react-modal';
import moment from 'moment-timezone';
import { api } from "../../service/api";

import style from "./modal.module.css";

import Swal from "sweetalert2";
import { RiCloseFill } from 'react-icons/ri'

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    width: "25rem",
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
export default function ModalStatusUBS({ vacina, modalIsOpen, setIsOpen }) {

    const navigate = useNavigate()
    const [selectedStatus, setSelectedStatus] = useState('')

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            padding:'0px',
            width: '35%',
            borderRadius: '18px',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function closeModal() {
        setIsOpen(false);
    }

    async function handleVacinas(){
        let response = await api.put(`schedule/${vacina.id}`,{
            isVaccinated:selectedStatus
        })
        if (response.status == 200) {
            Swal.fire({
                title: "Sucesso",
                text: "Registro salvo com sucesso!",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#4EBDEF",
                confirmButtonText: "Ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsOpen(false);
                    navigate('/')
                }
            })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Erro inesperado, tente novamente!'
            })
        }
    }

    return (
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
                ariaHideApp={false}
                style={customStyles}>
                <div className={style.main}>
                    <div className={style.title}>
                        <div style={{display:'flex', alignItems:'center'}}><h1 style={{lineHeight: '0px'}}>Aplicar Vacina</h1></div>
                        <h2 onClick={closeModal} style={{  fontSize: '150%', cursor: 'pointer' }}><RiCloseFill color="#fff"/></h2>
                    </div>
                    <div className={style.containerPadrao}>                 
                        <div className={style.containerEdit}>
                            <div>
                                <h1>Nome:{vacina.Users?.name}</h1>
                                <p>Vacina: {vacina.name}</p>
                                <p>Local: {vacina.Rooms?.Places?.name}</p>
                                <p>Data: {moment(vacina.startTime).format('DD/MM/YYYY')}</p>
                                <p>Horário: {moment(vacina.startTime).format('HH:mm')}</p>
                            </div>
                            <hr/>
                            <div>
                                    <h1>Lançar vacina</h1>
                                    <p>Paciente compareceu:</p>
                                    <select className="selectPadrao" value={selectedStatus} multiple={false} onChange={(e) => { setSelectedStatus(e.target.value) }}>
                                        <option value="">Selecione</option>
                                        <option value="true">Compareceu</option>
                                        <option value="false">Não compareceu</option>
                                    </select>
                                    <p>Lote da vacina:</p>
                                    <input className={style.inputPlaces} type="text" />
                                    <buton className={style.buttonSalva} onClick={()=> handleVacinas()}>  Salvar </buton>
                            </div> 
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}