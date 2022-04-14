const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const twilio = require("twilio");

app.use(cors());
app.use(express.json());

app.post("/sms-send", async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const client = new twilio(
      "ACf3bd7cfbfb9817f1c3a9dfbcc31ce6b6",
      "3dc7b00dc152096f8e75b45069387946"
    );
    const message_id = [];
    for (number of receiver) {
      await client.messages
        .create({
          body: message,
          to: number,
          from: sender,
        })
        .then((message) => {
          console.log(message.sid);
          if (message.sid) {
            message_id.push(message.sid);
          }
        });
    }
    res.json({
      status: 200,
      message: "Message Sent Successfully",
      messageIds: message_id,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ status: 400, message: "Message Sent Failed" });
  }
});

app.get("/", (req, res) => {
  res.send("SMS Sender Application Server");
});

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
