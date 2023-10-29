const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const users = await User.findAll();
    return res.json(users)
});

const create = catchError(async(req, res) => {
    const { birthday, email, first_name, last_name, password } = req.body;
    const users = await User.create({
        birthday,
        email,
        first_name,
        last_name,
        password
    })
    return res.status(201).json(users)
})

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id }})
    return res.sendStatus(204);
})

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { birthday, email, first_name, last_name, password } = req.body;
    const user = await User.update(
        { birthday, email, first_name, last_name, password },
        { where: { id: id}, returning: true}
    )
    return res.json(user);
})


module.exports = {
    getAll,
    create,
    remove,
    update
}