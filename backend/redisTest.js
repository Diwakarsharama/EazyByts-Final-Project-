const redis = require("redis");

const client = redis.createClient({
  url: "redis://default:yourpassword@redis-14479.c301.ap-south-1-1.ec2.cloud.redislabs.com:14479",
});

client.on("connect", () => {
  console.log("✅ Redis Connected Successfully!");
});

client.on("error", (err) => {
  console.error("❌ Redis Connection Error:", err);
});

client.connect();
