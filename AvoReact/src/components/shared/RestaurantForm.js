import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'

const RestaurantForm = (props) => {
    const { restaurant, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3> 
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name of Restaurant:</Form.Label>
                <Form.Control
                    placeholder="Restaurant's name"
                    name="name"
                    id="name"
                    value={restaurant.name}
                    onChange={handleChange}
                />
                <Form.Label>Address:</Form.Label>
                <Form.Control
                    placeholder="Restaurant's address"
                    name="address"
                    id="address"
                    value={restaurant.address}
                    onChange={handleChange}
                />
                <Form.Label>Telephone:</Form.Label>
                <Form.Control
                    placeholder="Enter a phone number (e.g. 012-345-6789)"
                    name="telephone"
                    id="telephone"
                    value={restaurant.telephone}
                    onChange={handleChange}
                />
                <Form.Label>Type of Cuisine:</Form.Label>
                <Form.Select
                    aria-label='type of cuisine'
                    name="type"
                    defaultValue={restaurant.type}
                    onChange={handleChange}
                >
                    <option>Select a primary type</option>
                    <option value="American">American</option>
                    <option value="Chinese">Chinese</option>
                    <option value="French">French</option>
                    <option value="Italian">Italian</option>
                    <option value="Indian">Indian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Portuguese">Portuguese</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Vietnamese">Vietnamese</option>
                    <option value="Other">Other</option>
                </Form.Select>
                <Form.Label>Additional Types:</Form.Label>
                <Form.Control
                    placeholder="Optional - Do you serve more than one type of cuisine?"
                    name="otherTypes"
                    id="otherTypes"
                    value={restaurant.otherTypes}
                    onChange={handleChange}
                />
                <Form.Check 
                    label="Are you the restaurant owner?"
                    name="isUserRestaurantOwner"
                    defaultChecked={restaurant.isUserRestaurantOwner}
                    onChange={handleChange}
                />
                {/* <Form.Label>Amenities:</Form.Label> */}
                <Form.Check 
                    label="Offers delivery?"
                    name="delivery"
                    defaultChecked={restaurant.delivery}
                    onChange={handleChange}
                />
                <Form.Check 
                    label="Takes reservations?"
                    name="reservations"
                    defaultChecked={restaurant.reservations}
                    onChange={handleChange}
                />
                <Form.Check 
                    label="Offers takeout?"
                    name="takeout"
                    defaultChecked={restaurant.takeout}
                    onChange={handleChange}
                />
                <Form.Check 
                    label="Offers catering?"
                    name="catering"
                    defaultChecked={restaurant.catering}
                    onChange={handleChange}
                />
                <Form.Check 
                    label="Accepts credit cards?"
                    name="acceptsCreditCard"
                    defaultChecked={restaurant.acceptsCreditCard}
                    onChange={handleChange}
                />
                <Form.Check 
                    label="Is parking available?"
                    name="parking"
                    defaultChecked={restaurant.parking}
                    onChange={handleChange}
                />
                <Form.Check 
                    label="Offers free wi-fi?"
                    name="wifi"
                    defaultChecked={restaurant.wifi}
                    onChange={handleChange}
                />
                <Form.Check 
                    label="Masks required?"
                    name="masksRequired"
                    defaultChecked={restaurant.masksRequired}
                    onChange={handleChange}
                />
                <Form.Check 
                    label="Offers alcohol?"
                    name="alcohol"
                    defaultChecked={restaurant.alcohol}
                    onChange={handleChange}
                />
                
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default RestaurantForm