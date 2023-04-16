# NodeJs-MongoDB-Mongoose-Express-SocketIO-Boilerplate
## _with CICD_

[![Node.js CI](https://github.com/FranklinThaker/NodeJs-MongoDB-Mongoose-Express-SocketIO-Boilerplate/actions/workflows/NodeJS-CICD.yml/badge.svg?branch=main)](https://github.com/FranklinThaker/NodeJs-MongoDB-Mongoose-Express-SocketIO-Boilerplate/actions/workflows/NodeJS-CICD.yml)

## Installation

This boilerplate requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd NodeJs-MongoDB-Mongoose-Express-SocketIO-Boilerplate
nano .env [add required variables -> I have added .env.local for example]
npm i
npm test
npm start
```

How to manage in production mode? [Run, Delete, View Logs etc.]

```sh
npm i pm2 -g
pm2 start production.config.json
pm2 startup systemd
pm2 save
pm2 logs [to check all logs]
pm2 delete all [to delete all processes attached with pm2]
```

Example output of test run & coverage report:
![Test-Report1](/public/test_report1.png?raw=true "Test report 1")
![Test-Report2](/public/test_report2.png?raw=true "Test report 2")

#
# Thank you :)
#
## Feel free to connect with me on:
```sh
https://www.instagram.com/axel_blaze_csgo/
https://www.youtube.com/c/FranklinThaker
```