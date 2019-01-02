
// const fs = require('fs');

// const path = require('path');

// const file = path.resolve(__dirname, 'telegram.log');

const now = () => (new Date()).toISOString().substring(0, 19).replace('T', ' ');

const tlog = require('inspc/logt');

function unique(pattern) { // node.js require('crypto').randomBytes(16).toString('hex');
    pattern || (pattern = 'xyxyxy');
    return pattern.replace(/[xy]/g,
        function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

// fetchJson('/telegram', {
//     method: 'post',
//     body: {
//         data: 'test send fetch'
//     }
// })

let resolve;

const promise = new Promise(res => resolve = res);

const tool = ({
    io
}) => {

    if ( ! io ) {

        throw `socketSync: io is required`
    }

    resolve(io);

    let list = [];

    const getUnique = () => {

        let id;

        do {

            id = unique();

        } while (list.find(s => s.id === id));

        return id;
    }

    io.on('connection', socket => {

        const id = getUnique();

        list.push({ id, socket });

        tlog('socket.io connection: ' + list.length);

        socket.emit('id', id);

        socket.on('send-to-server', data => {

            const tmp = list.filter(l => l.id !== data.id).map(data => data.socket);

            tmp.map(socket => socket.emit('dispatch-redux', data.action));
        })

        socket.on('disconnect', () => {

            list = list.filter(s => s.id !== id);

            tlog('socket.io disconnect: ' + list.length);
        });

        // tlog('fake emit');
        //
        // socket.emit('s-c-telegram-message', {
        //     "update_id": 9952688,
        //     "message": {
        //         "message_id": 46,
        //         "from": {
        //             "id": 593693414,
        //             "is_bot": false,
        //             "first_name": "simon",
        //             "last_name": "d",
        //             "username": "stopsopa",
        //             "language_code": "en-GB"
        //         },
        //         "chat": {
        //             "id": 593693414,
        //             "first_name": "simon",
        //             "last_name": "d",
        //             "username": "stopsopa",
        //             "type": "private"
        //         },
        //         "date": 1526508326,
        //         "text": "test2 fake"
        //     }
        // });
    });

    return (req, res, next) => {

        tlog('broadcast');

        io.emit('dispatch-redux', req.body); // emit an event to all connected sockets

        // list.forEach(socket => {
        //
        //     socket.emit('s-c-telegram-message', body);
        // })

        // const json = JSON.stringify(req.body, null, 4);

        // fs.appendFileSync(file, json + "\n\n");
        //
        return res.end(JSON.stringify({ok: true}));
    };
}

tool.dispatchReduxActionThroughSocket = action => promise.then(io => io.emit('dispatch-redux', action));

module.exports = tool;