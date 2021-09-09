import express, {Request, Response} from 'express';
import pg from '../postgres';
import sql from 'sql-template-strings';
import type {operations} from '@schema';
import {HttpError} from '@typing';

type GetMusician = operations['getMusicians'];
type GetMusicianResponse =
GetMusician['responses']['200']['content']['application/json'];

const router=express.Router();

router.get('/', async (
    req: Request,
    res: Response<GetMusicianResponse | HttpError, {}>,
) => {
  const response = await pg.query(
      sql `SELECT * FROM musicians`,
  );
  console.log(response);
});

export default router;
