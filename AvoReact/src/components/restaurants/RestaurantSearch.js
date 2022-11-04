import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import axios from "axios"
import FoodImages from "../shared/FoodImages"
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const RestaurantSearch = () => {
    const { searchInput } = useParams()
    const [restaurants, setRestaurants] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        axios.get('http://localhost:8000/restaurants')
            .then((response) => {
                const filteredRestaurants = response.data.restaurants.filter(restaurant => {
                    return restaurant.name.toLowerCase().includes(searchInput.toLowerCase()) 
                        || restaurant.type.toLowerCase().includes(searchInput.toLowerCase())
                        || restaurant.address.toLowerCase().includes(searchInput.toLowerCase())
                })
                setRestaurants(filteredRestaurants)
            })
            .catch((err) => {
                setError(err)
            })
    }, [])


    const restaurantCards = restaurants.map(restaurant => (
        <Card key={restaurant.id} style={{ width: '30rem', margin: 8, backgroundColor: '#f2f6ec' }}>
            <Card.Img variant="top" src={FoodImages[`${restaurant.type}`]} style={{ height: '300px' }} alt={restaurant.type} />
            <Card.Header><b>{restaurant.name}</b> / {restaurant.type}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link style={{ color: '#ba7a5f', textDecoration: 'none', fontWeight: 'bold' }} to={`/restaurants/${restaurant._id}`}>View {restaurant.name} </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <>
            <h2 className='text-center mt-3'>Restaurant Search Results</h2>
            <div className='container-md text-center' style={cardContainerLayout}>

                {restaurantCards}
            </div>
        </>
    )
}

export default RestaurantSearch
