import React from 'react'
import Alert from 'react-bootstrap/Alert'

import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			show: true,
		}
		this.timeoutId = null
	}

	componentDidMount() {
		this.timeoutId = setTimeout(this.handleClose, 5000)
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId)
	}

	handleClose = () => this.setState({ show: false })

	render() {
		const { variant, heading, message, deleteAlert, id } = this.props

		// Delete this alert after the fade animation time (300 ms by default)
		if (!this.state.show) {
			setTimeout(() => {
				deleteAlert(id)
			}, 300)
		}

		return (
			<Alert
				dismissible
				show={this.state.show}
				variant={variant}
				onClose={this.handleClose}>
				<div className='container' style={{right:"0",left:"0",top:"0",bottom:"0",marginRight:"auto",marginLeft:"auto",marginTop:"auto",marginBottom:"auto"}}>
					<Alert.Heading>{heading}</Alert.Heading>
					<p className='alert-body'>{message}</p>
				</div>
			</Alert>
		)
	}
}

export default AutoDismissAlert
