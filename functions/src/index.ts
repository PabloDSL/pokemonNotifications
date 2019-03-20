import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp(functions.config().firebase)

exports.notificationNewPokemon = functions.database
.ref("{pushID}").onCreate((snapshot, context) => {
    console.log("Valor del snapshot" + snapshot.val());

    const payload = {
        notification: {
            title: 'Pokedex',
            body:  'Se ha añadido un ' + snapshot.val().name
        },
        topic: 'pokedex'
    };

    return admin.messaging().send(payload);
})