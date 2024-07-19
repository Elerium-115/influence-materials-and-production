const crewmateVideosBaseUrl = 'https://influence.elerium.dev/assets/crewmate-videos';

const crewmateVideos = {};

const crewmateIdsWithVideo = [
    1477, // [1ST] Deryck Goldfinger | BIgE92
    1663, // [1ST] Deryck Goldfinger | BIgE92
    2426, // Elerium 115
    2428, // Elerium 115
    3547, // [1ST] Skippy The Magnificent
    5097, // [1ST] Skippy The Magnificent
    5807, // [1ST] Skippy The Magnificent
    7383, // [1ST] Deryck Goldfinger | BIgE92
    20193, // Elerium 115
    20457, // [1ST] Deryck Goldfinger | BIgE92
    26207, // [1ST] Deryck Goldfinger | BIgE92
    27392, // Elerium 115
    27395, // Elerium 115
    29933, // Elerium 115
];

crewmateIdsWithVideo.forEach(crewmateId => {
    crewmateVideos[crewmateId] = `${crewmateVideosBaseUrl}/${crewmateId}.mp4`;
});

module.exports = {
    crewmateVideos,
};
