#!/bin/bash

DIR_SELF=`dirname $0`
cd ${DIR_SELF}

npm install
node ./node_modules/mocha/bin/_mocha --recursive routers
exit $?