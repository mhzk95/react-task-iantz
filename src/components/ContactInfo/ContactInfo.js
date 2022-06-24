import './ContactInfo.css'
import image from '../../images/image.png'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'

let baseUrl = 'https://lms.software-demo.in/admin/api/v1/'

const ContactInfo = () => {
  const [address, setAddress] = useState({})
  useEffect(() => {
    axios
      .get(`${baseUrl}web/contact/get-address`)
      .then((response) => setAddress(response.data.data.contact))
      .catch((err) => console.log(err))
  }, [])
  return (
    <div className='ContactInfoWrapper'>
      <div className='contactHeading'>
        <p>Contact Information</p>
      </div>
      <img  className='contactImage' src={image} />
      <div className='contactBody w-100'>
        <Row>
          <Col>
            <p className='text-warning'>Address</p>
            <p>UK</p>
            <p>{address.uk_address}</p>
            <p>India</p>
            <p>{address.india_address}</p>
          </Col>
        </Row>
        <Row className='mt-3 d-flex justify-content-between'>
          <Col>
            <p className='text-warning'>Number</p>
            <p>{address.contact_number}</p>
          </Col>
          <Col>
            <p className='text-warning'>Email</p>
            <p>{address.contact_email}</p>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ContactInfo
