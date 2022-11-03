import { Spinner } from 'react-bootstrap'

const LoadingScreen = () => (
    <div style={{textAlign: 'center', height: 2000 }}>
        <Spinner role='status' animation='grow' size='xxl'>
        <span className='visually-hidden'>Loading...</span>
        </Spinner>
    </div>
)

export default LoadingScreen