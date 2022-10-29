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
        delivery: null,
        isUserRestaurantOwner: false,
    }

    const [restaurant, setRestaurant] = useState(defaultRestaurant)

    const handleChange = event => {
        setRestaurant(prevRestaurant => {
            const updatedName = event.target.name
            let updatedValue = event.target.value

            // handle checkboxes since they only send 'checked' or 'unchecked'
            if ((updatedName === 'delivery' || 'isUserRestaurantOwner') && event.target.checked) {
                updatedValue = true
            } else if ((updatedName === 'delivery' || 'isUserRestaurantOwner') && !event.target.checked) {
                updatedValue = false
            }
            const updatedRestaurant = { [updatedName]: updatedValue }
            return { ...prevRestaurant, ...updatedRestaurant }
        })
    }


    const handleCreateRestaurant = event => {
        event.preventDefault()
        restaurantCreate(restaurant, user)
            .then(res => { navigate(`/restaurants/${res.data.restaurant.id}`) })
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