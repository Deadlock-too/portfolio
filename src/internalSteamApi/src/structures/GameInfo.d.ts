import GameInfoBasic from './GameInfoBasic.js';
export default class GameInfo extends GameInfoBasic {
    /** If this game has community visible stats */
    hasCommunityVisibleStats: boolean;
    /** If this game has leaderboards */
    hasLeaderboards: boolean;
    /** Descriptor IDs. Not sure what this means. Usually undefined */
    descriptorIDs?: number[];
    constructor(data: any);
}
