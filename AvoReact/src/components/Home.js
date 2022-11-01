import RestaurantIndex from "./restaurants/RestaurantIndex"

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<div className='container-sm'>
				<h2>Welcome to The Good Avocado </h2>
				<img className='rounded img-fluid body-bg' src="https://images.unsplash.com/photo-1631100732613-6b65da9a343d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="a table full of various meals" />
			</div>
			<div>
				<br/>
				<br/>

				<RestaurantIndex msgAlert= {msgAlert}/>
			</div>
		</>
	)
}

export default Home