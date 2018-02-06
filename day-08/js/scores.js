function getTopScore() {
  var scoresRef = firebase.database().ref('/scores');
  var scoresQuery = scoresRef.orderByChild('score').limitToLast(10);
  return scoresQuery.once('value').then(function(data) {
    var entries = data.val();
    Object.entries(entries).forEach(entry => {
      var id = entry[0];
      var scoreObj = entry[1];
      console.log(scoreObj.name, scoreObj.score);
    });
  });
}

function writeScore(name, score) {
  var randId = getRandomNumber(1, 10000);
  firebase
    .database()
    .ref('scores/' + randId)
    .set({
      name: name,
      score: score
    });
}
