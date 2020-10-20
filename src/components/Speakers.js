import React, { useContext } from 'react'
import SpeakerContext from './speakerContext'

export default function Speakers() {

  const speakers = useContext(SpeakerContext)

  return (
    <div>

      <div className="mb-6 ">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Search by name"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
        {speakers.map(({ id, firstName, lastName, bio, isFavorite }) => (
          <div className="rounded overflow-hidden shadow-lg p-6" key={id}>
            <div className="grid grid-cols-4 mb-6">
              <div className="font-bold text-lg col-span-3">{`${firstName} ${lastName}`}</div>
              <div className="flex justify-end">
                <div
                  className={isFavorite ? 'heartredbutton' : 'heartdarkbutton'}
                ></div>
              </div>
            </div>
            <div className="mb-6">
              <img
                src={`/speakers/speaker-${id}.jpg`}
                alt={`${firstName} ${lastName}`}
              />
            </div>
            <div className="text-gray-600">{bio.substr(0, 70) + '...'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}









// HOC EXAMPLE
//import withData from './withData'
// const Speakers = ({ speakers }) => {
//   return (
//     <div>
//       {speakers.map(({ imageSrc, name }) => {
//         return (
//           <img src={`/images/${imageSrc}.png`} alt={name} key={imageSrc}></img>
//         );
//       })}
//     </div>
//   );
// };
// const maxSpeakersToShow = 2;
// export default withData(maxSpeakersToShow)(Speakers);
