//Imports
const Area = require("../models/Area");

//Function that creates a user array with the votes ordered and counted by area
const sortVotesByArea = async (users) => {
    const usersWithCountVotes = users.map( user => {
        return ((await Area.find({})) || []).map(area => ({
            name: area.name,
            votes: user.votes.filter(vote => vote.area === area.name).length
        }));
    });

    return usersWithCountVotes;
};

//Function that receives an array of users and returns an array with the available areas and the most voted users
const votesByArea = async(users) => {
    const areas = {};
    const usersWithCountVotes = await sortVotesByArea(users);

    for (user of usersWithCountVotes) {
        for (vote of user.votes) {
            areas[vote.name] = (vote.votes > (areas[vote.name]?.votes ?? 0)) ? {
                name: user.name,
                votes: vote.votes
            } : areas[vote.name];
        }
    }

    return(Object.entries(areas).map(([area, employee]) => ({ area, employee })))
};


//Export
module.exports = {
    votesByArea
};