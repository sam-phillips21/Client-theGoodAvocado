import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
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

        reviewUpdate(user, restaurant._id, review)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.reviewUpdateSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.reviewUpdateFailure + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header closeButton />
                <Accordion.Body>
                    <ReviewForm
                        review={review}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        heading="Please review this restaurant!"
                    />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default EditReview