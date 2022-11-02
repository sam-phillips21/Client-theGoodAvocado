import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Button, Image, } from 'react-bootstrap'
import { restaurantShow, restaurantDelete } from '../../api/restaurant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faClipboardList, faBurger, faBowlFood, faCreditCard, faSquareParking, faWifi, faMaskFace, faWineGlass, faXmark, faShop } from '@fortawesome/free-solid-svg-icons'
import RestaurantUpdateModal from './RestaurantUpdateModal'
import NewReview from '../Reviews/NewReview'
import ShowReview from '../Reviews/ShowReview'
import FoodImages from '../shared/FoodImages'
// import LoadingScreen from '../LoadingScreen'

const restaurantOwner = <FontAwesomeIcon icon={faShop} style={{color:'#5d52c7'}} bounce/>
const delivery = <FontAwesomeIcon icon={faBicycle} style={{color:'#308534'}} />
const reservations = <FontAwesomeIcon icon={faClipboardList} style={{color:'#308534'}} />
const takeout = <FontAwesomeIcon icon={faBurger} style={{color:'#308534'}} />
const catering = <FontAwesomeIcon icon={faBowlFood} style={{color:'#308534'}} />
const credit = <FontAwesomeIcon icon={faCreditCard} style={{color:'#308534'}} />
const parking = <FontAwesomeIcon icon={faSquareParking} style={{color:'#308534'}} />
const wifi = <FontAwesomeIcon icon={faWifi} style={{color:'#308534'}} />
const mask = <FontAwesomeIcon icon={faMaskFace} style={{color:'#308534'}} />
const alcohol = <FontAwesomeIcon icon={faWineGlass} style={{color:'#308534'}} />
const xMark = <FontAwesomeIcon icon={faXmark} style={{color:'#ba4e47'}} />
const vegan = <FontAwesomeIcon icon={faXmark} style={{color:'#ba4e47'}} />

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}



const RestaurantShow = ({ user, msgAlert }) => {
console.log('this is the restShow user', user)
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

                    {restaurant.isUserRestaurantOwner ?
                        <h5>{restaurantOwner} You are the business owner!</h5>
                        :
                        null
                    }

                    <h4>{restaurant.address}</h4>
                    <h4>{restaurant.telephone}</h4>
                    
                </Container>
                <Container className='d-flex'>
                    <Container className='d-flex justify-content-end'>
                        <ul>
                            <li>{restaurant.delivery ? delivery : xMark} Offers delivery </li>
                            <li>{restaurant.reservations ? reservations : xMark} Takes reservations</li>
                            <li>{restaurant.takeout ? takeout : xMark} Offers takeout</li>
                            <li>{restaurant.catering ? catering : xMark} Offers catering</li>
                            <li>{restaurant.vegan ? vegan : xMark} Vegan Options</li>
                        </ul>
                    </Container>
                    <Container className='d-flex justify-content-start'>
                        <ul>
                            <li>{restaurant.acceptsCreditCard ? credit : xMark} Accepts credit cards</li>
                            <li>{restaurant.parking ? parking : xMark} Free parking</li>
                            <li>{restaurant.wifi ? wifi : xMark} Free Wi-fi</li>
                            <li>{restaurant.masksRequired ? mask : xMark} Requires masks</li>
                            <li>{restaurant.alcohol ? alcohol : xMark} Offers alcohol</li>
                        </ul>
                    </Container>

                </Container>
                <Container className='text-center'>
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