const express = require("express");
const db = require("./database");
const app = express();
const port = process.env.PORT || 80

app.use(express.json());


app.get("/", function (req, res) {
    const message = "Ogbeni better send this request somewhere else!";
	res.status(200).send(message);
});

//CREATE
app.post("/users", function (req, res) {
  const query = "INSERT INTO users (email, password, business_name, business_phone) VALUES ?";
  const values = [req.body];

  db.query(query, values, function (err, result) {
    if (err) throw err;
    const create_user = { id: result.insertId, email: values[0], email: password[1] , business_name: values[2] , business_phone: values[3] };
    res.status(200).send(create_user);
  });
});

//READ
app.get("/users", function (req, res) {
  const query = "SELECT * FROM users";

  db.query(query, function (err, result) {
    if (err) throw err;
    const read_user = result;
    res.status(200).send(read_user);
  });
});

app.listen(port, () => console.log(`Running server on port ${port}`));
