/**
 * Mapping each wallet address (Ethereum / Starknet)
 * to that player's Discord name, if willingly allowed.
 * 
 * NOTE: The address keys must be lowercase!
 */
const playerByAddress = {
    '0x0795a0690f51905f34f2d52b482e18ebc39b87638e30eb4bd4fc65ff67a7beec': 'Unstoppable Games',
    '0x02fd7308ef5321c18475e93e8387a0ca960db68307d1e2afe4ed09085acda7c6': '<Q> Elerium115',
    '0x059a67b550ac4543a0afddf2fe4e20f0e54d498e4b9f701f527ae22e32e36561': '[1ST] Cheveuxxx｜floodgate.space',
    '0x0750c9945938b4c89baf68acc9a97d52d59eeef6b399c57edc75c8127a70f050': '<Q> Ciefa',
};

module.exports = {
    playerByAddress,
};
