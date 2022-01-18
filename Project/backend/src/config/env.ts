export default () => ({
  db: {
    port: parseInt(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST || 'localhost',
    schema: process.env.DB_SCHEMA || 'winer',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
  },
});
