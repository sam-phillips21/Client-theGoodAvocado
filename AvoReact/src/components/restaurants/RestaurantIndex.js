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

    const [allRestaurants, setAllRestaurants] = useState([])

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


    const restaurantCards = allRestaurants.map(restaurant => (
        <Card key={ restaurant.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ restaurant.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={ `/restaurants/${restaurant._id }` }>View { restaurant.name } </Link>
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

export default RestaurantIndex