import deviceRoute from './deviceRoutes.js'
import roomRoutes from './roomRoutes.js'
import issueRoutes from './issueRoutes.js'
import userRoutes from './userRoutes.js'
import authRoutes from './authRoutes.js'

/* configuracion de las rutas */
const routes = (app) => {
    app.use('/auth', authRoutes);
    app.use('/devices', deviceRoute);
    app.use('/rooms', roomRoutes);
    app.use('/issues', issueRoutes);
    app.use('/users', userRoutes);
}

export default routes