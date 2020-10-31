import React from 'react'
//import { SimpleImg } from 'react-simple-img'
export default function SpeakerImage({ id }) {

  const imageUrl = `/speakerimages/Speaker-${id}.jpg`


  return (

    <img
      src={imageUrl}
    />

  )
}
