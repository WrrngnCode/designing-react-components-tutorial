import React, { useEffect, useReducer } from 'react'
import requestReducer, { REQUEST_STATUS } from '../reducer/request';
import axios from 'axios';
import { GET_ALL_SUCCESS, GET_ALL_FAILURE, PUT_SUCCESS, PUT_FAILURE, PUT } from '../actions/request';
import {store} from 'react-notifications-component'

const useRequest = (baseUrl, routeName) => {

  const [{ records, status, error }, dispatch] = useReducer(requestReducer, {
    records: [],
    status: REQUEST_STATUS.LOADING,
    error: null,
  });

  //const signal = React.useRef(axios.CancelToken.source());

  useEffect(() => {

    let signal = axios.CancelToken.source();
    const fetchData = async () => {

      try {
        let response =  await axios.get(`${baseUrl}/${routeName}`, {
          cancelToken: signal.token,
        });
        dispatch({
          records: response.data,
          type: GET_ALL_SUCCESS,
        })
      } catch (e) {
        console.log('loading data error', e);

        if (axios.isCancel(e)) {
          console.log('Get request cancelled')
        } else {
          dispatch({
            status: REQUEST_STATUS.ERROR,
            type: GET_ALL_FAILURE,
            error: e,
          });
        };
      };
    };

    fetchData();

    return () => {
      console.log('unmount and cancel running axios');
      signal.cancel('request cancelled');
    };

  }, []);


  const propsLocal = {
    records,
    status,
    error,
    put: React.useCallback(async (speakerRec) => {
      try {
        dispatch({
          type: PUT,
          record: speakerRec
        });

        await axios.put(`${baseUrl}/${routeName}/${speakerRec.id}`, speakerRec)
        dispatch({
          type: PUT_SUCCESS,
          record: speakerRec
        });

      } catch (e) {

        dispatch({
          type: PUT_FAILURE,
          error: e
        });

        store.addNotification({
          title: "Favorite Status Update Failure.",
          message: `Speaker: ${speakerRec.firstName} ${speakerRec.lastName}`,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
            pauseOnHover: true
          }
        });

      }
    }, [])
  }

  return propsLocal;
};

export default useRequest;