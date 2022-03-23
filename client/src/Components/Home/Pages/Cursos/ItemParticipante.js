import React from 'react'

import '../../../../Styles/Home/itemParticipante.css';

import imgDefaul from '../../../../Assets/descarga.png';

export default function ItemParticipante(props) {
    return <div className='itemPerticipante'>
    <p>{props.dato.nombre}</p>
    <div className='avatar'>
      <img src={imgDefaul} alt='../' />
    </div>
  </div>
}
