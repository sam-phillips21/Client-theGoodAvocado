import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
<<<<<<< HEAD
		<Nav.Item className='m-2'>
			<Link to='Restaurants' style={linkStyle}>
				All Restaurants
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='my-reviews' style={linkStyle}>
				My Reviews
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
=======
		<Nav.Item>
>>>>>>> a075c9beaac62e456c967667db55ad537990c02c
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
<<<<<<< HEAD
		<Nav.Item className='m-2'>
=======
		<Nav.Item>
>>>>>>> a075c9beaac62e456c967667db55ad537990c02c
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
<<<<<<< HEAD
        <Nav.Item className='m-2'>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2'>
=======
        <Nav.Item>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item>
>>>>>>> a075c9beaac62e456c967667db55ad537990c02c
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
<<<<<<< HEAD
		<Nav.Item className='m-2'>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
=======
		<Nav.Link>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>
>>>>>>> a075c9beaac62e456c967667db55ad537990c02c
	</>
)

const Header = ({ user }) => (
	<Navbar bg='primary' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
                react-auth-template
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
