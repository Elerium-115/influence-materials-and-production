const crewmateVideosBaseUrl = 'https://influence.elerium.dev/assets/crewmate-videos';

const crewmateVideos = {};

const crewmateIdsWithVideo = [
    3547, // [1ST] Skippy The Magnificent (crew 2438)
    5097, // [1ST] Skippy The Magnificent (crew 169)
    5807, // [1ST] Skippy The Magnificent (crew 159)
    20193, // Elerium 115 (crew 129)
    27392, // Elerium 115 (crew 3574)
    29933, // Elerium 115 (crew 4951)
];

crewmateIdsWithVideo.forEach(crewmateId => {
    crewmateVideos[crewmateId] = `${crewmateVideosBaseUrl}/${crewmateId}.mp4`;
});

module.exports = {
    crewmateVideos,
};
