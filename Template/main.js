/*

matchId, player1, player2, date 

player1{
  name, img, prob,
}

*/

$(document).ready(() => {
  console.log('OKE');

  // const resultContainer = $('.result-matches-container');
  getPastMatches();
  getUpcomingMatches();
});



const getPastMatches = () => {
  const resultContainer = $('.result-matches-container');

  const getMoreCommentsUrl = `http://127.0.0.1:8050/api/pastresult?page=0&pageSize=5`;
  $.ajax({
    url: getMoreCommentsUrl,
    // headers: {
    //   [header]: token,
    // },
    processData: false,
    contentType: false,
    type: 'GET',
    success: function (data) {
      const matches = data.content;

      const html = matches.map(
        ({
          id,
          date,
          player1,
          player2,
          surface,
          tourney_name,
          tourney_level,
          winner_id
        }) => {
          return resultMatchTemplate(id, player1, player2, date, winner_id);
        }
      );
      console.log(html);
      resultContainer.append(html);
    },
    error: function (err) {
      // showError('Email already existed');
      console.log(err);
    },
  });
};

const getUpcomingMatches = () => {
  const fixtureContainer = $('.fixture-matches-container');
  const getMoreCommentsUrl = `http://127.0.0.1:8050/api/upcoming?page=0&pageSize=5`;
  $.ajax({
    url: getMoreCommentsUrl,
    // headers: {
    //   [header]: token,
    // },
    processData: false,
    contentType: false,
    type: 'GET',
    success: function (data) {
      const matches = data.content;
      const html = matches.map(
        ({
          id,
          date,
          player1,
          player2,
          surface,
          tourney_name,
          tourney_level,
        }) => {
          console.log(player1, player2);
          return fixtureMatchTemplate(id, player1, player2, date);
        }
      );
      console.log(html);
      fixtureContainer.append(html);
    },
    error: function (err) {
      // showError('Email already existed');
      console.log(err);
    },
  });
}