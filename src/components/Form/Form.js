import './Form.css'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useFormik } from 'formik'
import { Schema } from './Schema'
import axios from 'axios'
import { useEffect, useState } from 'react'

let baseUrl = 'https://lms.software-demo.in/admin/api/v1/'

function FormSection() {
  const [messageTypes, setMessageTypes] = useState([])
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [failure,setFailure] = useState(false)
  const onSubmit = () => {
    resetForm()
    setLoading(true)
    setFailure(false)
    setSuccess(false)
    axios
      .post(`${baseUrl}web/contact/save-enquiry`, {
        email: values.email,
        enquiry_type: values.messageType,
        message: values.message,
        name: values.name,
      })
      .then((response) => {
        console.log(values)
        setSuccess(true)
        setLoading(false)
        console.log(response)
      })
      .catch((err) => {
        setFailure(true)
        console.log(err.message)})
  }
  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: '',
      email: '',
      messageType: 'Contact a tech geek',
      message: '',
    },
    validationSchema: Schema,
    onSubmit,
  })
  useEffect(() => {
    axios
      .get(`${baseUrl}web/contact/get-enquiry-types`)
      .then((response) => setMessageTypes(response.data.data.enquiryTypes))
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='formWrapper'>
      <div className='headingForm'>
        <p>We'd love to hear from you...</p>
      </div>
      <div className='formContent'>
        <p className='subTitle'>
          Whether you want to try our product or have a technical question - we
          have it all covered.
        </p>
        <Form onSubmit={handleSubmit}>
          <Row className='mb-1'>
            <Form.Group as={Col} className='mb-1 w-50'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='name'
                onChange={handleChange}
                value={values.name}
                type='text'
                placeholder='Enter your Name'
              />
              <span>{errors.name}</span>
            </Form.Group>
            <Form.Group as={Col} className='mb-1 w-50'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='email'
                onChange={handleChange}
                value={values.email}
                type='email'
                placeholder='Enter your Email ID'
              />
              <span>{errors.email}</span>
            </Form.Group>
          </Row>
          <Form.Group className='mb-1'>
            <Form.Label>Message Type</Form.Label>
            <Form.Select
              name='messageType'
              onChange={handleChange}
              value={values.messageType}
              className='text-center'
            >
              {messageTypes.map((type,i) => {
                return <option key={i}>{type}</option>
              })}
            </Form.Select>
            <span>{errors.messageType}</span>
          </Form.Group>
          <Form.Group className='mb-5'>
            <Form.Label>Message</Form.Label>
            <Form.Control
              name='message'
              onChange={handleChange}
              value={values.message}
              as='textarea'
              type='text'
              placeholder='Message'
              rows={4}
            />
            <span>{errors.message}</span>
          </Form.Group>
          {success && <span className='successMessage'>Message Sent </span>}
          {failure && <span className='failureMessage'>Something went wrong</span>}
          <Button
            variant='primary'
            className='float-end submitButton'
            type='submit'
            disabled={loading && true}
          >
            {loading ? (
              <>
                <div className='spinner-border' role='status'>
                  <span className='sr-only'></span>
                </div>
              </>
            ) : (
              'Send'
            )}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default FormSection
