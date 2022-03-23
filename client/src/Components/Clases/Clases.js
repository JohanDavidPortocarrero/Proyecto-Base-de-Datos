import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import '../../Styles/clases/clasehome.css'

import Page404 from '../PagesExtras/Page404'
import Meeting from './Meeting';
import ModalPresentarPrueba from './ModalPresentarPrueba';

export default function Clases() {

  const navigate = useNavigate();
  const { rolpage, idCurso, extra } = useParams();
  
  return (
    <div className='bodyclases' >
      {
        !idCurso 
        ? <Page404 />
        : rolpage === 'staff'
         ? <Meeting rolpage={rolpage} />
         : extra === 'meeting'
          ? <Meeting rolpage={rolpage} />
          : <ModalPresentarPrueba rolpage={rolpage} idCurso = {idCurso} />
      }
    </div>
  )
}
