import RestaurantIndex from "./restaurants/RestaurantIndex"

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (

		<div className='container-md'>
			<h2>Welcome to The Good Avocado</h2>
			<RestaurantIndex msgAlert= {msgAlert}/>
		</div>

	)
}

export default Home