app.get("/profile", (req, res) => {
  res.send("profile");
});


app.post("/profile", (req, res) => {
  const user = user;
  if (user) {
    const templateVars = {
     items: items[req.items],
     user: users[req.users]
    }
    return res.render("profiles", templateVars);
  }
});
