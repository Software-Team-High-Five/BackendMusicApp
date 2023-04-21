const db = require('../models');
const User = db.user;
const Instrument = db.instrument;
const USER_INSTRUMENT = db.user_instrument;
const Op = db.Sequelize.Op;

//Add an instrument to a user
// retired
// exports.addUserInstrument = async (req, res) => {
//     const userId = req.query.userId;
//     const instrumentId = req.query.instrumentId;
//     const instructorId = req.query.instructorId;
//     if(!userId || !instrumentId) {
//         res.status(400).send({ message: 'userId and instrumentId are required!' });
//         return;
//     }
//     let error = false;

//     //Get the user
//     let user;
//     let userPromise = User.findByPk(userId)
//         .then(data => {
//             if (data != null) user = data;
//             else if (!error) {
//                 error = true;
//                 res.status(404).send({ message: `Unable to locate user with id ${userId}` });
//             }
//         })
//         .catch(e => {
//             if (!error) {
//                 error = true;
//                 res.status(500).send({ message: e.message || `Unknown error occured while locating user with id ${userId}` });
//             }
//         });
    
//     //Get the instrument
//     let instrument;
//     let instrumentPromise = Instrument.findByPk(instrumentId)
//         .then(data => {
//         if (data != null) instrument = data;
//         else if (!error) {
//             error = true;
//             res.status(404).send({
//                 message: `Unable to locate instrument with id ${instrumentId}`
//             });
//         }
//         })
//         .catch(e => {
//             if (!error) {
//                 error = true;
//                 res.status(500).send({
//                     message: e.message || `Unknown error occured while locating instrument with id ${instrumentId}`
//                 });
//             }
//         });
    
//     // get the instuctor if one is sent in
//     let instructor;
//     let instructorPromise;
//     if(instructorId) {
//         instructorPromise = User.findByPk(instructorId)
//             .then(data => {
//                 if(data != null) instructor = data;
//                 else if (!error) {
//                     error = true;
//                     res.status(404).send({ message: `unable to locate instuctor with ID: ${instructorId}` })
//                 }
//             })
//             .catch(e => { 
//                 if(!error) {
//                     error = true;
//                     res.status(500).send({ message: e.message || `unknown error occurred while locating instructor with ID: ${instructorId}` })
//                 }
//             })
//     } else {
//         instructorPromise = true;
//     }

//     //Wait for data
//     await userPromise;
//     await instrumentPromise;
//     await instructorPromise;

//     if (error) 
//         return;
    
//     //Add instrument to user
//     user.addInstrument(instrument)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(e => {
//             res.status(500).send({
//                 message: e.message || `Unknown error occured while adding the instrument (${instrumentId}) to the user (${user})`
//             });
//         });
// };

//Remove an instrument from a user
// retired
// exports.removeUserInstrument = async (req, res) => {
//     const instrumentId = req.query.instrumentId;
//     const userId = req.query.userId;
//     if(!instrumentId || !userId) {
//         res.status(400).send({
//             message: 'userId and instrumentId are required!'
//         });
//         return;
//     }
//     let error = false;

//     //Get the user
//     let user;
//     let userPromise = User.findByPk(userId)
//         .then(data => {
//             if (data != null)
//                 user = data;
//             else if (!error) {
//                 error = true;
//                 res.status(404).send({
//                     message: `Unable to locate user with id ${userId}`
//                 });
//             }
//         })
//         .catch(e => {
//         if (!error) {
//             error = true;
//             res.status(500).send({
//                 message: e.message || `Unknown error occured while locating user with id ${userId}`
//             });
//         }
//         });
    
//     //Get the instrument
//     let instrument;
//     let instrumentPromise = Instrument.findByPk(instrumentId)
//         .then(data => {
//             if (data != null)
//                 instrument = data;
//             else if (!error) {
//                 error = true;
//                 res.status(404).send({
//                     message: `Unable to locate instrument with id ${instrumentId}`
//                 });
//             }
//         })
//         .catch(e => {
//         if (!error) {
//             error = true;
//             res.status(500).send({
//                 message: e.message || `Unknown error occured while locating instrument with id ${instrumentId}`
//             });
//         }
//         });

//     //Wait for data
//     await userPromise;
//     await instrumentPromise;
//     if (error)
//         return;
    
//     //Remove instrument from the user
//     user.removeInstrument(instrument)
//         .then(data => {
//             if (data === 1)
//                 res.sendStatus(200);
//             else
//                 res.status(400).send({
//                 message: `Unable to remove the instrument ${instrumentId} from the user ${userId} because the user does not play the instrument`
//                 });
//         })
//         .catch(e => {
//             res.status(500).send({
//                 message: e.message || `Unknown error occured while removing the instrument (${instrumentId}) from the user (${userId})`
//             });
//         });
// };  

exports.create = (req, res) => {
    console.log('making it to create');
    if(!req.body.userId || !req.body.instrumentId){
        console.log('bad req');
        res.status(400).send({
            message: 'content empty'
        })
        return;
    }

    const user_instrument = {
        userId: req.body.userId
        ,instrumentId: req.body.instrumentId
        ,instructorId: req.body.instructorId || null
    }
    console.log(user_instrument);

    USER_INSTRUMENT.create(user_instrument)
        .then(data => res.send(data))
        .catch(e => res.status(500).send({ message: e.message || 'unknown error'})) 
}

exports.update = (req, res) => {
    if(!req.body.userId || !req.body.instrumentId){
        console.log('bad req');
        res.status(400).send({
            message: 'content empty'
        })
        return;
    }

    USER_INSTRUMENT.update(req.body, {where: [{userId: req.body.userId}, {instrumentId: req.body.instrumentId}]})
        .then(num => {
            if(num === 1) {
                res.send({message: 'association updated successfully'});
            } else {
                res.status(400).send({message: 'potential error updating association'})
            }
        })
        .catch(e => res.status(500).send({message: e.message || 'unknown error'}))
}

exports.delete = (req, res) => {
    const uid = req.params.uid;
    const iid = req.params.iid;

    USER_INSTRUMENT.destroy({ where: [{userId: uid}, {instrumentId: iid}] })
        .then(num => {
            if(num === 1) {
                res.send({message: 'association deleted successfully'})
            } else {
                res.status(400).send({ message: `unable to delete association`})
            }
        })
        .catch(e => res.status(500).send({message: e.message || 'unknown message'}))
}
