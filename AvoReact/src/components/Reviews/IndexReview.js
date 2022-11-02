import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { reviewIndex } from '../../api/review'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ReviewIndex = ({ user, msgAlert }) => {

    const [allReviews, setAllReviews] = useState([])

    useEffect(() => {
        reviewIndex(user)
        .then(res => {
            setAllReviews(res.data.reviews)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Failure: ' + error,
                variant: 'danger'
            })
        })
    }, [])

    const usersReviews = allReviews.filter(review => review.review.ownerEmail === user.email)
    const reviewCards = usersReviews.map(review => (
        
        <Card key={ review.id } style={{ width: '25rem', margin: 5 }}>      
            
            <Card.Header>
                <Link to={ `/restaurants/${review.restaurant._id}` }>View { review.restaurant.name } </Link>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    
                    <small>Comments: {review.review.comment}</small><br/>
                    <small>Rating: {review.review.rating}</small><br/>
                </Card.Text>
            </Card.Body>
        </Card>
    ))
    
    return (
        <>
            <h2 className='text-center mt-3'>All My Reviews</h2>
            <div className='container-md text-center' style={ cardContainerLayout }>
                { reviewCards }
            </div>
        </>
    )
}

export default ReviewIndex