import type { operations } from '@schema';
import type { getHTTPCode, getPathParams, getResponsesBody } from '@typing';

import { getRepository } from 'typeorm';
import { MusicianGroup } from '../../entity';
import type core from 'express-serve-static-core';
import type { Request } from 'express';

type AddGroupLiteAdmin = operations['addGroupLiteAdmin'];
type RemoveGroupLiteAdmin = operations['removeGroupLiteAdmin'];

export const addGroupLiteAdmin = async (
  req: Request<
    getPathParams<AddGroupLiteAdmin>,
    getResponsesBody<AddGroupLiteAdmin>,
    {},
    {}
  >,
  res: core.Response<
    getResponsesBody<AddGroupLiteAdmin>,
    {},
    getHTTPCode<AddGroupLiteAdmin>
  >,
): Promise<
  core.Response<
    getResponsesBody<AddGroupLiteAdmin>,
    {},
    getHTTPCode<AddGroupLiteAdmin>
  >
> => {
  try {
    const musicianGroupRepository = getRepository(MusicianGroup);

    const musicianIdToMakeLiteAdmin = req.params.musicianId;
    const groupId = req.params.groupId;

    const admin = await musicianGroupRepository.findOne({
      where: {
        musician: {
          id: req.userId,
        },
        group: {
          id: groupId,
        },
        membership: 'admin',
      },
      relations: ['musician', 'group'],
    });

    if (!admin) {
      return res.status(403).json({ msg: 'E_UNAUTHORIZED_USER' });
    }

    const musicianToMakeLiteAdmin = await musicianGroupRepository.findOne({
      where: {
        musician: {
          id: musicianIdToMakeLiteAdmin,
        },
        group: {
          id: groupId,
        },
        membership: 'member',
      },
      relations: ['musician', 'group'],
    });

    if (!musicianToMakeLiteAdmin) {
      return res.status(404).json({ msg: 'E_MUSICIAN_NOT_MEMBER' });
    }

    musicianToMakeLiteAdmin.membership = 'lite_admin';

    await musicianGroupRepository.save(musicianToMakeLiteAdmin);

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'E_SERVER_ERROR' });
  }
};

export const removeGroupLiteAdmin = async (
  req: Request<
    getPathParams<RemoveGroupLiteAdmin>,
    getResponsesBody<RemoveGroupLiteAdmin>,
    {},
    {}
  >,
  res: core.Response<
    getResponsesBody<RemoveGroupLiteAdmin>,
    {},
    getHTTPCode<RemoveGroupLiteAdmin>
  >,
): Promise<
  core.Response<
    getResponsesBody<RemoveGroupLiteAdmin>,
    {},
    getHTTPCode<RemoveGroupLiteAdmin>
  >
> => {
  try {
    const musicianGroupRepository = getRepository(MusicianGroup);

    const musicianIdToRemoveLiteAdmin = req.params.musicianId;
    const groupId = req.params.groupId;

    const admin = await musicianGroupRepository.findOne({
      where: {
        musician: {
          id: req.userId,
        },
        group: {
          id: groupId,
        },
        membership: 'admin',
      },
      relations: ['musician', 'group'],
    });

    if (!admin) {
      return res.status(403).json({ msg: 'E_UNAUTHORIZED_USER' });
    }

    const musicianToRemoveLiteAdmin = await musicianGroupRepository.findOne({
      where: {
        musician: {
          id: musicianIdToRemoveLiteAdmin,
        },
        group: {
          id: groupId,
        },
        membership: 'lite_admin',
      },
      relations: ['musician', 'group'],
    });

    if (!musicianToRemoveLiteAdmin) {
      return res.status(404).json({ msg: 'E_MUSICIAN_NOT_LITE_ADMIN' });
    }

    musicianToRemoveLiteAdmin.membership = 'member';

    await musicianGroupRepository.save(musicianToRemoveLiteAdmin);

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'E_SERVER_ERROR' });
  }
};
