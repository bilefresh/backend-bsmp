const express = require("express");
const db = require("./database");
const app = express();
const port = process.env.PORT || 80

app.use(express.json());


app.get("/", function (req, res) {
    const message = "Ogbeni better send this request somewhere else!";
	res.status(200).send(message);
});

//SIGN UP
app.post("/users/signup", function (req, res) {
	// console.log(req.body.email, req.body.password, req.body.business_name, req.body.business_phone);
  const query = "INSERT INTO users (email, password, business_name, business_phone) VALUES (?,?,?,?)";
  const values = [req.body.email, req.body.password, req.body.business_name, req.body.business_phone];

  db.query(query, values, function (err, result) {
    if (err) throw err;
    const create_user = { id: result.insertId, email: values[0], password: values[1] , business_name: values[2] , business_phone: values[3] };
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

//LOGIN
app.post("/users/login", function (req, res) {
	
  const query = "SELECT password FROM users WHERE ?";
  const password = req.body.password;
  const value = {"email": req.body.email};
  // db.query(query, value, function (err, result) {
  // if (err) console.log(err);
  // console.log(result);});
  // console.log(tt);
  db.query(query, value, function (err, result) {
    if (err) {
		console.log(err);
		res.send("Incorrect email or password"); 
		throw err;
	}
	else{
		console.log(result);
		if (result == password){
			res.status(200).send("User Authenticated");
		}
	}
  });
});

//LOGIN
// app.post("/login", function (req, res) {
  // const query = "SELECT password FROM users WHERE email=?";
  // const password = req.body.password;
  // const value = req.body.email;

  // result = db.query(query, value, function (err, result) {
    // if (err) {
		// res.send("Incorrect email or password"); 
		// throw err;
  // });
  // if result == password{
	  // res.status(200).send("User Authenticated");
// });

app.listen(port, () => console.log(`Running server on port ${port}`));
