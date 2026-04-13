const express = require("express");
const cors = require("cors");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const app = express();
app.use(cors());

const APP_ID = "cbbdf1a7dfb547d38eb434fed80dc7fc";
const APP_CERTIFICATE = "6021f7f417da4e0aa39d088700c055b0";

app.get("/token", (req, res) => {
  const channel = req.query.channel;
  const uid = parseInt(req.query.uid);

  if (!channel) {
    return res.status(400).json({ error: "Channel required" });
  }

  const role = RtcRole.PUBLISHER;
  const expireTime = 3600; // 1 hour
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channel,
    uid,
    role,
    privilegeExpireTime
  );

  return res.json({ token });
});

app.listen(3000, () => {
  console.log("🔥 Token Server running on http://localhost:3000");
});