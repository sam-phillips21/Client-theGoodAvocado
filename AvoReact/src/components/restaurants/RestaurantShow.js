import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button, Image, Row, Col } from 'react-bootstrap'
import { restaurantShow, restaurantDelete } from '../../api/restaurant'
import RestaurantUpdateModal from './RestaurantUpdateModal'
import NewReview from '../Reviews/NewReview'
import ShowReview from '../Reviews/ShowReview'
import FoodImages from '../shared/FoodImages'
// import LoadingScreen from '../LoadingScreen'


const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}


const RestaurantShow = ({ user, msgAlert }) => {

    const [restaurant, setRestaurant] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    // const [reviewModalShow, setReviewModalShow] = useState(false)

    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        restaurantShow(user, id)
            .then(res => {

                setRestaurant(res.data.restaurant)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Restaurant Failure' + error,
                    variant: 'danger'
                })
            })
    }, [updated])

    // const toggleShowUpdate = () => {
    //     setIsUpdateShown(prevUpdateShown => !prevUpdateShown)
    // }

    // const handleChange = (event) => {
    //     // to keep the values as users input info 
    //     // first spread the current restaurant
    //     // then comma and modify the key to the value you need
    //     setRestaurant({...restaurant, [event.target.name]: event.target.value})
    // }

    // const handleUpdateRestaurant = () => {
    //     restaurantUpdate(restaurant, user, id)
    //     .then(() => {
    //         msgAlert({
    //             heading: 'Success',
    //             message: 'Updating Restaurant',
    //             variant: 'success'
    //         })
    //     })
    //     .catch((error) => {
    //         msgAlert({
    //             heading: 'Failure',
    //             message: 'Update Restaurant Failure' + error,
    //             variant: 'danger'
    //         })
    //     })
    // }

    const handleDeleteRestaurant = () => {
        restaurantDelete(user, id)
            .then(() => {
                setDeleted(true)
                msgAlert({
                    heading: 'Success',
                    message: 'Deleting a Restaurant',
                    variant: 'success'
                })

            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Deleting a Restaurant Fail: ' + error,
                    variant: 'danger'
                })
            })
    }

    let reviewCards
    if (restaurant) {
        if (restaurant.reviews.length > 0) {
            // map over the reviews
            // produce one ShowReview component for each of them
            reviewCards = restaurant.reviews.map(review => (
                <ShowReview
                    key={review._id}
                    review={review}
                    restaurant={restaurant}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (deleted) navigate('/restaurants')

    // if (!restaurant) {
    //     return <LoadingScreen />
    // }

    if (!restaurant) {
        return <p> ...Loading </p>
    }

    return (
        <>
            <Container fluid='md'>
                <Container className='show-image-container mb-3'>
                    <Image className='rounded-bottom show-image' src={FoodImages[`${restaurant.type}`]} />
                    <h1 className='display-1 show-image-header'>{restaurant.name}</h1>
                </Container>
                <Container className='text-center'>
                    <h1 className='border-bottom border-2 border-success mb-3'>{restaurant.type} Restaurant</h1>
                    <h4>{restaurant.address}</h4>
                    <h4>{restaurant.telephone}</h4>
                    {
                        restaurant.owner && user && restaurant.owner._id === user._id
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} className="m-2" variant="warning">
                                    Edit Restaurant
                                </Button>
                                <Button onClick={() => handleDeleteRestaurant()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    {restaurant.name} is closed permanently
                                </Button>
                            </>
                            :
                            null
                    }
                </Container>
                <Container>
                    <Row>
                        <Col>Delivery: {restaurant.delivery ? 'Yes' : 'No'}</Col>
                        <Col>Reservations: {restaurant.reservations ? 'Yes' : 'No'}</Col>
                    </Row>
                    <Row>
                        <Col>Takeout: {restaurant.takeout ? 'Yes' : 'No'}</Col>
                        <Col>Catering: {restaurant.catering ? 'Yes' : 'No'}</Col>
                    </Row>
                    <Row>
                        <Col>Accepts Credit Cards: {restaurant.acceptsCreditCard ? 'Yes' : 'No'}</Col>
                        <Col>Parking: {restaurant.parking ? 'Yes' : 'No'}</Col>
                    </Row>
                    <Row>
                        <Col>Free Wi-fi: {restaurant.wifi ? 'Yes' : 'No'}</Col>
                        <Col>Masks Required: {restaurant.masksRequired ? 'Yes' : 'No'}</Col>
                    </Row>
                    <Row>
                        <Col>Alcohol: {restaurant.alcohol ? 'Yes' : 'No'}</Col>
                    </Row>
                </Container>


                {/* <Card key={restaurant.id} style={{ width: '30rem', margin: 8 }}>

                    <Card.Header>{restaurant.name}</Card.Header>

                    <Card.Body>
                        <Card.Text>
                            <small>Type: {restaurant.type}</small><br />
                            <small>Address: {restaurant.address}</small><br />
                            <small>Telephone: {restaurant.telephone}</small><br />
                            <small>
                                Does this restaurant deliver?: {restaurant.delivery ? 'yes' : 'no'}
                            </small><br />
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            restaurant.owner && user && restaurant.owner._id === user._id
                                ?
                                <>
                                    <Button onClick={() => setEditModalShow(true)} className="m-2" variant="warning">
                                        Edit Restaurant
                                    </Button>
                                    <Button onClick={() => handleDeleteRestaurant()}
                                        className="m-2"
                                        variant="danger"
                                    >
                                        {restaurant.name} is closed Permanently
                                    </Button>
                                </>
                                :
                                null
                        }
                    </Card.Footer>
                </Card> */}

                <h3 className='my-5'>All of {restaurant.name}'s reviews:</h3>
                <Container style={cardContainerLayout}>
                    {reviewCards}
                </Container>
                <RestaurantUpdateModal
                    user={user}
                    restaurant={restaurant}
                    show={editModalShow}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    handleClose={() => setEditModalShow(false)}
                />
                <NewReview
                    user={user}
                    restaurant={restaurant}
                    // show={reviewModalShow}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                // handleClose={() => setReviewModalShow(false)}
                />


            </Container>
        </>
    )
}

export default RestaurantShow