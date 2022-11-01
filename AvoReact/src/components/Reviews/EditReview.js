import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm'
import { reviewUpdate } from '../../api/review'
import messages from '../shared/AutoDismissAlert/messages'


const EditReview = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh, restaurant
    } = props

    const [review, setReview] = useState(props.review)

    const handleChange = (e) => {
        setReview(prevReview => {
            const name = e.target.name
            let value = e.target.value

            // handle the checkbox
            // if (name === "isSqueaky" && e.target.checked) {
            //     value = true
            // } else if (name === "isSqueaky" && !e.target.checked) {
            //     value = false
            // }

            const updatedReview = { [name]: value }

            return {
                ...prevReview, ...updatedReview
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        reviewUpdate(user, restaurant._id, review, )
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updateReviewSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.updateReviewFailure + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <ReviewForm 
                    review={review}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Give this restaurant a review!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditReview