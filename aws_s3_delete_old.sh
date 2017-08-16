#!/bin/bash

# Usage: ./deleteOld "bucketname" "30 days"

s3cmd ls s3://$1 | while read -r line;
  do
    fileName=`echo $line|awk {'print $4'}`
    echo "Inspecting: $fileName"
    createDate=`echo $line|awk {'print $1" "$2'}`
    createDate=`gdate -d"$createDate" +%s`
    olderThan=`gdate -d"-$2" +%s`
    if [[ $createDate -lt $olderThan ]]
      then 
        if [[ $fileName != "" ]]
          then
            echo "Deleting..."
            s3cmd del "$fileName"
        fi
    fi
  done;
