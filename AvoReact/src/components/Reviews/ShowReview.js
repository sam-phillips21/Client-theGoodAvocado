import Accordion from 'react-bootstrap/Accordion'
import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { reviewUpdate, reviewDelete } from '../../api/review'

// import LoadingScreen from '../LoadingScreen'


// const cardContainerLayout = {
//     display: 'flex',
//     flexFlow: 'row wrap',
//     justifyContent: 'center'
// }

import ReviewForm from '../shared/ReviewForm'

const ShowReview = (props) => {
    const {review, restaurant, user, msgAlert, triggerRefresh} = props
    console.log('user', user)
    // const [setReview] = useState(null)
    // const [isUpdateShown, setIsUpdateShown] = useState(false)
    // const [editShow, setEditShow] = useState(false)

    // const [NewReview, setNewReview] = useState
    // const [deleted, setDeleted] = useState(false)
    // const [updated, setUpdated] = useState(false)

    // const { id } = useParams()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     ShowReview(user, id)
    //         .then(res => {
          
    //            ShowReview(res.data.review)
    //         })
    //         .catch((error) => {
    //             msgAlert({
    //                 heading: 'Failure',
    //                 message: 'Show Review Failure' + error,
    //                 variant: 'danger'
    //             })
    //         })
    // }, [updated])

    const handleDeleteReview = () => {
        reviewDelete(user, review._id, restaurant._id)
        .then(() => {
            // setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleting a Review',
                variant: 'success'
            })
            
        })
        .then(() => triggerRefresh())
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Deleting  Review Fail: ' + error,
                variant: 'danger'
            })
        })
    }

    // let reviewAccordion
    // if (review) {
    //     if (review.length > 0) {
    //         // map over the reviews
    //         // produce one ShowReview component for each of them
    //         reviewAccordion = review.reviews.map(review => (
    //             <ShowReview 
    //                 key={review._id}
    //                 review={review}
    //                 user={user}
    //                 msgAlert={msgAlert}
    //                 triggerRefresh={() => setUpdated(prev => !prev)}
    //             />
    //         ))
    //     }
    // }

    // if (deleted) navigate('/restaurants')

    // if (!restaurant) {
    //     return <LoadingScreen />
    // }

    // if (!review) {
    //     return <p> ...Loading </p>
    // }

    return (
		<Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{user.email} said:</Accordion.Header>
                <Accordion.Body>
                    <small>{review.comment}</small><br/>
                        {/* <ReviewForm
                        review={review}
                        handleDeleteReview={handleDeleteReview}
                        msgAlert={msgAlert}
                        // handleChange={handleChange}
                        // handleSubmit={handleSubmit}
                        heading={user}
                        /> */}
                    <Button
                        className='m-2'
                        variant='warning'
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDeleteReview}
                    >
                        Delete
                    </Button>

                </Accordion.Body>

            </Accordion.Item>
        </Accordion>
    )
}

export default ShowReview

