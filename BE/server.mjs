//git test
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { Octokit, App } from "octokit";
// import { Action } from "octokit";

dotenv.config();
const app = express();
const port = 4568;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });
// // in case login testing is needed.
// const {
//     data: { login },
//   } = await octokit.rest.users.getAuthenticated();
// console.log("Hello, %s", login);

const date = new Date(); 
const printDate =()=> console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
  // console.log(process.env.GITHUB_PERSONAL_ACCESS_TOKEN);

// bea07f0ab08135e2be4e2660316e54911030974a

app.post('/', (req, res) => {
  // console.log(req.body.number);
  // console.log(req.body.pull_request.number);
  printDate();
  if (req.header("X-Github-Event")) {
    console.log(req.header("X-Github-Event"));
    switch (req.header("X-Github-Event")){
      //new branch created
      case "push":
        console.log(`PUSH, X-Github-Event:${req.header("X-Github-Event")}` );
        // console.log(`GET /repos/${req.body.repository.owner.name}/${req.body.repository.name}/commits/${req.body.ref}`);
        let getSomething = async()=> {
          let list = await octokit.request(`GET /repos/${req.body.repository.owner.name}/${req.body.repository.name}/commits/${req.body.ref}`);
          console.log(JSON.stringify(list, null, 2));
        }
        getSomething();
      
        break;
        
      case "create":
        console.log(`CREATE, X-Github-Event:${req.header("X-Github-Event")}` );
        break;
        
      case "ping":
        console.log(`PING, X-Github-Event:${req.header("X-Github-Event")}` );
        break;
          
    default:
        console.log("unhandled event type");
      }
  }else {
    console.log("event not recognized.");
  }
    res.sendStatus(200);
});
// app.post('/payload-test, (req, res) => {
//     console.log('Got body /payload-test:', req.body);
//     res.sendStatus(200);
// });
// app.post('/payload', (req, res) => {
//     console.log('Got body /payload:', req.body);
//     res.sendStatus(200);
// });

app.listen(port, () => console.log(`Started server at http://localhost:${port}!`));
