import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { reviewIndex } from '../../api/review'
// import Image from 'react-bootstrap/Image'
import images from '../shared/images'

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
                message: 'Index Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const restaurantCards = allReviews.map(review => (
        
        <Card key={ review.id } style={{ width: '25rem', margin: 5 }}>      
            {
                images.map(image => (
                    <Card.Img variant="top" src={ image } />
                ))
                
            }
            
            <Card.Header>{ review.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={ `/reviews/mine` }>View { restaurant.name } </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div className='container-md' style={ cardContainerLayout }>
            { restaurantCards }
        </div>
    )
}

export default ReviewIndex