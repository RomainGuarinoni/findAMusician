import express from 'express';
import query from '../postgres';
import { v4 as uuidV4 } from 'uuid';
import sql from 'sql-template-strings';
import type { operations, components } from '@schema';
import type {
  getHTTPCode,
  getResponsesBody,
  getRequestBody,
  getPathParams,
} from '@typing';
import type core from 'express-serve-static-core';

const router = express.Router();

type GetEvents = operations['getEvents'];
type PostEvents = operations['postEvents'];
type DeleteEvents = operations['deleteEvents'];

router.get(
  '/',
  async (
    req: core.Request<
      {},
      getResponsesBody<GetEvents>,
      getRequestBody<GetEvents>,
      getPathParams<GetEvents>
    >,
    res: core.Response<getResponsesBody<GetEvents>, {}, getHTTPCode<GetEvents>>,
  ) => {
    try {
      const { rows }: { rows: getResponsesBody<GetEvents> } = await query(sql`
            SELECT * FROM events
        `);
      for (let index = 0; index < rows.length; index++) {
        const { rows: admin } = await query<
          components['schemas']['musician']
        >(sql`
            SELECT * FROM musicians
            INNER JOIN events_admin
            ON events_admin.admin = musicians.id
          `);
        rows[index]['admin'] = admin[0];
      }
      return res.status(200).json(rows);
    } catch (err) {
      return res
        .status(500)
        .json({ msg: 'E_SQL_ERROR', stack: JSON.stringify(err) });
    }
  },
);

router.post(
  '/',
  async (
    req: core.Request<
      {},
      getResponsesBody<PostEvents>,
      getRequestBody<PostEvents>,
      getPathParams<PostEvents>
    >,
    res: core.Response<
      getResponsesBody<PostEvents>,
      {},
      getHTTPCode<PostEvents>
    >,
  ) => {
    try {
      const id = uuidV4();
      await query(sql`
              INSERT INTO events (
                  id,
                  name,
                  description,
                  start_date,
                  end_date,
                  adress
              ) VALUES (
                  ${id},
                  ${req.body.name},
                  ${req.body.description},
                  ${req.body.start_date},
                  ${req.body.end_date},
                  ${req.body.adress}
              );
          `);
      await query(sql`
        INSERT INTO events_admin (
            event,
            admin
        ) VALUES (
            ${id},
            ${req.userId}
        );
    `);
      res.sendStatus(201);
    } catch (err) {
      if (err.constraint === 'events_name_key') {
        return res.status(401).json({ msg: 'E_EVENT_NAME_ALREADY_TAKEN' });
      } else {
        return res
          .status(500)
          .json({ msg: 'E_SQL_ERR', stack: JSON.stringify(err) });
      }
    }
  },
);

router.delete(
  '/',
  async (
    req: core.Request<
      {},
      getResponsesBody<DeleteEvents>,
      getRequestBody<DeleteEvents>,
      getPathParams<DeleteEvents>
    >,
    res: core.Response<
      getResponsesBody<DeleteEvents>,
      {},
      getHTTPCode<DeleteEvents>
    >,
  ) => {
    try {
      const { rows: admin } = await query(sql`
              SELECT id FROM musicians
              INNER JOIN events_admin
                  ON events_admin.admin = musicians.id
              WHERE events_admin.event = ${req.body.event}
          `);
      if (admin.length === 0) {
        return res.status(404).json({ msg: 'E_EVENT_DOES_NOT_EXIST' });
      } else {
        if (admin.some(({ id }) => id === req.userId)) {
          await query(sql`
                DELETE FROM events WHERE events.id = ${req.body.event}
              `);

          return res.sendStatus(200);
        } else {
          return res.status(403).json({ msg: 'E_UNAUTHORIZED_USER' });
        }
      }
    } catch (err) {
      return res
        .status(500)
        .json({ msg: 'E_SQL_ERROR', stack: JSON.stringify(err) });
    }
  },
);

export default router;
