import React from 'react'
import { useNavigate } from 'react-router-dom';

import '../../Styles/clases/meeting.css'

export default function Meeting(props) {

  const navigate = useNavigate();

  return (
    <div className='contBodyMeeting'>
      <h1>CLASS</h1>
      <button onClick={() => {
        navigate('/home/'+props.rolpage+'/cursos')
      }}>SALIR DE LA REUNION</button>
    </div>
  )
}
