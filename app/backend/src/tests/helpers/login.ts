import * as bcrypt from 'bcryptjs'

const user = {
    email: 'anyuser@user.com',
    password: 'secret_user',
}

const userBcrypt = {
    email: 'anyuser@user.com',
    password: bcrypt.hashSync('secret_user'),
}

export { user, userBcrypt }
