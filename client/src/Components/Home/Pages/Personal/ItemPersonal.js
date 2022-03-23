import React, { useState } from 'react'

import '../../../../Styles/Admin/Itempersonal.css'

import imagenDefault from '../../../../Assets/defaulAvatar.png';
import ModalUsuarios from './ModalUsuarios';

export default function ItemPersonal(props) {

    let [modal, setModal] = useState(false);

    const activeModal = () => {
        setModal(!modal)
    }

  return (
    <div className='bodyItem'>
        <div className='icon'>
            <img src={imagenDefault} alt='../' />
        </div>
        <div className='nombre'>
            <p>{props.dato.nombre}</p>
        </div>
        <div className='btn'>
            <button onClick={activeModal}>VER MAS</button>
        </div>
        {
            modal
            ? <ModalUsuarios dato = {props.dato} activarModal = {activeModal} />
            : <></>
        }
    </div>
  )
}

