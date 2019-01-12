#!/bin/bash
 SOURCEFOLDER='build/html/'
 TARGETFOLDER='www'

 lftp -f "
 open $FTP_HOST
 user $FTP_USER $FTP_PASS
 mirror --use-cache $SOURCEFOLDER $TARGETFOLDER
 bye
 "

 echo "File send to the server"
