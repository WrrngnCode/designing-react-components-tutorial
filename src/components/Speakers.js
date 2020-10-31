import React, { useContext, useState } from 'react';
import { DataContext, DataProvider } from '../contexts/DataContext';

import SpeakerSearchBar from './SpeakerSearchBar';
import Speaker from './Speaker';

import { REQUEST_STATUS } from '../reducer/request';




const SpeakersComponent = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const { records: speakers, status, error, put } = useContext(DataContext);


  // async function onFavoriteToggleHandler(speakerRec) {
  //   put({ ...speakerRec, isFavorite: !speakerRec.isFavorite })
  // }

  const success = status === REQUEST_STATUS.SUCCESS;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const hasErrored = status === REQUEST_STATUS.ERROR;


  return (
    <div>
      <SpeakerSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {isLoading && <div>Loading...</div>}

      {hasErrored && (
        <div>
          Loading error... Is the json-server running? (try `&#34`npm run
          json-server `&#34` at terminal prompt)
          <br />
          <b>ERROR: {error.message}</b>
        </div>
      )}

      {success &&
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
          {speakers.filter((rec) => {
            const targetString = `${rec.firstName} ${rec.lastName}`.toLowerCase();
            return searchQuery.length === 0 ? true : targetString.includes(searchQuery.toLowerCase())
          })
            .map((speaker) => (
              <Speaker key={speaker.id} {...speaker} 
              //onFavoriteToggle={() => onFavoriteToggleHandler(speaker)}
              put={put}
              />
            ))}
        </div>
      }
    </div>
  )
}


const Speakers = (props) => {
  return (
    <DataProvider baseUrl="http://localhost:4000" routeName="speakers">
      <SpeakersComponent {...props}></SpeakersComponent>
    </DataProvider>
  );
};


export default Speakers;



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
