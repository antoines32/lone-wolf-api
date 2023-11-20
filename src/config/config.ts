export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongoConnection: process.env.DATABASE_CONN_STRING,
  secretKey: 'secretKey',
});
