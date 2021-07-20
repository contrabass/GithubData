import {} from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { Octokit, App } from "octokit";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import pick from'prop-pick';
import cors from 'cors';
import convert from 'object-array-converter';
import knex from 'knex/knex.js';
import pg from 'pg';

// if (process.env.NODE_ENV === 'production') {
//   pg.defaults.ssl = true;
// }

const determineDbConfig =()=> { 
  return(
    {
      client: 'pg', connection: (
        ()=> {
          switch (process.env.NODE_ENV) {
            
            case "production":
              console.log(process.env.DATABASE_URL);
              return process.env.DATABASE_URL;
              
            default:
              return {
                user: process.env.PG_USER /* 'postgres' */,
                password: process.env.PG_PASSWORD /* null */,
                host: process.env.PG_HOST /* '127.0.0.1' */,
                database: process.env.PG_DATABASE /* 'github_dashboard' */,
                port: process.env.PG_PORT /* '5432' */
                }
          }
        }
      )()
    }
  )
};
const dbConfig = determineDbConfig();
console.log(dbConfig);
console.log("00000000000000000000");

// console.log("!!!", determineDbConfig());
// console.log("Database name: ", db.connection( process.env.PG_DATABASE )._connection);

(async()=>{
  try {
    const db = knex(dbConfig);
    let eventsMissing = ! await db.schema.hasTable('events');
    console.log("events is missing: ",eventsMissing);
    if (eventsMissing) {
      await db.schema.createTable(
        'events', (table) => {
          table.text('headers');
          table.jsonb ('webhook_payload');
          table.jsonb ("api_event");
          table.text ("ref")
          .unique()
          .notNullable();
        }
        )
      }
      eventsMissing = ! await db.schema.hasTable('events');
      console.log("events is missing: ",eventsMissing);
      db.destroy();
    } catch (err) {
      console.log(err);
    }
  })();
  
// console.log(db.connection( process.env.PG_DATABASE ).hasTable("events"));
// console.log(db);

// const proConfig = {
//   connectionString: process.env.DATABASE_URL
// }


// const pool = new Pool(
//   process.env.NODE_ENV === "production" ? proConfig : devConfig
//   );
  
const app = express();
const port = process.env.PORT || 4568;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Static files serving middleware
app.use(express.static(path.join(__dirname, 'client', 'build')));

const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });
/**  // in case login testing is needed.
const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login);
 **/

const date = new Date(); 
const printDate =()=> console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

app.post('/webhook', (req, res) => {
  printDate();
  if (req.header("X-Github-Event")) {
    console.log(req.header("X-Github-Event"));
    switch (req.header("X-Github-Event")){
      //new branch created
      case "push":
        console.log(`PUSH, X-Github-Event:${req.header("X-Github-Event")}` );
        // console.log(`GET /repos/${req.body.repository.owner.name}/${req.body.repository.name}/commits/${req.body.ref}`);
        let getGit = async()=> {
          let owner = req.body.repository.owner.name;
          let repoName = req.body.repository.name;
          let reqRef = req.body.ref;
          
          let event = await octokit.request(`GET /repos/${owner}/${repoName}/commits/${reqRef}`);
          // console.log(JSON.stringify(event, null, 2));
          console.log(req.body.ref);

          const db = knex(dbConfig);
          db('events').insert({
            ref:reqRef,
            headers:req.headers,
            webhook_payload:req.body,
            api_event:event}).then(console.log("done")).catch((err) => { console.log(err); throw err })
            .finally(() => {
                db.destroy();
            });
        }
        getGit();
      
        break;
        
      case "create":
        console.log(`CREATE, X-Github-Event:${req.header("X-Github-Event")}` );
        break;
        
      case "ping":
        console.log(`PING, X-Github-Event:${req.header("X-Github-Event")}` );
        break;
          
    default:
        //TODO: add loging
        console.log("unhandled event type");
      }
  }else {
    console.log("event not recognized.");
  }
    res.sendStatus(200);
});

app.get('/clientdata1', function (req, res) {
  const db = knex(dbConfig);

  db('events')
  .select('*')
  .then(data => {
    const push = pick(`webhook_payload: {pusher: {name}}, api_event: {data: {files}`, data[0], 'unnest');
    console.log(push);
    res.send(
      push     
      )
  })
  .catch(err => {
    console.log(err);
    res.send({message:err.detail})
  })
})
// function test (bleh){
//   console.log(bleh);
// }
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(port, () => console.log(`Started server at http://localhost:${port}!`));
