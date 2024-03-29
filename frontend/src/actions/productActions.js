import axios from 'axios';
import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	ADMIN_PRODUCTS_REQUEST,
	ADMIN_PRODUCTS_SUCCESS,
	ADMIN_PRODUCTS_FAIL,
	NEW_PRODUCT_REQUEST,
	NEW_PRODUCT_SUCCESS,
	NEW_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAIL,

	CLEAR_ERRORS
} from '../constants/productConstants';
import { getToken, } from '../utils/helpers'
export const getProducts = (currentPage = 1, keyword = '', price, category = '') => async (dispatch) => {
	try {
		dispatch({
			type: ALL_PRODUCTS_REQUEST
		})

		let link = `http://localhost:4001/api/v1/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}`

		if (category) {
			link = `http://localhost:4001/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
		}
		const { data } = await axios.get(link)

		dispatch({
			type: ALL_PRODUCTS_SUCCESS,
			payload: data
		})

	} catch (error) {
		dispatch({
			type: ALL_PRODUCTS_FAIL,
			payload: error.response.data.message
		})
	}
}

export const getProductDetails = (id) => async (dispatch) => {
	try {

		dispatch({ type: PRODUCT_DETAILS_REQUEST })

		const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/${id}`)

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data.product
		})

	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error.response.data.message
		})
	}
}

export const getAdminProducts = () => async (dispatch) => {
	try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/products`, {
            //AxiosRequestConfig parameter
            withCredentials: true //correct
        })
        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}
// export const newProduct = (productData) => async (dispatch) => {
// 	try {
// 		dispatch({ type: NEW_PRODUCT_REQUEST })
// 		const config = {
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Authorization': `Bearer ${getToken()}`

// 			},
// 			// withCredentials: true //correct
// 		}
// 		const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/admin/product/new`, productData, config)
// 		dispatch({
// 			type: NEW_PRODUCT_SUCCESS,
// 			payload: data
// 		})
// 	} catch (error) {
// 		dispatch({
// 			type: NEW_PRODUCT_FAIL,
// 			payload: error.response.data.message
// 		})
// 	}
// }

// export const deleteProduct = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: DELETE_PRODUCT_REQUEST })
//         const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/product/${id}`, {
//             'Authorization': `Bearer ${getToken()}`
//         })
//         dispatch({
//             type: DELETE_PRODUCT_SUCCESS,
//             payload: data.success
//         })
//     } catch (error) {
//         dispatch({
//             type: DELETE_PRODUCT_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

// export const updateProduct = (id, productData) => async (dispatch) => {
//     try {
//         dispatch({ type: UPDATE_PRODUCT_REQUEST })
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
// 				'Authorization': `Bearer ${getToken()}`
//             }
//         }
//         const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/product/${id}`, productData, config)
//         dispatch({
//             type: UPDATE_PRODUCT_SUCCESS,
//             payload: data.success
//         })
//     } catch (error) {
//         dispatch({
//             type: UPDATE_PRODUCT_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

export const newProduct = (productData) => async (dispatch) => {
	try {
        dispatch({ type: NEW_PRODUCT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true //correct
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/admin/product/new`, productData, config)
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/product/${id}`, {
            withCredentials: true //correct
        })
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'},
				withCredentials: true
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/product/${id}`, productData, config)
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS

	})
}