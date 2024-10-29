const userService = require('../services/userService');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await userService.registerUser(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(Number(id));
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const user = await userService.updateUser(Number(id), updatedData);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await userService.deleteUser(Number(id));
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        await userService.requestPasswordReset(email);
        res.status(200).json({ message: 'Email enviado para redefinição de senha.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const confirmPasswordReset = async (req, res) => {
    const { email, code, newPassword } = req.body;

    try {
        await userService.confirmPasswordReset(email, code, newPassword);
        res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    register,
    getUser,
    updateUser,
    deleteUser,
    login,
    requestPasswordReset,
    confirmPasswordReset,
};
