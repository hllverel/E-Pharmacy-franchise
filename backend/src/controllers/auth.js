import { registerUser, loginUser, logoutUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'User registered successfully',
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
};

export const loginUserController = async (req, res) => {
  const { token, user } = await loginUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'Logged in successfully',
    data: {
      token,
      user: { name: user.name, email: user.email },
    },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser(req.user._id);

  res.status(200).json({ status: 200, message: 'Logged out successfully' });
};

export const getUserInfoController = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'User info retrieved successfully',
    data: { name: req.user.name, email: req.user.email },
  });
};