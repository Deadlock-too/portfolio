import Game from './Game.js';
export default class GameInfoBasic extends Game {
    /** Name for this game */
    name: string;
    /** Hash for this game's icon */
    icon: string;
    constructor(data: any);
    /** tiny app icon */
    get iconURL(): string;
}
