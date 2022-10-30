import React from 'react'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<body style={{font:"font-family: 'Swanky and Moo Moo', cursive;"}}>
				<div className='container-md'>
					<h2>Welcome to The Good Avocado</h2>
				</div>
			</body>
		</>
	)
}

export default Home
