import GameInfo from './GameInfo.js';
export default class GameInfoExtended extends GameInfo {
    /** If this game has a workshop */
    hasWorkshop: boolean;
    /** If this game has a market */
    hasMarket: boolean;
    /** If this game has DLC */
    hasDLC: boolean;
    /** Game's capsule filename. Not sure what this means */
    capsuleFilename?: string;
    /** Name that this game is sorted by */
    sortName?: string;
    constructor(data: any);
}
