import React, { useEffect, useState } from 'react'
import { REQUEST_STATUS } from '../reducer/request';

const useRequestSimple = () => {

  const speakers = [
    {
      imageSrc: 'speaker-component-1124',
      name: 'Douglas Crockford',
      id: 1124,
      firstName: 'Douglas',
      lastName: 'Crockford',
      sat: true,
      sun: false,
      isFavorite: false,
      bio:
        'Douglas Crockford discovered the JSON Data Interchange Format. He is also the author of _JavaScript: The Good Parts_. He has been called a guru, but he is actually more of a mahatma.',
    },
    {
      imageSrc: 'speaker-component-1530',
      name: 'Tamara Baker',
      id: 1530,
      firstName: 'Tamara',
      lastName: 'Baker',
      sat: false,
      sun: true,
      isFavorite: true,
      bio:
        'Tammy has held a number of executive and management roles over the past 15 years, including VP engineering Roles at Molekule Inc., Cantaloupe Systems, E-Color, and Untangle Inc.',
    },
    {
      imageSrc: 'speaker-component-10803',
      name: 'Eugene Chuvyrov',
      id: 10803,
      firstName: 'Eugene',
      lastName: 'Chuvyrov',
      sat: true,
      sun: false,
      isFavorite: false,
      bio:
        'Eugene Chuvyrov is  a Senior Cloud Architect at Microsoft. He works directly with both startups and enterprises to enable their solutions in Microsoft cloud, and to make Azure better as a result of this work with partners.',
    },
  ];

  // const [{ records: speakers, status, error }, dispatch] = useReducer(requestReducer, {
  //   records: speakersInit,
  //   status: REQUEST_STATUS.SUCCESS,
  //   error: null,
  // });

  const [state, setState] = useState({
    speakers: speakers,
    status: REQUEST_STATUS.LOADING,
    error: null,
  });


  useEffect(() => {
    //const fetchData = async () => {    

    // try {
    //   let response = await axios.get('http://localhost:4000/speakers');

    //   dispatch({
    //     records: response.data,
    //     type: GET_ALL_SUCCESS,
    //   })
    // }

    // catch (e) {
    //   console.log('loading data error')
    //   dispatch({
    //     status: REQUEST_STATUS.ERROR,
    //     type: GET_ALL_FAILURE,
    //     error: e,
    //   })
    // }
    //}

    //fetchData();

    const timer = setTimeout(() => {
      setState(p => ({ ...p, status: REQUEST_STATUS.SUCCESS }))
    }, 1500)

    return () => clearTimeout(timer)

  }, []);

  return state;

}


export default useRequestSimple;