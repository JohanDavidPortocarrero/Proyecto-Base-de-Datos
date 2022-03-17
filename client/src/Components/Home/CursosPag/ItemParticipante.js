import React from 'react'

import '../../../Styles/Home/itemParticipante.css';

import imgDefaul from '../../../Assets/descarga.png';

export default function ItemParticipante() {
    return <div className='itemPerticipante'>
    <p>Nombre Estudinte</p>
    <div className='avatar'>
      <img src={imgDefaul} alt='../' />
    </div>
  </div>
}
