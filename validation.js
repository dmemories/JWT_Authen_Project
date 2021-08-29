const Joi = require('joi')

const joiLogin = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(4).max(20).required()
})

const register = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).max(20).required(),
        password: Joi.string().min(4).max(20).required(),
        email: Joi.string().email().max(20).required()
    })
    const { error } = schema.validate(data)
    if (error) throw error.details[0].message
    return data
}

module.exports.register = register