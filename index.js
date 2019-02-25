'use strict';

function getGitHubRepo(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  
 const options = {
   headers: new Headers({
      Accept: "application/vnd.github.v3+json"})
  };

  console.log(`Finding repos for ${username}`);

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  
  console.log(responseJson);
   // if there are previous results, remove them
  $("#repo-list").empty();

  // for each repo listed, add a link to it in DOM  
  responseJson.forEach(obj =>
    $("#repo-list").append(
      `<li><a href='${obj.url}'>${obj.name}</a></li>`
    )
  );
  // set the username equal to the search value
  $("#username").text(`${username}`);

  // display the results section
  $("#results").removeClass("hidden");
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const username = $("#js-search-user").val();
    getGitHubRepo(username);
  });
}

$(watchForm);