const appBase = 'https://steamcdn-a.akamaihd.net/steam/apps'
const cfBase = 'https://cdn.cloudflare.steamstatic.com/steam/apps'

export type GameData = {
  appid: number
}

export default class Game {
  /** App ID for this game */
  id: number

  constructor(data: GameData) {
    this.id = data.appid
  }

  /** (might not exist) large sized header used on the store page */
  get headerURL(): string {
    return `${cfBase}/${this.id}/header.jpg`
  }

  /** (might not exist) medium sized header image */
  get headerMediumURL(): string {
    return `${cfBase}/${this.id}/capsule_231x87.jpg`
  }

  /** (might not exist) small header image used on user pages */
  get smallHeaderURL(): string {
    return `${cfBase}/${this.id}/capsule_184x69.jpg`
  }

  /** (might not exist) tiny header image used on app bundles */
  get tinyHeaderURL(): string {
    return `${cfBase}/${this.id}/capsule_sm_120.jpg`
  }

  // the following URLs are courtesy of
  // https://www.reddit.com/r/steamgrid/comments/d6ha6f/universal_link_for_downloading_games_cover/
  /** (might not exist) game page background */
  get backgroundURL(): string {
    return `${appBase}/${this.id}/library_hero.jpg`
  }

  /** (might not exist) game cover */
  get coverURL(): string {
    return `${appBase}/${this.id}/library_600x900_2x.jpg`
  }

  /** (might not exist) transparent game logo*/
  get logoURL(): string {
    return `${appBase}/${this.id}/logo.png`
  }
}
