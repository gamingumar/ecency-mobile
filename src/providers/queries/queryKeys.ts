const QUERIES = {
  DRAFTS: {
    GET: 'QUERY_GET_DRAFTS',
  },
  SCHEDULES: {
    GET: 'QUERY_GET_SCHEDULES',
  },
  NOTIFICATIONS: {
    GET: 'QERUY_GET_NOTIFICATIONS',
  },
  SNIPPETS: {
    GET: 'QUERY_GET_SNIPPETS',
  },
  MEDIA: {
    GET: 'QUERY_GET_UPLOADS',
  },
  WALLET: {
    GET: 'QUERY_GET_ASSETS',
    UNCLAIMED_GET: 'QUERY_GET_UNCLAIMED',
    GET_ACTIVITIES: 'QUERY_GET_ACTIVITIES',
    GET_PENDING_REQUESTS: 'GET_PENDING_REQUESTS',
  },
  POST: {
    GET: 'QUERY_GET_POST',
    GET_DISCUSSION: 'QUERY_GET_DISCUSSION',
  },
  LEADERBOARD: {
    GET: 'QUERY_GET_LEADERBOARD',
  },
  WAVES: {
    GET: 'QUERY_GET_WAVES',
    INITIAL_CONTAINERS: 'QUERY_DATA_INITIAL_CONTAINERS'
  }
};

export default QUERIES;
