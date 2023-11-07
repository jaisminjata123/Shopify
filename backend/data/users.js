import bcrypt from 'bcryptjs';

const users=[
    {
        name:'Admin user',
        email:'admin@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Janie',
        email:'Janie@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    },
    {
        name:'ria',
        email:'ria@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    }
];

export default users;