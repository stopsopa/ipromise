
exec 3<> /dev/null
function red {
    printf "\e[91m$1\e[0m\n"
}
function green {
    printf "\e[32m$1\e[0m\n"
}

if [ "$1" = "--help" ]; then

cat << EOF

    /bin/bash $0 --help
    /bin/bash $0 --watchAll

EOF

    exit 0
fi

set -e
set -x


if [ ! -e node_modules/.bin/promises-aplus-tests ]; then

    make ct

    yarn

    make cp

    git checkout yarn.lock
fi

TEST="node node_modules/.bin/promises-aplus-tests test/adapter.js"

{ green "\n\n    executing tests:\n        $TEST\n\n"; } 2>&3

$TEST

STATUS=$?

if [ "$STATUS" = "0" ]; then

    { green "\n    Tests passed\n"; } 2>&3
else

    { red "\n    Tests crashed\n"; } 2>&3

    exit $STATUS
fi
