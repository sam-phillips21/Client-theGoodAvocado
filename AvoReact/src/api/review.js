import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const reviewCreate = (user, restaurantId, newReview) => {
	const ownerId = { owner: user._id }
	const review = {...newReview, ...ownerId}

	return axios({
		url: `${apiUrl}/reviews/${restaurantId}`,
		method: 'POST',
		data: { review: review }
	})
}

// INDEX
export const reviewIndex = (user) => {
	// const ownerId = { owner: user._id }
	return axios({
		url: apiUrl + `/reviews`,
		method: 'GET',
        // headers: {
		// 	Authorization: `Token token=${user.token}`,
		// },
	})
}

// export const reviewShow = (user, id) => {
// 	return axios({
// 		url: apiUrl + '/reviews/' + id,
// 		method: 'GET',
// 	})
// }

// UPDATE review
export const reviewUpdate = (user, restaurantId, updatedReview) => {
	const ownerId = { owner: user._id }
	const review = {...updatedReview, ...ownerId}

	return axios({
		url: `${apiUrl}/reviews/${restaurantId}/${review.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { review: review }
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