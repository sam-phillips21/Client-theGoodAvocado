import React from 'react'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link href="https://fonts.googleapis.com/css2?family=Swanky+and+Moo+Moo&display=swap" rel="stylesheet" />
			</head>

			<body style={{font:"font-family: 'Swanky and Moo Moo', cursive;"}}>
				<div className='container-md'>
					<h2>Welcome to The Good Avocado</h2>
				</div>
			</body>
		</>
	)
}

export default Home