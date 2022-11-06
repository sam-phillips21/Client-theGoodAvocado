import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Button, Image, } from 'react-bootstrap'
import { restaurantShow, restaurantDelete } from '../../api/restaurant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faCarrot, faKeyboard, faBicycle, faClipboardList, faBurger, faBowlFood, faCreditCard, faSquareParking, faWifi, faMaskFace, faWineGlass, faXmark, faShop } from '@fortawesome/free-solid-svg-icons'
import RestaurantUpdateModal from './RestaurantUpdateModal'
import NewReview from '../Reviews/NewReview'
import ShowReview from '../Reviews/ShowReview'
import FoodImages from '../shared/FoodImages'
import LoadingScreen from '../LoadingScreen'
import StarRating from '../shared/StarRating'


const restaurantOwner = <FontAwesomeIcon icon={faShop} style={{ color: '#5d52c7' }} bounce />
const address = <FontAwesomeIcon icon={faLocationDot} />
const telephone = <FontAwesomeIcon icon={faPhone} />
const delivery = <FontAwesomeIcon icon={faBicycle} style={{ color: '#308534' }} />
const reservations = <FontAwesomeIcon icon={faClipboardList} style={{ color: '#308534' }} />
const takeout = <FontAwesomeIcon icon={faBurger} style={{ color: '#308534' }} />
const catering = <FontAwesomeIcon icon={faBowlFood} style={{ color: '#308534' }} />
const credit = <FontAwesomeIcon icon={faCreditCard} style={{ color: '#308534' }} />
const parking = <FontAwesomeIcon icon={faSquareParking} style={{ color: '#308534' }} />
const wifi = <FontAwesomeIcon icon={faWifi} style={{ color: '#308534' }} />
const mask = <FontAwesomeIcon icon={faMaskFace} style={{ color: '#308534' }} />
const alcohol = <FontAwesomeIcon icon={faWineGlass} style={{ color: '#308534' }} />
const xMark = <FontAwesomeIcon icon={faXmark} style={{ color: '#ba4e47' }} />
const vegan = <FontAwesomeIcon icon={faCarrot} style={{ color: '#308534' }} />
const website = <FontAwesomeIcon icon={faKeyboard} />

const RestaurantShow = ({ user, msgAlert }) => {
    const [restaurant, setRestaurant] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        // scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

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

    let averageRating
    let reviewCards
    if (restaurant) {
        if (restaurant.reviews.length > 0) {
            let ratings = restaurant.reviews.map(review => review.rating)
            averageRating = Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) / 0.5) * 0.5

            // map over the reviews
            // produce one ShowReview component for each of them
            reviewCards = restaurant.reviews.map(review => (

                <Container>
                    <ShowReview
                        key={review._id}
                        review={review}
                        restaurant={restaurant}
                        user={user}
                        msgAlert={msgAlert}
                        triggerRefresh={() => setUpdated(prev => !prev)}
                    />
                </Container>
            ))
        }
    }

    if (deleted) navigate('/restaurants')

    if (!restaurant) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container fluid='md'>
                <Container className='show-image-container mb-3'>
                    <Image className='rounded-bottom show-image' src={FoodImages[`${restaurant.type}`]} alt={restaurant.type} />
                    <h1 className='display-1 show-image-header'>{restaurant.name}</h1>
                </Container>
                <Container className='text-center'>
                    <h1 className='border-bottom border-2 border-success mb-2'>{restaurant.type} Restaurant</h1>
                    <StarRating
                        value={averageRating}
                        style={{ fontSize: 18, color: 'yellow' }}
                    />

                    {restaurant.otherTypes ?
                        <h4>Other options available: {restaurant.otherTypes}</h4>
                        :
                        null
                    }
                    {restaurant.isUserRestaurantOwner ?
                        <h5>{restaurantOwner} You are the business owner!</h5>
                        :
                        null
                    }

                    <h4>{address} {restaurant.address}</h4>

                    <h4>{telephone} {restaurant.telephone}</h4>

                    {restaurant.website ?
                        <>
                            <h4>{website}
                                <a href={restaurant.website} target='blank' style={{ color: '#ba7a5f', textDecoration: 'none' }}> {restaurant.name}</a>
                            </h4>
                        </>
                        :
                        <h4>{website} No Website for this restaurant yet</h4>
                    }


                </Container>
                <Container className='d-flex'>
                    <Container className='d-flex justify-content-end'>
                        <ul>
                            <li>{restaurant.delivery ? delivery : xMark} Offers delivery </li>
                            <li>{restaurant.reservations ? reservations : xMark} Takes reservations</li>
                            <li>{restaurant.takeout ? takeout : xMark} Offers takeout</li>
                            <li>{restaurant.catering ? catering : xMark} Offers catering</li>
                            <li>{restaurant.vegan ? vegan : xMark} Vegan friendly</li>
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
                <Container className='text-center mb-5'>
                    {
                        restaurant.owner && user && restaurant.owner._id === user._id
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} className="m-2"
                                    variant="success"
                                >
                                    Edit Restaurant
                                </Button>
                                <Button onClick={() => handleDeleteRestaurant()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    {restaurant.name} is Closed Permanently
                                </Button>
                            </>
                            :
                            null
                    }
                </Container>

                <RestaurantUpdateModal
                    user={user}
                    restaurant={restaurant}
                    show={editModalShow}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    handleClose={() => setEditModalShow(false)}
                />

                <Container style={{ width: '40rem' }}>
                    <NewReview
                        user={user}
                        restaurant={restaurant}
                        msgAlert={msgAlert}
                        triggerRefresh={() => setUpdated(prev => !prev)}
                    />
                </Container>

                <Container>
                    <h3 className='my-5'>All of {restaurant.name}'s reviews:</h3>
                    {
                        restaurant.reviews.length > 0
                            ?
                            <>
                                {reviewCards}
                            </>
                            :
                            <>
                                <h5 className='text-center'>This restaurant does not have any reviews yet. Be the first to review!</h5>
                            </>
                    }

                </Container>
            </Container>
        </>
    )
}

export default RestaurantShow