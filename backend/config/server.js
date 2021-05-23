module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '089bf0afd45cf85a3b30c6ef6cd918de'),
    },
  },
  cron: {
    enabled: true
  }
});
