import apiUrl from '../apiConfig'
import axios from 'axios'

export const restaurantCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/restaurants',
		data: {
			restaurant: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const restaurantIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/restaurants'
	})
}

export const restaurantShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/restaurants/' + id
	})
}

export const restaurantUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/restaurants/' + id,
		data: {
			restaurant: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const restaurantDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/restaurants/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}