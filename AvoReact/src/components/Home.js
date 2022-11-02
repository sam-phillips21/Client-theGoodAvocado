import RestaurantIndex from "./restaurants/RestaurantIndex"

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<div className='container-sm'>
				<h2>Welcome to The Good Avocado </h2>
				<img className='d-flex p-2' src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="a table full of various meals" />
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