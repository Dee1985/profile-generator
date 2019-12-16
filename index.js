// JS assistanace from peers Jesse Edwards, Ryan Ellingson, TA Brian Bloomquist, and friend Andy Park(github username: atparkweb)
// styling guidance from peers Jacke O'Toole and Jesse Edwards,

const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const html_Pdf = require("pdf-puppeteer");

inquirer
  .prompt([
    {
      message: "Enter GitHub username",
      name: "username"
    },
    {
      message: "What is your favorite color?",
      name: "color"
    }
  ])
  .then(function({ username, color }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(response) {
      let userPic = response.data.avatar_url;
      let location = response.data.location;
      let userUrl = response.data.html_url;
      let userBlog = response.data.blog;
      let userBio = response.data.bio;
      let userRepos = response.data.public_repos;
      let userFollowers = response.data.followers;
      let usersFollowing = response.data.following;

      axios
        .get(`https://api.github.com/users/${username}`)
        .then(function(response) {
          const newHtml = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>${username}'s Resume</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            </head>
            <body>
                <div class="container">
                    <div class="row my-5">
                        <div class="col-12">
                            <div class="card text-center">
                                <img src="${userPic}" class="card-img-top mx-auto" alt="Profile pic" style="width: 18rem;">
                                <div class="card-body">
                                    <p class="card-text" style="font-size: 36px;">${username}</p>
                                    <p class="card-text" style="font-size: 22px;">${location}</p
                                    <p class="card-text" style="font-size: 24px;">${userBio}</p
                                    <a class="card-link" href="${userUrl}">GitHub</a>
                                    <a class="card-link" href="${userBlog}">Blog</a>
                                </div>
                              </div>
                        </div>
                    </div>
                    <div class="card" style="width: 100%;">
                    <div class="card-header text-center">
                      <h4> Github: At a Glance </h4>
                    </div>
                    <div class="card text-center">
                    <ul class="list-group list-group-flush" id="card2">
                      <li class="list-group-item">Public Repositories: ${userRepos}</li>
                      <li class="list-group-item">Followers: ${userFollowers} </li>
                      <li class="list-group-item">Following: ${usersFollowing}</li>
                    </ul>
                  </div>                  
                <style type="text/css">
                    body {
                    background-color: white;
                    -webkit-print-color-adjust: exact !important;
                    }
                    img {
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 5px;
                    width: 150px;
                  }
                    .card {
                        background-color: ${color}; 
                        color: white;
                    }
                    .card-link {
                        color: white;
                    }
                    .li {
                      background-color: white; 
                      width: 100%;
                    }
                    #card2 {
                      color:${color};
                      width: 100%;
                    }
                </style>
            </body>
            </html>`;

          fs.writeFile("profile.html", newHtml, function(err) {
            if (err) throw err;
          });
        });
    });
  });
