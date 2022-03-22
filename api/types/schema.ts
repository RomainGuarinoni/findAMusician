/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/login": {
    post: operations["login"];
  };
  "/logout": {
    /** Logout the current user */
    delete: operations["logout"];
  };
  "/refresh_token": {
    /** Send a new access token */
    post: operations["postRefreshToken"];
  };
  "/register": {
    post: operations["register"];
  };
  "/events/admins": {
    /** Add a musician as an admin of an event */
    post: operations["addEventAdmin"];
  };
  "/events/{eventId}": {
    /** Get an event by his Id */
    get: operations["getEventById"];
    /** Delete an event by his Id */
    delete: operations["deleteEventById"];
    /** Modify an event info */
    patch: operations["patchEventById"];
  };
  "/events": {
    /** Get a list of all the events */
    get: operations["getEvents"];
    /** Post a new event */
    post: operations["postEvents"];
  };
  "/events/{eventId}/kick/{groupId}": {
    /** Delete a group from an event */
    delete: operations["eventKickGroup"];
  };
  "/genres": {
    /** Get a list of all genres */
    get: operations["getGenres"];
  };
  "/groups/{groupId}/admins/transfer/{musicianId}": {
    /** Transfer the admin membership to another member */
    post: operations["transferGroupAdmin"];
  };
  "/groups/{groupId}/admins/lite_admins/{musicianId}": {
    /** Give a group member the lite_admin membership */
    post: operations["addGroupLiteAdmin"];
    /** Remove a group member the lite_admin membership */
    delete: operations["removeGroupLiteAdmin"];
  };
  "/groups/{groupId}/admins/lite_admins": {
    /** Give a group member the lite_admin membership */
    put: operations["addGroupLiteAdmins"];
  };
  "/groups/event/join": {
    /** A group joins an event */
    post: operations["groupJoinEvent"];
  };
  "/groups/{groupId}": {
    /** Get a group information by it's Id */
    get: operations["getGroupsById"];
    /** Delete a group by it's Id */
    delete: operations["deleteGroupsById"];
    /** Patch a group by it's Id */
    patch: operations["patchGroupsById"];
  };
  "/groups": {
    /** Get a list of all the groups */
    get: operations["getGroups"];
    /** Create a new group */
    post: operations["createGroup"];
  };
  "/groups/invitation/response": {
    /** Respond to a group invitation */
    post: operations["responseGroupInvitation"];
  };
  "/groups/invitation/send": {
    /** Invite a musician in a group */
    post: operations["sendGroupInvitation"];
  };
  "/groups/{groupId}/kick/{musicianId}": {
    /** Kick a member from a group */
    delete: operations["groupKickMusician"];
  };
  "/info": {
    /** Return the basic information of the app */
    get: operations["getApplicationInfo"];
  };
  "/instruments": {
    get: operations["getInstruments"];
  };
  "/musicians/{musicianId}/groups/{groupId}/membership": {
    /** Get the membership of a musician in a group */
    get: operations["getMusicianGroupMembership"];
  };
  "/musicians/{musicianId}": {
    /** Get a musician information by it's ID */
    get: operations["getMusicianById"];
  };
  "/musicians": {
    get: operations["getMusicians"];
  };
  "/profil/notifications/{notificationId}": {
    /** Delete a notification by its id */
    delete: operations["deleteNotificationById"];
  };
  "/profil/notifications": {
    /** Get all the notications of the user */
    get: operations["getNotifications"];
  };
  "/profil": {
    /** Get the user connected profil */
    get: operations["getProfil"];
    delete: operations["deleteProfil"];
    patch: operations["patchProfil"];
  };
  "/profil/groups/{groupId}/leave": {
    /** Leave a group */
    post: operations["leaveGroup"];
  };
}

export interface components {
  schemas: {
    musician: {
      id: string;
      /** Format: email */
      email: string;
      givenName: string;
      familyName: string;
      description?: string | null;
      phone?: string | null;
      facebook_url?: string | null;
      twitter_url?: string | null;
      instagram_url?: string | null;
      isLookingForGroups?: boolean;
      promotion: "L1" | "L2" | "L3" | "M1" | "M2";
      location: "Douai" | "Lille";
      instruments: components["schemas"]["instrument"][];
      genres: components["schemas"]["genre"][];
    };
    musicianMinimized: {
      id: string;
      /** Format: email */
      email: string;
      givenName: string;
      familyName: string;
      phone?: string | null;
      facebook_url?: string | null;
      twitter_url?: string | null;
      instagram_url?: string | null;
      promotion: "L1" | "L2" | "L3" | "M1" | "M2";
      location: "Douai" | "Lille";
    };
    group: {
      id: string;
      name: string;
      description: string;
      location: "Douai" | "Lille";
      genres: components["schemas"]["genre"][];
      members: components["schemas"]["groupMember"][];
    };
    groupDescription: {
      name: string;
      description: string;
      location: "Douai" | "Lille";
      genres: components["schemas"]["genre"][];
    };
    groupMember: {
      musician?: components["schemas"]["musicianMinimized"];
      instruments?: components["schemas"]["instrument"][];
      membership?: "admin" | "member" | "declined" | "pending" | "lite_admin";
    };
    instrument: {
      id: string;
      name: string;
    };
    genre: {
      id: string;
      name: string;
    };
    event: {
      id?: string;
      name: string;
      description: string;
      /** Format: date-time */
      startDate: Date;
      /** Format: date-time */
      endDate: Date;
      adress: string;
      genres: components["schemas"]["genre"][];
      groups: components["schemas"]["groupDescription"][];
      admins: components["schemas"]["musicianMinimized"][];
    };
    token: {
      accessToken: string;
      refreshToken: string;
    };
    httpError: {
      msg: string;
      stack?: string;
    };
    _links: {
      self: string;
      first: string;
      previous?: string;
      next?: string;
    };
    notification: {
      type: string;
      /** Format: date-time */
      created_at: Date;
      group?: components["schemas"]["groupDescription"];
      membership?: "admin" | "member" | "declined" | "pending" | "lite_admin";
    };
  };
}

export interface operations {
  login: {
    responses: {
      /** Login successful */
      200: {
        content: {
          "application/json": {
            token: components["schemas"]["token"];
            musician: components["schemas"]["musician"];
          };
        };
      };
      /** The user is not find */
      400: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** invalid password */
      401: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          /** Format: email */
          email: string;
          password: string;
        };
      };
    };
  };
  /** Logout the current user */
  logout: {
    responses: {
      /** All the token has been deleted */
      200: {
        content: {
          "application/json": string;
        };
      };
    };
  };
  /** Send a new access token */
  postRefreshToken: {
    responses: {
      /** a new access token */
      200: {
        content: {
          "application/json": {
            accessToken: string;
          };
        };
      };
      /** Invalid refresh token */
      401: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          refreshToken: string;
        };
      };
    };
  };
  register: {
    responses: {
      /** The user has been registered in the db */
      201: {
        content: {
          "application/json": {
            token: components["schemas"]["token"];
            musician: components["schemas"]["musician"];
          };
        };
      };
      /** The user already exist */
      409: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          /** Format: email */
          email: string;
          givenName: string;
          familyName: string;
          phone?: string | null;
          facebookUrl?: string | null;
          twitterUrl?: string | null;
          instagramUrl?: string | null;
          promotion: "L1" | "L2" | "L3" | "M1" | "M2";
          location: "Douai" | "Lille";
          instruments: components["schemas"]["instrument"][];
          genres: components["schemas"]["genre"][];
          password: string;
        };
      };
    };
  };
  /** Add a musician as an admin of an event */
  addEventAdmin: {
    responses: {
      /** The musician has been added to the event's admins */
      200: {
        content: {
          "application/json": components["schemas"]["event"];
        };
      };
      /** The user does not have the right */
      403: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** The event or the musician does not exist */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          eventId: string;
          musicianId: string;
        };
      };
    };
  };
  /** Get an event by his Id */
  getEventById: {
    parameters: {
      path: {
        /** The ID of the event */
        eventId: string;
      };
    };
    responses: {
      /** The event information */
      200: {
        content: {
          "application/json": components["schemas"]["event"];
        };
      };
      /** The event does not exist */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  /** Delete an event by his Id */
  deleteEventById: {
    parameters: {
      path: {
        /** The ID of the event */
        eventId: string;
      };
    };
    responses: {
      /** The event has been deleted */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** The user does not have the right */
      403: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** The event does not exist */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  /** Modify an event info */
  patchEventById: {
    parameters: {
      path: {
        /** The ID of the event */
        eventId: string;
      };
    };
    responses: {
      /** The event has been modified */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** The user does not have the right */
      403: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** The event does not exist */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          name?: string;
          description?: string;
          /** Format: date-time */
          startDate?: Date;
          /** Format: date-time */
          endDate?: Date;
          adress?: string;
          genres?: components["schemas"]["genre"][];
        };
      };
    };
  };
  /** Get a list of all the events */
  getEvents: {
    parameters: {
      query: {
        /** The query filter for the event name */
        name?: string;
        /** The query filter for the event genre */
        genres?: string[];
        /** The query filter for the event startDate */
        startdate?: Date;
        /** The query filter for the event endDate */
        enddate?: Date;
        /** The start index of the query */
        start?: number;
        /** The number of events returned */
        limit?: number;
      };
    };
    responses: {
      /** A list of all the events */
      200: {
        content: {
          "application/json": {
            _links: components["schemas"]["_links"];
            results: components["schemas"]["event"][];
            size: number;
            limit: number;
            total: number;
            start: number;
          };
        };
      };
    };
  };
  /** Post a new event */
  postEvents: {
    responses: {
      /** The event has been created */
      201: {
        content: {
          "application/json": components["schemas"]["event"];
        };
      };
      /** The Event already exist */
      409: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          id?: string;
          name: string;
          description: string;
          /** Format: date-time */
          startDate: Date;
          /** Format: date-time */
          endDate: Date;
          adress: string;
          genres: components["schemas"]["genre"][];
        };
      };
    };
  };
  /** Delete a group from an event */
  eventKickGroup: {
    parameters: {
      path: {
        /** The ID of the event */
        eventId: string;
        /** The ID of the group to kick */
        groupId: string;
      };
    };
    responses: {
      /** The musician has been kicked from the group */
      204: {
        content: {
          "application/json": string;
        };
      };
      /** The user does not have the right */
      403: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** The musician is not in the group */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  /** Get a list of all genres */
  getGenres: {
    responses: {
      /** A list of all genres */
      200: {
        content: {
          "application/json": components["schemas"]["genre"][];
        };
      };
    };
  };
  /** Transfer the admin membership to another member */
  transferGroupAdmin: {
    parameters: {
      path: {
        /** The ID of the group */
        groupId: string;
        /** The ID of the musician that will become the admin */
        musicianId: string;
      };
    };
    responses: {
      /** The admin membership has been transfered */
      204: {
        content: {
          "application/json": string;
        };
      };
      /** The user does not have the right */
      403: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** The musician is not a member of the group */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  /** Give a group member the lite_admin membership */
  addGroupLiteAdmin: {
    parameters: {
      path: {
        /** The ID of the group */
        groupId: string;
        /** The ID of the musician that receive lite_admin membership */
        musicianId: string;
      };
    };
    responses: {
      /** The musician became a lite_admin */
      204: {
        content: {
          "application/json": string;
        };
      };
      /** The user does not have the right */
      403: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** The musician is not a member of the group */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  /** Remove a group member the lite_admin membership */
  removeGroupLiteAdmin: {
    parameters: {
      path: {
        /** The ID of the group */
        groupId: string;
        /** The ID of the musician that receive lite_admin membership */
        musicianId: string;
      };
    };
    responses: {
      /** The lite_admin membership has been removed from the group member */
      204: {
        content: {
          "application/json": string;
        };
      };
      /** The user does not have the right */
      403: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** The musician is not a lite_admin of the group */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  /** Give a group member the lite_admin membership */
  addGroupLiteAdmins: {
    parameters: {
      path: {
        /** The ID of the group */
        groupId: string;
      };
    };
    responses: {
      /** The musician became a lite_admin */
      204: {
        content: {
          "application/json": string;
        };
      };
      /** The user does not have the right */
      403: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** The musician is not a member of the group */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          lite_admins: string[];
        };
      };
    };
  };
  /** A group joins an event */
  groupJoinEvent: {
    responses: {
      /** The group has joined the event */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** The group or event does not exist */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          groupId?: string;
          eventId?: string;
        };
      };
    };
  };
  /** Get a group information by it's Id */
  getGroupsById: {
    parameters: {
      path: {
        /** The ID of the group */
        groupId: string;
      };
    };
    responses: {
      /** The group information */
      200: {
        content: {
          "application/json": components["schemas"]["group"];
        };
      };
      /** The group does not exist */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  /** Delete a group by it's Id */
  deleteGroupsById: {
    parameters: {
      path: {
        /** The ID of the group */
        groupId: string;
      };
    };
    responses: {
      /** The group has been deleted */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** The user does not have the right */
      403: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** The group does not exist */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  /** Patch a group by it's Id */
  patchGroupsById: {
    parameters: {
      path: {
        /** The ID of the group */
        groupId: string;
      };
    };
    responses: {
      /** The group has been deleted */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** The user does not have the right */
      403: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** The group does not exist */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          name?: string;
          description?: string;
          location?: "Douai" | "Lille";
          genres?: components["schemas"]["genre"][];
        };
      };
    };
  };
  /** Get a list of all the groups */
  getGroups: {
    parameters: {
      query: {
        /** The query filter for the group name */
        name?: string;
        /** The query filter for the group location */
        location?: string[];
        /** The query filter for group genre */
        genres?: string[];
        /** The start index of the query */
        start?: number;
        /** The number of groups returned */
        limit?: number;
      };
    };
    responses: {
      /** An array of groups */
      200: {
        content: {
          "application/json": {
            _links: components["schemas"]["_links"];
            results: components["schemas"]["group"][];
            size: number;
            limit: number;
            total: number;
            start: number;
          };
        };
      };
    };
  };
  /** Create a new group */
  createGroup: {
    responses: {
      /** The group has been created */
      201: {
        content: {
          "application/json": components["schemas"]["group"];
        };
      };
      /** The group already exist */
      409: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          group: components["schemas"]["groupDescription"];
          instruments: components["schemas"]["instrument"][];
        };
      };
    };
  };
  /** Respond to a group invitation */
  responseGroupInvitation: {
    responses: {
      /** The user membershhip has been updated */
      201: {
        content: {
          "application/json": string;
        };
      };
      /** The user has already responded */
      400: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** User can't respond to this invitation */
      401: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          groupId: string;
          response: "declined" | "member";
        };
      };
    };
  };
  /** Invite a musician in a group */
  sendGroupInvitation: {
    responses: {
      /** The user has been invited */
      201: {
        content: {
          "application/json": string;
        };
      };
      /** The user is already invited */
      400: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** User that invite doesn't have the access */
      401: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          groupId: string;
          musicianId: string;
          instrumentId: string;
          role: "lite_admin" | "member";
        };
      };
    };
  };
  /** Kick a member from a group */
  groupKickMusician: {
    parameters: {
      path: {
        /** the Id of the group */
        groupId: string;
        /** the Id of the musician to kick */
        musicianId: string;
      };
    };
    responses: {
      /** The musician has been kicked from the group */
      204: {
        content: {
          "application/json": string;
        };
      };
      /** The user does not have the right */
      403: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** The musician is not in the group */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  /** Return the basic information of the app */
  getApplicationInfo: {
    responses: {
      /** The basic information about the app */
      200: {
        content: {
          "application/json": {
            nbMusician?: number;
            nbGroups?: number;
            nbEvents?: number;
          };
        };
      };
    };
  };
  getInstruments: {
    responses: {
      /** A list of all the instruments */
      200: {
        content: {
          "application/json": components["schemas"]["instrument"][];
        };
      };
    };
  };
  /** Get the membership of a musician in a group */
  getMusicianGroupMembership: {
    parameters: {
      path: {
        /** The ID of the muscician */
        musicianId: string;
        /** The ID of the group */
        groupId: string;
      };
    };
    responses: {
      /** The membership of the musician */
      200: {
        content: {
          "application/json": {
            membership: string;
          };
        };
      };
      /** The group or musician does not exist */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  /** Get a musician information by it's ID */
  getMusicianById: {
    parameters: {
      path: {
        /** The ID of the muscician */
        musicianId: string;
      };
    };
    responses: {
      /** The group information */
      200: {
        content: {
          "application/json": components["schemas"]["musician"] & {
            groups: components["schemas"]["groupDescription"][];
          };
        };
      };
      /** The group does not exist */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  getMusicians: {
    parameters: {
      query: {
        /** The query filter for name */
        name?: string;
        /** The query filter for genre */
        genres?: string[];
        /** The query filter for instruments */
        instruments?: string[];
        /** The query filter for location */
        location?: string[];
        /** The query filter for promotion */
        promotion?: string[];
        /** The start index of the query */
        start?: number;
        /** The number of musicians returned */
        limit?: number;
      };
    };
    responses: {
      /** A list of all the musicians informations */
      200: {
        content: {
          "application/json": {
            _links: components["schemas"]["_links"];
            results: components["schemas"]["musician"][];
            size: number;
            limit: number;
            start: number;
            total: number;
          };
        };
      };
    };
  };
  /** Delete a notification by its id */
  deleteNotificationById: {
    parameters: {
      path: {
        /** the id of the notification */
        notificationId: string;
      };
    };
    responses: {
      /** The notification has been deleted */
      204: {
        content: {
          "application/json": string;
        };
      };
      /** The notification does not exist */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
  };
  /** Get all the notications of the user */
  getNotifications: {
    responses: {
      /** The user profil information */
      200: {
        content: {
          "application/json": components["schemas"]["notification"][];
        };
      };
    };
  };
  /** Get the user connected profil */
  getProfil: {
    responses: {
      /** The user profil information */
      200: {
        content: {
          "application/json": components["schemas"]["musician"] & {
            groups: {
              instruments?: components["schemas"]["instrument"][];
              membership?:
                | "admin"
                | "member"
                | "declined"
                | "pending"
                | "lite_admin";
              group?: components["schemas"]["groupDescription"];
            }[];
          };
        };
      };
    };
  };
  deleteProfil: {
    responses: {
      /** The musician information has been updated */
      200: {
        content: {
          "application/json": string;
        };
      };
    };
  };
  patchProfil: {
    responses: {
      /** The musician information has been updated */
      200: {
        content: {
          "application/json": string;
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          givenName?: string;
          familyName?: string;
          phone?: string;
          facebook_url?: string;
          twitter_url?: string;
          instagram_url?: string;
          promotion?: "L1" | "L2" | "L3" | "M1" | "M2";
          location?: "Douai" | "Lille";
          genres?: components["schemas"]["genre"][];
          instruments?: components["schemas"]["instrument"][];
        };
      };
    };
  };
  /** Leave a group */
  leaveGroup: {
    parameters: {
      path: {
        /** The id of the group to leave */
        groupId: string;
      };
    };
    responses: {
      /** The user have leaved the group */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** The body is required for an admin leaving an event */
      400: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
      /** This user is not in this group */
      404: {
        content: {
          "application/json": components["schemas"]["httpError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": {
          /** @description The id of the musician that will become the new admin of the group, only if it's the admin that is leaving the group */
          musicianId?: string;
        };
      };
    };
  };
}

export interface external {}
