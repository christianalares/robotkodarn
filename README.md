# Robotkodarn
## A project made by students at KYH together with Vinnovera

Based on https://github.com/primavera133/sample-stack

## If running MongoDB locally:
1. Start the VM - `vagrant up`
2. SSH into it - `vagrant ssh`
3. Navigate to the public folder - `cd /var/www/public`
4. Start mongo - `mongod` (do this in a separete terminal since it have to idle)
5. Start the app `yarn run dev` (or `npm run dev` if you prefer)
6. The app should now be running at 192.168.33.11:8000

Note: If step 4 doesn't work, make sure you have a folder in the root directory /data/db.
Do this by:

1. `sudo mkdir -p /data/db`
2. `sudo chmod 777 /data/db`

## If you want to run MongoDB from the cloud:
The config file is already set up for connecting to the cloud based db so just skip step 4

### Connecting ot the mongo shell from the terminal:
First make sure to download the mongo shell, see [mongodb.org](http://mongodb.org) for more info, or just install mong using [homebrew](https://brew.sh/index_se.html):

`brew install mongodb`

Then paste the following command to the terminal:

`mongo "mongodb://robotkodarn-shard-00-00-mgdrh.mongodb.net:27017 robotkodarn-shard-00-01-mgdrh.mongodb.net:27017 robotkodarn-shard-00-02-mgdrh.mongodb.net:27017/test?replicaSet=Robotkodarn-shard-0" --authenticationDatabase admin --ssl --username arduino --password robotkodarn`