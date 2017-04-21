# Robotkodarn
## A project made by students at KYH together with Vinnovera

Based on https://github.com/primavera133/sample-stack

1. Run vagrant up
2. Run vagrant ssh
3. Navigate to /var/www/public
4. Run mongod to start the MongoDB (do this in a separete terminal since it have to idle)
5. Run yarn run dev (or npm run dev)
6. Connect through your local machine to 192.168.33.11:8000

### If running Mongodb locally:

If step 4 doesn't work, make sure you have a folder in the root directory /data/db
Do this by:

1. sudo mkdir -p /data/db
2. sudo chmod 777 /data/db

### To connect to Mongo cloud with shell, make sure to download mongo shell then run the following block of code:

mongo "mongodb://robotkodarn-shard-00-00-mgdrh.mongodb.net:27017,robotkodarn-shard-00-01-mgdrh.mongodb.net:27017,robotkodarn-shard-00-02-mgdrh.mongodb.net:27017/test?replicaSet=Robotkodarn-shard-0" --authenticationDatabase admin --ssl --username arduino --password robotkodarn