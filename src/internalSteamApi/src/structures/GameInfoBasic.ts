import Game, { GameData } from './Game'

const communityBase = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps'

export type GameInfoBasicData = GameData & {
  name: string;
  img_icon_url: string;
};

export default class GameInfoBasic extends Game {
  /** Name for this game */
  name: string
  /** Hash for this game's icon */
  icon: string

  constructor(data: GameInfoBasicData) {
    super(data)
    this.name = data.name
    this.icon = data.img_icon_url
  }

  /** tiny app icon */
  get iconURL(): string {
    return `${ communityBase }/${ this.id }/${ this.icon }.jpg`
  }
}
