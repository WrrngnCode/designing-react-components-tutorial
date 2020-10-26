import React from 'react'
import useRequest from '../hooks/useRequest'

const DataContext = React.createContext({});

const DataProvider = (props) => {

  const state = useRequest(props.baseUrl, props.routeName);

  return (
    <DataContext.Provider value={state}>
      {props.children}
    </DataContext.Provider>
  )
}


export { DataContext, DataProvider };