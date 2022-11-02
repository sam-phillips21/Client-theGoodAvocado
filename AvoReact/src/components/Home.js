import RestaurantIndex from "./restaurants/RestaurantIndex"
import { Carousel } from "react-bootstrap"



// 	return (
// 		<>
// 			<div className='container-sm'>
// 				<h2>Welcome to The Good Avocado </h2>
// 				<img className='d-flex p-2' src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="a table full of various meals" />
// 			</div>
// 			<div>
// 				<br/>
// 				<br/>

// 				<RestaurantIndex msgAlert= {msgAlert}/>
// 			</div>
			

			
// 		</>
// 	)
// }


// function CarouselFadeExample() {
	const Home = (props) => {
		const { msgAlert, user } = props
		console.log('props in home', props)
	
  return (
	<>
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Find amazing food!</h3>
          <p>Welcome to the Good Avocado! A place to find restaurant reviews and ifnformation </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1588791174744-7e9bf4378277?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Find amazing seafood restaurants!</h3>
          <p>We understand seafood.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1580823673284-e911e30564b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Its all about the avocado</h3>
          <p>
		  Like a good avocado, a good restaurant can be hard to find!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
	
	<RestaurantIndex msgAlert= {msgAlert}/>
	</>
	
  );
}




export default Home
// export default CarouselFadeExample