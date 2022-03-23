import React from 'react'
import { useNavigate } from 'react-router-dom';

import '../../Styles/PaginasError/page404.css';

export default function Page404() {

  const navigate = useNavigate();

  return (
    <div className='Body404'>
      <p className='number'>404</p>
      <p className='text'>Page no found</p>
      <button onClick={() => {
        navigate('/')
      }}>IR AL HOME</button>
    </div>
  )
}
