import authRoutes from './auth/routes';
import taskRoutes from './Task/routes'
// import watchListRoutes from './alert/routes';

export default [
    ...authRoutes,  
    ...taskRoutes,
    // ...watchListRoutes,
];

