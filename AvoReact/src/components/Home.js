import RestaurantIndex from "./restaurants/RestaurantIndex"

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (

		<div className='container-sm'>
			<h2>Welcome to The Good Avocado </h2>
			<img className='rounded-bottom show-image' src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="a table full of various meals" />
			<RestaurantIndex msgAlert= {msgAlert}/>
		</div>

	)
}

export default Home