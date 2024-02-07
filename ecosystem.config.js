module.exports = {
    apps : [{
      name   : "backend",
      script : "ts-node ./server.ts",
      env_production : {
      NODE_ENV: "production"
  }
    }]
  }