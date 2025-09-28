const express = require("express");
const crypto = require("crypto");

const app = express();
const SECRET = process.env.SECRET || "replace-with-random-secret"; 

function generateCode() {
  const timeStep = 30;
  const counter = Math.floor(Date.now() / 1000 / timeStep);

  const hmac = crypto.createHmac("sha1", SECRET);
  hmac.update(String(counter));
  const digest = hmac.digest("hex");

  const code = parseInt(digest, 16).toString().slice(0, 6);
  return code;
}

app.get("/code", (req, res) => {
  const code = generateCode();
  const timeStep = 30;
  const remaining = timeStep - (Math.floor(Date.now() / 1000) % timeStep);
  res.json({ code, validFor: remaining });
});

// IMPORTANT: use process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
