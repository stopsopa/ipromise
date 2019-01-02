#!/bin/bash

# use:
# /bin/bash kill.sh flag-name
# to ignore this script
# /bin/bash kill.sh flag-name $$
# /bin/bash kill.sh flag-name $$ something-else-to-ignore "and something else"

#set -o xtrace
#set -e

FLAG=$1
THISFILE="$(basename $0)" || true

if [ "$#" == 0 ] ; then

    echo "give flag parameter"

    exit 1

else

    LIST=$(ps aux | grep $FLAG | grep -v grep | grep -v "$THISFILE") || true

    if [ "$#" -gt 1 ]; then

        # https://stackoverflow.com/a/1336245/5560682
        # https://stackoverflow.com/a/2390870/5560682
        IGNORE=("${@:2}") || true

        # to see what's inside array:
        # declare -p IGNORE

        # echo -e ">>[$C]<<"

        # echo -e "pure: >>$LIST<<";

        for i in "${IGNORE[@]}"
        do
            LIST=$(echo -e "$LIST"  | grep -v "$i") || true;
            # echo -e "after '$i': >>$LIST<<";
        done
    fi

    PIDS=$(echo -e "$LIST" | awk '{print $2}') || true;

    echo -e "\nlisting processes to kill:\n";
    echo -e $"$LIST\n"

    echo -e "\nlisting pids to kill:\n";
    echo -e $"$PIDS\n";

    for pid in $PIDS
    do
        echo "attempt to kill $pid"
        kill -s 9 $pid && echo 'success' || echo 'failure'
    done

    echo -e "\n"

    exit 0;
fi


