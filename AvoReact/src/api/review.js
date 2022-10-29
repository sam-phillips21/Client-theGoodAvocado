import apiUrl from '../apiConfig'
import axios from 'axios'

export const reviewCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/reviews',
		data: {
			review: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const reviewIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/reviews'
	})
}

export const reviewShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/reviews/' + id
	})
}

export const reviewUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/reviews/' + id,
		data: {
			review: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const reviewDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/reviews/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}