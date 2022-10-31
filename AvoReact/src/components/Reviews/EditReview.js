import React, {useState} from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm'
import {handleDeleteReview} from './ShowReview'
import {reviewDelete} from '../../api/review'

const EditReview = (props) => {
    const { handleChange,  heading, triggerRefresh } = props

const [review, setReview] = useState(props.review)

const handleSubmit = event => {
    event.preventDefault()
    
    reviewUpdate(review, user, props.review._id)
        .then(() => handleClose())
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Updated Review',
                variant: 'success'
            })
        })
        .then(() => triggerRefresh())
        .catch(error => {
            msgAlert({
                heading: 'Failure',
                message: 'Update Review Failure' + error,
                variant: 'danger'
            })
        })
}

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Comment:</Form.Label>
                <Form.Control
                    placeholder="Add comments about the restaurant, the food, and your overall experience"
                    name="comment"
                    id="comment"
                    value={review.comment}
                    onChange={handleChange}
                    as="textarea"
                    rows={3}
                />
                <Form.Select
                    aria-label="rating"
                    name="rating"
                    defaultValue={review.rating} 
                    onChange={handleChange}
                >
                    <option>Add a rating</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Select>
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}

export default EditReview