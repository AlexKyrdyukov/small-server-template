import express, { Router } from 'express';
import requireDirectory from 'require-directory';
// import routess from '../routes';

// const route = requireDirectory(module, `${process.cwd()}/src/routes`, {
//   visit: whenLoadModule,
// });

// function whenLoadModule(obj: unknown) {
//   // eslint-disable-next-line no-console
//   console.log(obj);
//   if (obj instanceof Router) {
//     // eslint-disable-next-line no-console
//     console.log(obj);
//   }
// }

// const route = requireDirectory(module);

// eslint-disable-next-line no-console
// console.log(routess);

// const types = Object.entries(route);
// eslint-disable-next-line no-console
// console.log(route, types, process.cwd());

const routes = express.Router();

// routes.use('/user', userRouter);

// routes.use('/auth', authRouter);

// routes.use('/books', booksRouter);

export default routes;
