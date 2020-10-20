//Render Properties
import React from 'react';
import SpeakerRenderProps from './SpeakerRenderProps';


const Speakers_RP = () => {


  return (
    <SpeakerRenderProps>
      {({speakers}) => {
        return (
          < div >
            {speakers.map(({ imageSrc, name }) => {
              return (
                <img src={`/images/${imageSrc}.png`} alt={name} key={imageSrc}></img>
              );
            })}
          </div>
        )
      }
      }
    </SpeakerRenderProps>
  )
}

export default Speakers_RP;