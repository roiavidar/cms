var http = require('http');
var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var express = require('express');
var router = express();
var server = http.createServer(router);
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies
router.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

router.post('/save', function(req, res) {
  var data = req.body;
  var fileMeta = JSON.parse(data.fileMeta);
  var newProject = data.newProject;
  fs.readFileAsync("projects/metaProjects", 'utf8').then(function(data) {
    var projectsData = JSON.parse(data);
    if (newProject) { // create new project
      if (projectsData[fileMeta.projectName] === undefined) {
        projectsData[fileMeta.projectName] = fileMeta.tags;
        return fs.writeFileAsync("projects/metaProjects", projectsData.stringify()).then(function(error) {
          if (error) {
            res.send(500);
          }
          fs.writeFileAsync("projects/" + fileMeta[fileName], data.json).then(function(errorCallback()) {
            if (error) {
              req.send(500);
            }
            else {
              req.send(200);
            }
          });
        });
      }
      else {
        req.send(400);
      }
    }
    else { //edit existing project
      if (projectsData[fileMeta.projectName] === undefined) { // project name changed
        return fs.rename('projects/' + data.currentProjectName, 'projects/' + projectsData[fileMeta.projectName]).then(function(error) {
          if(error) {
            res.send(500);
          } 
          
          return fs.writeFileAsync('projects/' + projectsData[fileMeta.projectName], data.json).then(function(errorCallback() {
            if(error) {
              req.send(500);
            }
            // check if already exist??
            projectsData[fileMeta.projectName] = fileMeta.tags;
            delete projectsData[data.currentProjectName];
            return fs.writeFileAsync("projects/metaProjects", projectsData.stringify();
          }))
          
        })
      }
      else { //project name didnt changes
        projectsData[fileMeta.projectName] = fileMeta.tags;
        return fs.writeFileAsync("projects/metaProjects", projectsData.stringify()).then(function(error) {
          if (error) {
            res.send(500);
          }
          fs.writeFileAsync("projects/" + fileMeta[fileName], data.json).then(function(errorCallback()) {
            if (error) {
              req.send(500);
            }
            else {
              req.send(200);
            }
          });
        });
      }
    }
  });
});
