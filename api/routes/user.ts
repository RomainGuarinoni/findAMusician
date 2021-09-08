import express from 'express';
// import getUserById from '../controller/user';
import {operations} from '@schema';
import {HttpError} from '@typing';
import {Response, Request} from 'express';

type getUsers = operations['getUser'];
type getUsersByIdBody = getUsers['requestBody']['content']['application/json'];
type getUserByIdPath = getUsers['parameters']['path'];
type getUserByIdResponse =
  getUsers['responses']['200']['content']['application/json'];

const router = express.Router();

router.post(
    '/:other/:test',
    (
        req: Request<getUserByIdPath, {}, getUsersByIdBody, {}>,
        res: Response<getUserByIdResponse | HttpError, {}>,
    ) => {
      console.log(req.params.other);
      console.log(req.params.test);
      console.log(req.body.id);


      res.status(200).json({id: 'it works'});
    },
);

export default router;
