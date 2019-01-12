#!/bin/bash
 SOURCEFOLDER='build/html/'
 TARGETFOLDER='www'

 echo "Got to ${SOURCEFOLDER}"
 cd ${SOURCEFOLDER}

 echo "Upload files"
 lftp -f "
 open $FTP_HOST
 user $FTP_USER $FTP_PASS
 mirror -R $TARGETFOLDER
 bye
 "

 echo "File send to the server"
