import * as yup from 'yup'

export const Schema = yup.object().shape({
    name:yup.string().min(4,'minimum 4 characters').matches(/^[a-zA-Z ]+$/,'alphabets Only').required('required'),
    email: yup.string().required('Required'),
    message: yup.string().required('Required')
})