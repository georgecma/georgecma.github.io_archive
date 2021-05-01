const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'personal_website',
    password: env.DB_PASSWORD || 'nothing_personal',
    database: env.DB_NAME || 'chatroom_messages',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;