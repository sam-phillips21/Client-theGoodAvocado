import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const reviewCreate = (user, restaurantId, newReview) => {
    // console.log('the user in createReview', user)
    // console.log('the newReview in createReview', newReview)
	return axios({
		url: `${apiUrl}/reviews/${restaurantId}`,
		method: 'POST',
		data: { review: newReview }
	})
}

export const reviewIndex = (user) => {
	return axios({
		url: apiUrl + '/reviews',
		method: 'GET',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const reviewShow = (user, id) => {
	return axios({
		url: apiUrl + '/reviews/' + id,
		method: 'GET',
	})
}

// UPDATE review
export const reviewUpdate = (user, restaurantId, updatedReview) => {
    console.log('this is updatedReview', updatedReview)
	return axios({
		url: `${apiUrl}/reviews/${restaurantId}/${updatedReview._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { review: updatedReview }
	})
}

// DELETE review
export const reviewDelete = (user, restaurantId, reviewId) => {
	return axios({
		url: `${apiUrl}/reviews/${restaurantId}/${reviewId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}