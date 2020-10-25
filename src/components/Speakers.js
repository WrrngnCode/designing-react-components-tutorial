import React, { useContext, useState, useEffect, useReducer } from 'react';
import Speaker from './Speaker';
import SpeakerContext from './speakerContext';
import SpeakerSearchBar from './SpeakerSearchBar';
import axios from 'axios';
import { GET_ALL_SUCCESS, GET_ALL_FAILURE, PUT_SUCCESS, PUT_FAILURE } from '../actions/request';

import requestReducer, { REQUEST_STATUS } from '../reducer/request';


const Speakers = () => {

  const [searchQuery, setSearchQuery] = useState('');


  const [{ records: speakers, status, error }, dispatch] = useReducer(requestReducer, {
    records: [],
    status: REQUEST_STATUS.LOADING,
    error: null,
  });

  //const [status, setStatus] = useState(REQUEST_STATUS.LOADING);



  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get('http://localhost:4000/speakers');

        dispatch({
          records: response.data,
          type: GET_ALL_SUCCESS,
        })
      }

      catch (e) {
        console.log('loading data error')
        dispatch({
          status: REQUEST_STATUS.ERROR,
          type: GET_ALL_FAILURE,
          error: e,
        })
      }
    }

    fetchData();

  }, []);


  function toggleSpeakerFavorite(rec) {
    return { ...rec, isFavorite: !rec.isFavorite }
  }

  async function onFavoriteToggleHandler(speakerRec) {    
    try {
      const toggledSpeakerRec = toggleSpeakerFavorite(speakerRec);    
      await axios.put(`http://localhost:4000/speakers/${speakerRec.id}`)
      dispatch({
        type:PUT_SUCCESS,
        record:toggledSpeakerRec
      });
    } catch (e) {
      dispatch({
        type:PUT_FAILURE,
        error:e
      });

    }
  }

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
              <Speaker key={speaker.id} {...speaker} onFavoriteToggle={() => onFavoriteToggleHandler(speaker)} />
            ))}
        </div>
      }
    </div>
  )
}


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
