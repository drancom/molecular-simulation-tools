#!/bin/bash -e

# Create user
dropuser -U postgres -w --if-exists mstDBUser
createuser -U postgres -w --no-password -d -E -i -l -r -s mstDBUser

# Create database
# this happens automatically when the .sql file is copied into /docker-entrypoint-initdb.d/
#psql -a -v ON_ERROR_STOP=1 -d postgres -f $MYPATH/configure_database.sql
