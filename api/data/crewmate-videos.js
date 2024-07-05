const crewmateVideosBaseUrl = 'https://influence.elerium.dev/assets/crewmate-videos';

const crewmateVideos = {};

const crewmateIdsWithVideo = [
    5807, // [1ST] Skippy The Magnificent (crew 159, as of 2024-07-05)
];

crewmateIdsWithVideo.forEach(crewmateId => {
    crewmateVideos[crewmateId] = `${crewmateVideosBaseUrl}/${crewmateId}.mp4`;
});

module.exports = {
    crewmateVideos,
};
