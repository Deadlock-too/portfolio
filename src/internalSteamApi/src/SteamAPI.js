import querystring from 'node:querystring';

import { fetch, assertID } from './utils.js';
import Game from './structures/Game.js';
import GameInfo from './structures/GameInfo.js';
import GameInfoExtended from './structures/GameInfoExtended.js';
import UserPlaytime from './structures/UserPlaytime.js';
const defaultOptions = {
    language: 'english',
    currency: 'us',
    headers: { 'User-Agent': `SteamAPI (https://www.npmjs.com/package/steamapi)` },
    baseAPI: 'https://api.steampowered.com',
    baseStore: 'https://store.steampowered.com/api',
    baseActions: 'https://steamcommunity.com/actions',
    inMemoryCacheEnabled: true,
    gameDetailCacheEnabled: true,
    gameDetailCacheTTL: 86400000,
    userResolveCacheEnabled: true,
    userResolveCacheTTL: 86400000,
};
export default class SteamAPI {
    language;
    currency;
    headers;
    baseAPI;
    baseStore;
    baseActions;
    key = '';
    /**
     * Make a new SteamAPI Client
     * @param key Key to use for API calls. Key can be generated at https://steamcommunity.com/dev/apikey. If you want to make requests without a key, pass in false
     * @param options Custom options for default language, HTTP parameters, and caching
     */
    constructor(key, options = {}) {
        if (key !== false) {
            if (key) {
                this.key = key;
            }
            else {
                console.warn([
                    'no key provided',
                    'some methods won\'t work',
                    'get one from https://goo.gl/DfNy5s or initialize SteamAPI as new SteamAPI(false) to suppress this warning'
                ].join('\n'));
            }
        }
        options = { ...defaultOptions, ...options };
        this.language = options.language;
        this.currency = options.currency;
        this.headers = options.headers;
        this.baseAPI = options.baseAPI;
        this.baseStore = options.baseStore;
        this.baseActions = options.baseActions;
    }
    /**
     * Used to make any GET request to the Steam API
     * @param path Path to request e.g '/IPlayerService/GetOwnedGames/v1?steamid=76561198378422474'
     * @param base Base API URL
     * @returns Parse JSON
     */
    get(path, params = {}, base = this.baseAPI) {
        if (this.key)
            params.key = this.key;
        return fetch(`${base}${path}?${querystring.stringify(params)}`, this.headers);
    }
    /**
     * Get users owned games.
     * @param id User ID
     * @param opts Additional options for filtering
     * @returns Owned games
     */
    async getUserOwnedGames(id, opts = {}) {
        assertID(id);
        // Same behavior as v3
        if (opts.includeFreeGames === undefined)
            opts.includeFreeGames = true;
        if (opts.language === undefined)
            opts.language = this.language;
        if (opts.includeExtendedAppInfo)
            opts.includeAppInfo = true;
        const params = {
            steamid: id,
            include_appinfo: opts.includeAppInfo,
            include_played_free_games: opts.includeFreeGames,
            include_free_sub: opts.includeFreeSubGames,
            skip_unvetted_apps: opts.includeUnvettedApps === undefined ? undefined : !opts.includeUnvettedApps,
            include_extended_appinfo: opts.includeExtendedAppInfo,
            appids_filter: opts.filterApps,
            language: opts.language,
        };
        // Filter out options that weren't supplied
        for (const [k, v] of Object.entries(params))
            if (v === undefined)
                delete params[k];
        const json = await this.get('/IPlayerService/GetOwnedGames/v1', params);
        return json.response.games.map((data) => {
            let game;
            if (opts.includeExtendedAppInfo)
                game = new GameInfoExtended(data);
            else if (opts.includeAppInfo)
                game = new GameInfo(data);
            else
                game = new Game(data);
            return new UserPlaytime(data, game);
        });
    }
}
