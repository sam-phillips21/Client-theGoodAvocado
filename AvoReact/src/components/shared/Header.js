import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { Container, Button} from 'react-bootstrap'
const linkStyle = {
    color: 'Black',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='restaurants' style={linkStyle}>
				All Restaurants
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='create' style={linkStyle}>
				Add a Restaurant
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='reviews' style={linkStyle}>
				My Reviews
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className='btn' style={{backgroundColor: '#ba7a5f', borderColor: '#ba7a5f'}}>
			<Link className='text-light' to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<Container className='container-fluid d-flex justify-content-end'>
        <Nav.Item className='mx-2 btn btn-success'>
		    <Link className='text-light' to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='btn' style={{backgroundColor: '#ba7a5f', borderColor: '#ba7a5f'}}>
		    <Link className='text-light' to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</Container>
)

const Header = ({ user }) => (
	<Navbar variant='dark' expand='md'>
		<Navbar.Brand className='m-2'>
            <Link to='/' style={linkStyle}>
                The Good Avocado
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto container-fluid d-flex justify-content-between'>
				{user && (
					<span className='m-2'><i>Welcome, {user.email}</i></span>
				)}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
