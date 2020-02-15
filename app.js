// npm init

/* added to package.json
"scripts":{
"test": "echo \"Error: nontest specified\" && exit 1",
"start": "node app.js",
"start-dev": "nodemon app.js"
} */


// npm install nodemon -save-dev
// npm install axios

const axios = require('axios');


// __Tähän_regex_komento__ = `/([ -][0-9]+\.[0-9]+)/g`;
const regexp = '[A-Z][a-z ]+[0-9]:[ ]+([ -][0-9]+\.[0-9]+)';
const osoite_robotin = "https://fanuc-robot-http-server.herokuapp.com";


// node app.js
// npm run start-dev


const main_loop = () => {
   // console.log("Hello World");
    
    setTimeout(() => {
        const start_time_stamp = new Date();
        axios.get(osoite_robotin).then((res) => {
            
         // console.log(res);
            let joints = [];
            let matches = res.data.matchAll(regexp); // Regular expression filter
            let count = 0;
            for (const match of matches) {
                count++;
                if (count > 6) break;

                const value = parseFloat(match[1]);
                joints.push(value);
                //console.log(value);
            }
            const time_stamp = new Date();
            const delta = time_stamp - start_time_stamp;

            console.log(time_stamp, joints, delta + "ms");
         });  

        main_loop();
    }, 10);
}

main_loop();