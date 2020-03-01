var friend = require("../data/friend");

module.exports = function (app) {
  app.get("/api/friend", function (req, res) {
    res.json(friend);
  });

  app.post("/api/friend", function (req, res) {
    var totalDiff = 0;

    var comp = {
      name: "",
      photo: "",
      friendDiff: 1000
    };

    var userData = req.body;
    var userName = userData.name;
    var userScores = userData.scores;

    var b = userScores.map(function (item) {
      return parseInt(item, 10);
    });
    userData = {
      name: req.body.name,
      photo: req.body.photo,
      scores: b
    };

    console.log("Name: " + userName);
    console.log("User Score " + userScores);

    var sum = b.reduce((a, b) => a + b, 0);

    console.log("Sum of users score " + sum);
    console.log("Best match friend diff " + comp.friendDiff);
    console.log("+++++++=================++++++++++");

    for (var i = 0; i < friend.length; i++) {
      console.log(friend[i].name);
      totalDiff = 0;
      console.log("Total Diff " + totalDiff);
      console.log("Best match friend diff " + comp.friendDiff);

      var bfriendScore = friend[i].scores.reduce((a, b) => a + b, 0);
      console.log("Total friend score " + bfriendScore);
      totalDiff += Math.abs(sum - bfriendScore);
      console.log("-------------------------> " + totalDiff);

      if (totalDiff <= comp.friendDiff) {
        comp.name = friend[i].name;
        comp.photo = friend[i].photo;
        comp.friendDiff = totalDiff;
      }
      console.log(totalDiff + " Total Difference");
    }
    console.log(comp);

    friend.push(userData);
    console.log("New user added");
    console.log(userData);
    res.json(comp);
  });
};
