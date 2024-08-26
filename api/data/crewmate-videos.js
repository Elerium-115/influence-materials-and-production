const crewmateVideosBaseUrl = 'https://influence.elerium.dev/assets/crewmate-videos';

const crewmateVideos = {};

const crewmateIdsWithVideo = [
    1477, // [1ST] Deryck Goldfinger | BIgE92
    1663, // [1ST] Deryck Goldfinger | BIgE92
    2426, // Elerium115
    2428, // Elerium115
    3547, // [1ST] Skippy The Magnificent
    5097, // [1ST] Skippy The Magnificent
    5807, // [1ST] Skippy The Magnificent
    7383, // [1ST] Deryck Goldfinger | BIgE92
    20193, // Elerium115
    20457, // [1ST] Deryck Goldfinger | BIgE92
    26207, // [1ST] Deryck Goldfinger | BIgE92
    27392, // Elerium115
    27395, // Elerium115
    29933, // Elerium115
    35933, // Elerium115
];

crewmateIdsWithVideo.forEach(crewmateId => {
    crewmateVideos[crewmateId] = `${crewmateVideosBaseUrl}/${crewmateId}.mp4`;
});

export default {
    crewmateVideos,
};
