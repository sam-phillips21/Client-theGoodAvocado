import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { restaurantCreate } from '../../api/restaurant'
import RestaurantForm from '../shared/RestaurantForm'


const RestaurantCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultRestaurant = {
        name: '',
        type: '',
        address: '',
        telephone: '',
        isUserRestaurantOwner: false,
        delivery: false,
        reservations: false,
        takeout: false,
        catering: false,
        acceptsCreditCard: false,
        parking: false,
        wifi: false,
        masksRequired: false,
        alcohol: false
    }

    const [restaurant, setRestaurant] = useState(defaultRestaurant)

    const handleChange = event => {
        setRestaurant(prevRestaurant => {
            const updatedName = event.target.name
            console.log(event.target.type)
            let updatedValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value

            const updatedRestaurant = { [updatedName]: updatedValue }
            console.log(updatedRestaurant)
            return { ...prevRestaurant, ...updatedRestaurant }
        })
    }


    const handleCreateRestaurant = event => {
        event.preventDefault()
        restaurantCreate(restaurant, user)
            .then(res => { navigate(`/restaurants/${res.data.restaurant._id}`) })
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Restaurant',
                    variant: 'success'
                })
            })
            .catch(error => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Restaurant Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <RestaurantForm
            restaurant={restaurant}
            handleChange={handleChange}
            heading="Add a New Restaurant"
            handleSubmit={handleCreateRestaurant}
        />
    )
}


export default RestaurantCreate