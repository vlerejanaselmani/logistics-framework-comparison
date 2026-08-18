import { useEffect, useReducer } from "react";

const API_URL = 'http://localhost:8080/api/vehicles'

const initialState = {
    vehicles: [],
    loading: true,
    error: null,
}

function vehiclesReducer(state, action) {
    switch (action.type) {
        case 'LOAD_SUCCESS':
            return{
                ...state,
                vehicles: action.payload,
                loading: false,
            }
        case 'CREATE_SUCCESS':
            return{
                ...state,
                vehicles: [...state.vehicles, action.payload],
            }
        case 'CREATE_ERROR':
            return{
                ...state,
                error: action.payload,
            }
        case 'LOAD_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        default:
            return state
    }
}

function useVehicles() {

    const [state, dispatch] = useReducer(vehiclesReducer, initialState)

    useEffect(() => {
        fetch(API_URL)
           .then((response) => {
            if(!response.ok) {
                throw new Error('Error : failed to load vehicles!')
            }

            return response.json()
           })
           .then((data)=> {
             dispatch({ type: 'LOAD_SUCCESS', payload: data})
           })
           .catch((error)=>{
            dispatch({ type: 'LOAD_ERROR', payload: error.message})
           })

          }  ,[])

    function createVehicle(vehicle) {
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicle),
        })
          .then((response)=>{
            if(!response.ok) {
                throw new Error('failed to create vehicle because' )
            }

            return response.json()
          })
          .then((savedVehicle) => {
           dispatch({ type: 'CREATE_SUCCESS', payload: savedVehicle})
          })
          .catch((error)=> {
            dispatch({type: 'CREATE_ERROR', payload: error.message})
          })
    }

    return {
        vehicles: state.vehicles,
        loading: state.loading,
        error: state.error,
        createVehicle,
    }

}

export default useVehicles