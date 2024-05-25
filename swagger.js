const User = require('./models/userModel')
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phoneNumber
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email.
 *         phoneNumber:
 *           type: string
 *           description: The user's phone number.
 *       example:
 *         name: Leanne Graham
 *         email: Sincere@april.biz
 *         phoneNumber: 9012345678
 */
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.post('/users', async (req, res) => {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.send(savedUser);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: The user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.patch('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
});


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     responses:
 *       204:
 *         description: The deleted user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.delete('/users/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
});