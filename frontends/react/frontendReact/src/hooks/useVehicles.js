import { useEffect, useReducer } from "react";
import {
    createVehicle as createVehicleRequest,
    getVehicles,
    deleteVehicle as deleteVehicleRequest,
    updateVehicle as updateVehicleRequest,
} from '../api/vehicleApi'

const initialState = {
    vehicles: [],
    loading: true,
    error: null,
}

function vehiclesReducer(state, action) {
    switch (action.type) {
        case 'LOAD_VEHICLES_SUCCESS':
            return{
                ...state,
                vehicles: action.payload,
                loading: false,
                error: null,
            }
        case 'CREATE_VEHICLE_SUCCESS':
            return{
                ...state,
                vehicles: [...state.vehicles, action.payload],
                error: null,
            }
        case 'CREATE_VEHICLE_ERROR':
            return{
                ...state,
                error: action.payload,
            }
        case 'LOAD_VEHICLES_ERROR':
            return {
                ...state,
                vehicles: [],
                error: action.payload,
                loading: false,
            }
        case 'UPDATE_VEHICLE_SUCCESS':
            return{
                ...state,
                vehicles: state.vehicles.map((vehicle) =>
                vehicle.id === action.payload.id ? action.payload : vehicle,
                ),
                error:null,
            }
        case 'UPDATE_VEHICLE_ERROR':
            return{
                ...state,
                error: action.payload,
            }
        case 'DELETE_VEHICLE_SUCCESS':
            return {
                ...state,
                vehicles: state.vehicles.filter(
                    (vehicle) => vehicle.id !== action.payload,
                ),
            }
        case 'DELETE_VEHICLE_ERROR':
            return {
                ...state,
                error: action.payload,
            }

        default:
            return state
    }
}

function useVehicles() {

    const [state, dispatch] = useReducer(vehiclesReducer, initialState)

    useEffect(() => {
        getVehicles() 
            .then((vehicles) => {
                dispatch({
                    type: 'LOAD_VEHICLES_SUCCESS',
                    payload: vehicles,
                })
            })
            .catch((error)=> {
                dispatch({
                    type: 'LOAD_VEHICLES_ERROR',
                    payload: error.message,
                })
            }) 
    }  ,[])

    function createVehicle(vehicle) {
        return createVehicleRequest(vehicle)
            .then((savedVehicle) => {
                dispatch({
                    type: 'CREATE_VEHICLE_SUCCESS',
                    payload: savedVehicle,
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'CREATE_VEHICLE_ERROR',
                    payload: error.message,
                })
            })
    }

    function updateVehicle(id, vehicle) {
        return updateVehicleRequest(id, vehicle)
        .then((updatedVehicle) => {
            dispatch({
                type: 'UPDATE_VEHICLE_SUCCESS',
                payload: updatedVehicle,
            })
        })
        .catch((error) => {
            dispatch({
                type: 'UPDATE_VEHICLE_ERROR',
                payload: error.message,
            })
        })
    }

    function deleteVehicle(id) {
        return deleteVehicleRequest(id)
        .then(() => {
            dispatch({
            type: 'DELETE_VEHICLE_SUCCESS',
            payload: id,
            })
        })
        .catch((error) => {
            dispatch({
            type: 'DELETE_VEHICLE_ERROR',
            payload: error.message,
            })
        })
    }

    return {
        vehicles: state.vehicles,
        loading: state.loading,
        error: state.error,
        createVehicle,
        updateVehicle,
        deleteVehicle,
    }

}

export default useVehicles
