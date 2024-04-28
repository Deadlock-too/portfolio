import GameInfo, { GameInfoData } from './GameInfo'

type GameInfoExtendedData = GameInfoData & {
  has_workshop: boolean;
  has_market: boolean;
  has_dlc: boolean;
  capsule_filename?: string;
  sort_as?: string;
};

export default class GameInfoExtended extends GameInfo {
  /** If this game has a workshop */
  hasWorkshop: boolean
  /** If this game has a market */
  hasMarket: boolean
  /** If this game has DLC */
  hasDLC: boolean
  /** Game's capsule filename. Not sure what this means */
  capsuleFilename?: string
  /** Name that this game is sorted by */
  sortName?: string

  constructor(data: GameInfoExtendedData) {
    super(data)
    this.hasWorkshop = Boolean(data.has_workshop)
    this.hasMarket = Boolean(data.has_market)
    this.hasDLC = Boolean(data.has_dlc)
    this.capsuleFilename = data.capsule_filename
    this.sortName = data.sort_as
  }
}
