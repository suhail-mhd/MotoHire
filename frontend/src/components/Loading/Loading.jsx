import React from 'react'
import CarLoader from '../../assets/all-images/cars-img/9e9c68435731c23c00573a1544d539b3.gif'
import './Loading.css'

function Loading() {
  return (
    <div id="root">
    <div class="loader-wrapper">
      {/* <div class="loader"></div> */}
      <img src={CarLoader} alt="" />
    </div>
  </div>
  )
}

export default Loading