
if [ "$1" = "--build" ]; then

    set -e
    set -x

    (cd app/console && ../node_modules/.bin/webpack --config webpack-console.config.js)

    CODE="$?"

    exit $CODE;
fi

(cd app && node console $@)

CODE="$?"

exit $CODE;