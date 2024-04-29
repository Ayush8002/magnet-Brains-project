import { body } from "express-validator";


const registerValidator = () => [
    body("name", "Please Enter Name").isLength({ min: 3 }),
    body("email", "Please Enter email").isEmail(),
    body("password", "Please Enter Password").isLength({ min: 5 }),
];

const loginValidator = () => [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
]

const createTaskValidator = () => [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
]


export { registerValidator, loginValidator, createTaskValidator };