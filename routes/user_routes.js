const express = require('express');
const User = require('../models/user.js');

const router = express.Router();

//User Resgister
router.post('/models/user', async (req, res) => {
    try{
        const { id, CPF, name, cell_phone, birth_date, age, photo, postal_code, street_name, house_number, complement, neighborhood, city, state, password_18 } = req.body;
        const user = await User.create({ id, CPF, name, cell_phone, birth_date, age, photo, postal_code, street_name, house_number, complement, neighborhood, city, state, password_18 });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errao ao criar usuário'});
    }
});

//Show all Users
router.get('/models/user', async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch {
        console.error(err);
        res.status(500).json({ error: 'Error ao listar todos os usuários' });
    }
});

//Show User by ID
router.get('/models/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch {
        console.error(err);
        res.status(500).json({ error: 'Erro ao encontrar Usuário' });
    }
});

// Update User by ID
router.put('/models/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, birth_date, cell_phone, password_18 } = req.body;
        const [updateRowsCount] = await User.update(
            {name, birth_date, cell_phone, password_18},
            { where: {id: userId}}
        );
        if (updateRowsCount === 1) {
            res.json({ message: 'Usuário atualizado com sucesso' });
        }else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    }catch {
        console.error(err);
        res.status(500).json ({ error: 'Erro ao atualizar usuário' });
    }
});

//Delete User by ID
router.delete('/models/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedRowCount = await User.destroy({ where: { id: userId } });
        if (deletedRowCount === 1) {
            res.json({ message: 'Usuário excluído com sucesso' });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch {
        console.error(err);
        res.status(500).json({ error: 'Erro ao excluir o usuário' });
    }
});

module.exports = router

