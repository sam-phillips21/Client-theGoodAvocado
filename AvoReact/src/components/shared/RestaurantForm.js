import { Form, Button, Container } from 'react-bootstrap'

const RestaurantForm = ({ restaurant, handleChange, heading, handleSubmit }) => {

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
                <Form.Label>Type of Cuisine:</Form.Label>
                <Form.Control
                    placeholder="Use a comma to separate if more than one"
                    name="type"
                    id="type"
                    value={restaurant.type}
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
                <Form.Check 
                    label="Does this restaurant deliver?"
                    name="delivery"
                    defaultChecked={restaurant.delivery}
                    onChange={handleChange}
                />
                <Form.Check 
                    label="Are you the restaurant owner?"
                    name="isUserRestaurantOwner"
                    defaultChecked={restaurant.isUserRestaurantOwner}
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default RestaurantForm