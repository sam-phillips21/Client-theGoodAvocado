import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { restaurantIndex } from '../../api/restaurant'
import FoodImages from '../shared/FoodImages'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const RestaurantIndex = ({ user, msgAlert }) => {

    const [allRestaurants, setAllRestaurants] = useState([])

    useEffect(() => {
        restaurantIndex(user)
            .then(res => {
                setAllRestaurants(res.data.restaurants)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Index Failure: ' + error,
                    variant: 'danger'
                })
            })
    }, [])

    const restaurantCards = allRestaurants.map(restaurant => (

        <Card key={restaurant.id} style={{ width: '30rem', margin: 8 }}>
            <Card.Img variant="top" src={FoodImages[`${restaurant.type}`]} style={{ height: '300px' }} />
            <Card.Header><b>{restaurant.name}</b> / {restaurant.type}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/restaurants/${restaurant._id}`}>View {restaurant.name} </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <>
        <h2 className='text-center mt-3'>All Restaurants</h2>
        <div className='container-md text-center' style={cardContainerLayout}>
            
            {restaurantCards}
        </div>
        </>
    )
}

export default RestaurantIndex