//Imports
const Area = require("../models/Area");
const {oc} = require("ts-optchain");

//Function that creates a user array with the votes ordered and counted by area
const sortVotesByArea = async (users) => {
    const areas = await Area.find({})
    const usersWithCountVotes = users.map( (user) => {
        return ({
            name: user.name,
            votes: areas.map(area => ({
                area: area.name,
                cant: user.votes.filter(vote => vote.area === area.name).length
            }))
        })
    });

    return usersWithCountVotes;
};

//Function that receives an array of users and returns an array with the available areas and the most voted users
const votesByArea = async(users) => {
    const areas = {};
    const usersWithCountVotes = await sortVotesByArea(users);

    const getAreaVotes = votes => ( votes === null || votes === undefined ) ? 0 : votes;

    for (user of usersWithCountVotes) {
        for (vote of user.votes) {
            areas[vote.area] = (vote.cant >= oc(areas[vote.area]).votes(0)) ? {
                name: user.name,
                votes: vote.cant
            } : areas[vote.area];
        }
    }
    console.log(areas)
    return(Object.entries(areas).map(([area, employee]) => ({ area, employee })))
};


//Export
module.exports = {
    votesByArea,
};