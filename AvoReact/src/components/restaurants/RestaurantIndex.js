import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { restaurantIndex } from '../../api/restaurant'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const RestaurantIndex = ({ user, msgAlert }) => {

    const [allResturants, setAllRestaurants] = useState([])

    useEffect(() => {
        restaurantIndex(user)
        .then(res => {
            setAllRestaurants(res.data.restaurants)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const allRestaurantsJSX = allRestaurants.map(restaurant => {
        return (
            <Link to={`/restaurtants/${restaurant._id}`} key= {restaurant._id}>
                <li>Name: {restaurant.name} type: {restaurant.type}</li>
                </Link>
        )

    })

    const restaurantCards = allResturants.map(restaurant => (
        <Card key={ restaurant.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{restaurant.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={ `/restaurants/${restaurant.id}` } >View { restaurant.name} </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div className='container-md' style={ cardContrainerLayoiut }>
            { restaurantCards}
        </div>
    )
}

export default RestaurantIndex