#!/bin/bash
 SOURCEFOLDER='build/html/'
 TARGETFOLDER='www'

 echo "Got to ${SOURCEFOLDER}"
 # cd ${SOURCEFOLDER}
 
 lftp -u $FTP_USER,$FTP_PASS $FTP_HOST \
 -e 'mirror -c -e -R build/html/ www ; exit'

 echo "File send to the server"
