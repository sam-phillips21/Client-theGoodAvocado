import React, { useState } from 'react' 
import { Card, Button } from 'react-bootstrap'
import { reviewDelete } from '../../api/review'
import EditReview from '../Reviews/EditReview'

// import LoadingScreen from '../LoadingScreen'

const ShowReview = (props) => {
    const {review, restaurant, user, msgAlert, triggerRefresh} = props
    console.log('review', review)

    const [editModalShow, setEditModalShow] = useState(false)


    const handleDeleteReview = () => {
        reviewDelete(user, restaurant._id, review.id)
        .then(() => {
            console.log('user', user)
            console.log('restaurant', restaurant)
            console.log('review', review)

        })

        .then(() => {
            msgAlert({
                heading: 'Success: Review Deleted',
                message: "We'll never speak of it again",
                variant: 'success'
            })  
        })
        .then(() => triggerRefresh())
        .catch((error) => {
            msgAlert({
                heading: 'Oops',
                message: 'Delete Review Fail: ' + error,
                variant: 'danger'
            })
        })
    }

    return (

        <>
            <Card className="m-2" style={{backgroundColor: '#f2f6ec'}}>
                    <Card.Header>{review.ownerEmail} said:</Card.Header>
                    <Card.Body>
                        <small>Comments: {review.comment}</small><br/>
                        <small>Rating: {review.rating}</small><br/>
                        <img 
                            style={{width: 200}} 
                            src={review.image}
                        />
                    </Card.Body>
                    <Card.Footer>
                        {
                            user.email === review.ownerEmail
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='success'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteReview()}
                                >
                                    Delete
                                </Button>
                            </>
                            :
                            <></>
                        }
                    </Card.Footer>
            </Card>
            <EditReview 
                user={user}
                restaurant={restaurant}
                review={review}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
            />
        </>

    )
}

export default ShowReview

