/**
 * Mapping each Starknet address to that player's
 * Discord name, if they explicitly agree to this.
 * 
 * NOTE: The address keys must be lowercase!
 */
const playerByAddress = {
    '0x0795a0690f51905f34f2d52b482e18ebc39b87638e30eb4bd4fc65ff67a7beec': 'Unstoppable Games',
    '0x0750c9945938b4c89baf68acc9a97d52d59eeef6b399c57edc75c8127a70f050': '<Q> Ciefa',
    '0x02ac310971056cf7ee6f6f27e5f91a551df5f12b215b0972045b486d43c47b38': '<Q> Daharius',
    '0x02fd7308ef5321c18475e93e8387a0ca960db68307d1e2afe4ed09085acda7c6': '<Q> Elerium115',
    '0x059a67b550ac4543a0afddf2fe4e20f0e54d498e4b9f701f527ae22e32e36561': '[1ST] Cheveuxxx｜floodgate.space',
    '0x019f0f563f9468e1995cc55fec8dfddfc30bb667ce4b020a6c8b7d9aa412aa06': '[1ST] NeilKD',
    '0x013fb68a3fd7b98e32397f9d2dc5214bb14f7ffb9717b20485c6200c6dfea906': '[1ST] ProfessorSabre',
    '0x0631acdbf5a79758cbcc84301b387aebfb5c0ec7476aa48a0ceb98662973c5ce': '[1ST] Skippy The Magnificent',
};

module.exports = {
    playerByAddress,
};
