// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCaXZhh4X3jvsQsIp2FDCZ7-JXQVl6OrcA',
  authDomain: 'koodikerho-snake.firebaseapp.com',
  databaseURL: 'https://koodikerho-snake.firebaseio.com',
  projectId: 'koodikerho-snake',
  storageBucket: '',
  messagingSenderId: '97260963832'
};
firebase.initializeApp(config);

function getTopScores() {
  var scoresRef = firebase.database().ref('/scores');
  var scoresQuery = scoresRef.orderByChild('score').limitToLast(10);

  return scoresQuery.once('value').then(function(data) {
    var entries = data.val();
    var topScoresList = document.querySelector('.top-scores');
    topScoresList.innerHTML = '';
    Object.entries(entries).forEach(entry => {
      var id = entry[0];
      var scoreObj = entry[1];
      console.log(scoreObj.name, scoreObj.score);
      var li = document.createElement('li');
      li.innerHTML = scoreObj.name + ': ' + scoreObj.score;
      topScoresList.appendChild(li);
    });
  });
}

function writeScore(name, score) {
  var scoreRef = firebase.database().ref('/scores');
  var newScoreRef = scoreRef.push();
  newScoreRef.setWithPriority(
    {
      name: name,
      score: score
    },
    -score
  );
}

getTopScores();

firebase
  .database()
  .ref('/scores')
  .on('child_added', function(data) {
    getTopScores();
  });
