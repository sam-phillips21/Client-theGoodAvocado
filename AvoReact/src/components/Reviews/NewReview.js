import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import ReviewForm from '../shared/ReviewForm'
import { reviewCreate } from '../../api/review'

const NewReview = (props) => {
    const {
        user, restaurant, msgAlert, triggerRefresh
    } = props

    const [review, setReview] = useState({
        comment: '',
        rating: ''
    })

    const handleChange = (e) => {
        setReview(prevReview => {
            const name = e.target.name
            let value = e.target.value
            const updatedReview = { [name]: value }
            return {
                ...prevReview, ...updatedReview
            }
        })
    }
    const handleImageChange = (image) => {
        setReview(prevReview => {
            const name = 'image'
            const updatedReview = {[name]: image}
            return {
                ...prevReview, ...updatedReview
            }
        })
    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        let updatedReview = review
        // console.log('updatedREview', updatedReview)
        updatedReview.ownerEmail = user.email
        setReview({
            comment: '',
            rating: '',
        })
        console.log('setReview', setReview)
        reviewCreate(user, restaurant._id, updatedReview)
            .then(() => {
                msgAlert({
                    heading: 'Thanks!',
                    message: 'We appreciate you taking the time to review this restaurant!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong! Please try again',
                    variant: 'danger'
                })
            })
    }

    return (

        <Accordion>
            <Accordion.Item style={{ backgroundColor: '#f2f6ec' }} eventKey="0">
                <Accordion.Header>Add a Review</Accordion.Header>
                <Accordion.Body style={{ backgroundColor: '#f2f6ec' }}>
                    <ReviewForm
                        review={review}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        handleSubmit={handleSubmit}
                        heading="Please submit a review!"
                    />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    )
}

export default NewReview
