const express = require('express');
const router = express.Router();
const createUploadMiddleware = require('../middlewares/upload-multimedia');
const verifyToken = require('../middlewares/jwt-auth');
const upload = createUploadMiddleware('profile_pictures');

const { 
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    updateUserProfilePicture,
    updateUserPassword
 } = require('../controllers/users');

/**
 * @swagger
 * /api/users/{_id}:
 *  get:
 *     summary: Obtener un usuario por su ID
 *     description: Recupera la información de un usuario específico.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: El ID del usuario a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Juan Perez"
 *                 email:
 *                   type: string
 *                   example: "juan@gmail.com"
 *                 profilePicture:
 *                   type: string
 *                   example: "https://i.imgur.com/WxNkK7J.png"
 *                 role:
 *                   type: string
 *                   example: "user"
 *       400:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno al obtener el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/:_id', verifyToken, getUserById);


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Recupera la lista de todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      name:
 *                        type: string
 *                        example: "Juan Perez"
 *                      email:
 *                        type: string
 *                        example: "juan@gmail.com"
 *                      profilePicture:
 *                        type: string
 *                        example: "https://i.imgur.com/WxNkK7J.png"
 *                      role:
 *                        type: string
 *                        example: "user"
 * 
 *       500:
 *         description: Error interno al obtener los usuarios
 */
router.get('/', verifyToken, getUsers);

/**
 * @swagger
 * /api/users/{_id}:
 *   put:
 *     summary: Actualizar los datos de un usuario
 *     description: Actualiza los datos del usuario especificado por el ID.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: El ID del usuario a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      name:
 *                        type: string
 *                        example: "Juan Perez"
 *                      email:
 *                        type: string
 *                        example: "juan@gmail.com"
 *                      profilePicture:
 *                        type: string
 *                        example: "https://i.imgur.com/WxNkK7J.png"
 *                      role:
 *                        type: string
 *                        example: "user"
 *       400:
 *         description: El correo electrónico ya está registrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno al actualizar el usuario
 */
router.put('/:_id', verifyToken, updateUser);

/**
 * @swagger
 * /api/users/{_id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: El ID del usuario a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      name:
 *                        type: string
 *                        example: "Juan Perez"
 *                      email:
 *                        type: string
 *                        example: "juan@gmail.com"
 *                      profilePicture:
 *                        type: string
 *                        example: "https://i.imgur.com/WxNkK7J.png"
 *                      role:
 *                        type: string
 *                        example: "user"
 *       400:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno al eliminar el usuario
 */
router.delete('/:_id', verifyToken, deleteUser);

/**
 * @swagger
 * /api/users/{_id}/profile_picture:
 *   put:
 *     summary: Actualizar la foto de perfil de un usuario
 *     description: Permite al usuario actualizar su foto de perfil.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: El ID del usuario cuyo perfil se actualizará.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile-picture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      name:
 *                        type: string
 *                        example: "Juan Perez"
 *                      email:
 *                        type: string
 *                        example: "juan@gmail.com"
 *                      profilePicture:
 *                        type: string
 *                        example: "https://i.imgur.com/WxNkK7J.png"
 *                      role:
 *                        type: string
 *                        example: "user"
 *       404:
 *         description: Usuario no encontrado o no se ha enviado una imagen
 *       500:
 *         description: Error interno al actualizar la foto de perfil
 */
router.put('/:_id/profile-picture', verifyToken, upload.single('profilePicture'), updateUserProfilePicture);

/**
 * @swagger
 * /api/users/{_id}/password:
 *   put:
 *     summary: Actualizar la contraseña de un usuario
 *     description: Permite al usuario actualizar su contraseña.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: El ID del usuario cuya contraseña se actualizará.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: La nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      name:
 *                        type: string
 *                        example: "Juan Perez"
 *                      email:
 *                        type: string
 *                        example: "juan@gmail.com"
 *                      profilePicture:
 *                        type: string
 *                        example: "https://i.imgur.com/WxNkK7J.png"
 *                      role:
 *                        type: string
 *                        example: "user"
 *       400:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno al actualizar la contraseña
 */
router.put('/:_id/password', verifyToken, updateUserPassword);

module.exports = router;
