import React, { useEffect, useReducer } from 'react'
import requestReducer, { REQUEST_STATUS } from '../reducer/request';
import { GET_ALL_SUCCESS, GET_ALL_FAILURE, PUT_SUCCESS, PUT_FAILURE } from '../actions/request';
import axios from 'axios';

const useRequest = (baseUrl, routeName) => {

  const [{ records, status, error }, dispatch] = useReducer(requestReducer, {
    records: [],
    status: REQUEST_STATUS.LOADING,
    error: null,
  });

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

  const propsLocal = {
    records,
    status,
    error,
    put: async (speakerRec) => {
      try {
        await axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, speakerRec)
        dispatch({
          type: PUT_SUCCESS,
          record: speakerRec
        });
      } catch (e) {
        dispatch({
          type: PUT_FAILURE,
          error: e
        });
      }
    }
  }
  return propsLocal;
}


export default useRequest;