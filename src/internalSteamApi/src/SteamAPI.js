import SteamID from 'steamid';
import querystring from 'node:querystring';

import { MemoryCacheMap } from './Cache.js';
import { fetch, assertApp, assertID } from './utils.js';
import UserStats from './structures/UserStats.js';
import NewsPost from './structures/NewsPost.js';
import Server from './structures/Server.js';
import Game from './structures/Game.js';
import GameInfo from './structures/GameInfo.js';
import GameInfoExtended from './structures/GameInfoExtended.js';
import GameInfoBasic from './structures/GameInfoBasic.js';
import GameServer from './structures/GameServer.js';
import UserAchievements from './structures/UserAchievements.js';
import UserBadges from './structures/UserBadges.js';
import UserPlaytime from './structures/UserPlaytime.js';
import UserBans from './structures/UserBans.js';
import UserFriend from './structures/UserFriend.js';
import UserServers from './structures/UserServers.js';
import UserSummary from './structures/UserSummary.js';
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
    static reProfileBase = String.raw `(?:(?:(?:(?:https?)?:\/\/)?(?:www\.)?steamcommunity\.com)?)?\/?`;
    static reCommunityID = RegExp(String.raw `^(\d{17})$`, 'i');
    static reSteamID2 = RegExp(String.raw `^(STEAM_\d+:\d+:\d+)$`, 'i');
    static reSteamID3 = RegExp(String.raw `^(\[U:\d+:\d+\])$`, 'i');
    static reProfileURL = RegExp(String.raw `${this.reProfileBase}profiles\/(\d{17})`, 'i');
    static reProfileID = RegExp(String.raw `${this.reProfileBase}id\/([a-z0-9_-]{2,32})`, 'i');
    static SUCCESS_CODE = 1;
    language;
    currency;
    headers;
    baseAPI;
    baseStore;
    baseActions;
    gameDetailCache;
    userResolveCache;
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
        if (options.inMemoryCacheEnabled) {
            if (options.gameDetailCacheEnabled && options.gameDetailCacheTTL)
                this.gameDetailCache = new MemoryCacheMap(options.gameDetailCacheTTL);
            if (options.userResolveCacheEnabled && options.userResolveCacheTTL)
                this.userResolveCache = new MemoryCacheMap(options.userResolveCacheTTL);
        }
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
     * Resolve runs through a couple different methods for finding a user's profile ID based on
     * either their id, username, profile url, vanity url, steamID2, or steamID3.
     * Rejects promise if a profile couldn't be resolved
     * @param query Something to resolve like https://steamcommunity.com/id/xDim
     * @returns Profile ID
     */
    async resolve(query) {
        // community id match, ex. 76561198378422474
        const communityIDMatch = query.match(SteamAPI.reCommunityID);
        if (communityIDMatch !== null)
            return communityIDMatch[1];
        // url, https://steamcommunity.com/profiles/76561198378422474
        const urlMatch = query.match(SteamAPI.reProfileURL);
        if (urlMatch !== null)
            return urlMatch[1];
        // Steam 2: STEAM_0:0:209078373
        const steamID2Match = query.match(SteamAPI.reSteamID2);
        if (steamID2Match !== null) {
            const sid = new SteamID(steamID2Match[1]);
            return sid.getSteamID64();
        }
        // Steam 3: [U:1:418156746]
        const steamID3Match = query.match(SteamAPI.reSteamID3);
        if (steamID3Match !== null) {
            const sid = new SteamID(steamID3Match[1]);
            return sid.getSteamID64();
        }
        // vanity id, https://steamcommunity.com/id/xDim
        const idMatch = query.match(SteamAPI.reProfileID);
        if (idMatch !== null) {
            const id = idMatch[1];
            const cachedID = this.userResolveCache?.get(id);
            if (cachedID)
                return cachedID;
            const json = await this.get('/ISteamUser/ResolveVanityURL/v1', { vanityurl: id });
            if (json.response.success !== SteamAPI.SUCCESS_CODE)
                throw new Error(json.response.message);
            if (this.userResolveCache)
                this.userResolveCache.set(id, json.response.steamid);
            return json.response.steamid;
        }
        throw new TypeError('Invalid format');
    }
    /**
     * Gets featured categories on Steam store
     *
     * <warn>undocumented endpoint -- may be unstable</warn>
     * @param options More options
     * @param options.language The language
     * @param options.currency The currency
     */
    getFeaturedCategories({ language = this.language, currency = this.currency } = {}) {
        // TODO: make class for this
        return this.get('/featuredcategories', { l: language, cc: currency }, this.baseStore);
    }
    /**
     * Gets featured games on Steam store
     *
     * <warn>undocumented endpoint -- may be unstable</warn>
     * @param options More options
     * @param options.language The language
     * @param options.currency The currency
     */
    getFeaturedGames({ language = this.language, currency = this.currency } = {}) {
        // TODO: make class for this
        return this.get('/featured', { l: language, cc: currency }, this.baseStore);
    }
    /**
     * Get details for app ID. If an array of more than one app ID is passed in, the parameter &filters=price_overview
     * will be added to the request since otherwise the server would respond with null
     *
     * Note: a game will not have a price_overview field if it is F2P
     *
     * <warn>If the array contains invalid app IDs, they will be filtered out</warn>
     *
     * <warn>Requests for this endpoint are limited to 200 every 5 minutes</warn>
     *
     * <warn>Not every `currency` is supported. Only the following are valid: `us, ca, cc, es, de, fr, ru, nz, au, uk`.</warn>
     *
     * <warn>Not every `language` is supported. A list of available languages can be found [here](https://www.ibabbleon.com/Steam-Supported-Languages-API-Codes.html).</warn>
     * @param app App ID or array of App IDs
     * @param options More options
     * @param options.language The language
     * @param options.currency The currency
     * @param options.filters Fields to restrict the return results to
     * @returns If app is number, returns single object. If app is array, returns a mapping of app IDs to objects
     */
    async getGameDetails(app, { language = this.language, currency = this.currency, filters = [] } = {}) {
        assertApp(app);
        const isArr = Array.isArray(app);
        const key = `${app}-${currency}-${language}`;
        // For now we're not touching the cache if an array of apps is passed
        // TODO: maybe cache apps individually if an array is passed?
        if (!isArr) {
            const cached = this.gameDetailCache?.get(key);
            if (cached)
                return cached;
        }
        const details = await this
            .get('/appdetails', {
            appids: isArr ? app.join(',') : app,
            cc: currency,
            l: language,
            filters: isArr && app.length > 1 ? 'price_overview' : filters.join(','),
        }, this.baseStore)
            .then(json => {
            if (json === null)
                throw new Error('Failed to find app ID');
            // TODO: make a class
            const filtered = {};
            for (const [k, v] of Object.entries(json))
                if (v.success) {
                    const d = v.data;
                    // Convert empty arrays to empty objects for consistency
                    filtered[k] = Array.isArray(d) && d.length === 0 ? {} : d;
                }
            if (Object.keys(filtered).length === 0)
                throw new Error('Failed to find app ID');
            return isArr ? filtered : filtered[app];
        });
        if (!isArr)
            this.gameDetailCache?.set(key, details);
        return details;
    }
    /**
     * Get every single app on steam
     *
     * Note: Original JSON names are being preserved instead of converting
     * each element to a class here because there are 186311+ games
     * that would have to be made into a class.
     * @returns Array of very basic app info (ID + name)
     */
    async getAppList() {
        // TODO: allow a parameter to be passed in to convert these to a class?
        return (await this.get('/ISteamApps/GetAppList/v2')).applist.apps;
    }
    /**
     * Get every server associated with a particular host
     * @param host Host to query (IPv4 or IPv4:queryport)
     * @returns Info of servers
     */
    async getServers(host) {
        const { response } = await this.get('/ISteamApps/GetServersAtAddress/v1', { addr: host });
        if (!response.success)
            throw new Error(response.message);
        return response.servers.map((server) => new Server(server));
    }
    /**
     * Get number of current players for app ID
     * @param app App ID to get number of current players for
     * @returns Number of current players
     */
    async getGamePlayers(app) {
        assertApp(app);
        const json = await this.get('/ISteamUserStats/GetNumberOfCurrentPlayers/v1', { appid: app });
        if (json.response.result !== SteamAPI.SUCCESS_CODE)
            throw new Error('No app found');
        return json.response.player_count;
    }
    /**
     * Get schema for app ID
     * @param app App ID to get schema for
     * @param language Language to return strings for (note: does not seem to affect stats; only achievements)
     * @returns Schema
     */
    async getGameSchema(app, language = this.language) {
        assertApp(app);
        // TODO: make class for this
        return (await this.get('/ISteamUserStats/GetSchemaForGame/v2', { appid: app, l: language })).game;
    }
    /**
     * Get a user's achievements for app ID
     * @param id Steam ID of user
     * @param app App ID to get achievements for
     * @param language Language to return strings for
     * @returns Achievements
     */
    async getUserAchievements(id, app, language = this.language) {
        assertID(id);
        assertApp(app);
        const json = await this.get('/ISteamUserStats/GetPlayerAchievements/v1', { steamid: id, appid: app, l: language });
        if (!json.playerstats.success)
            throw new Error(json.playerstats.message);
        return new UserAchievements(json.playerstats);
    }
    /**
     * Get achievement percentages for app ID
     *
     * If a game does not hvae any achievements, this will error
     * @param app App ID to get achievement progress for
     * @returns Array of object with achievement name and percentage for app ID
     */
    async getGameAchievementPercentages(app) {
        assertApp(app);
        const json = await this.get('/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2', { gameid: app });
        return json.achievementpercentages.achievements;
    }
    /**
     * Get a user's stats for app ID
     * @param id Steam ID of user
     * @param app App ID to get user stats for
     * @returns Stats for app ID
     */
    async getUserStats(id, app) {
        assertID(id);
        assertApp(app);
        return new UserStats((await this.get('/ISteamUserStats/GetUserStatsForGame/v2', { steamid: id, appid: app })).playerstats);
    }
    /**
     * Get news for app ID
     * @param app App ID
     * @param options Additional options for filtering posts
     * @returns App news for ID
     */
    async getGameNews(app, options = {}) {
        assertApp(app);
        const params = {
            appid: app,
            maxlength: options.maxContentLength,
            enddate: options.endDate?.getTime(),
            count: options.count,
            feeds: options.feeds?.join(','),
            tags: options.tags?.join(','),
        };
        // Filter out options that weren't supplied
        for (const [k, v] of Object.entries(params))
            if (v === undefined)
                delete params[k];
        return (await this.get('/ISteamNews/GetNewsForApp/v2', params)).appnews.newsitems.map((item) => new NewsPost(item));
    }
    /**
     * Get a user's badges
     * @param id User ID
     * @returns User level info and badges
     */
    async getUserBadges(id) {
        assertID(id);
        return new UserBadges((await this.get('/IPlayerService/GetBadges/v1', { steamid: id })).response);
    }
    /**
     * Get a user's level
     * @param id User ID
     * @returns The user's Steam level
     */
    async getUserLevel(id) {
        assertID(id);
        return (await this.get('/IPlayerService/GetSteamLevel/v1', { steamid: id })).response.player_level;
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
    /**
     * Get a user's recently played games. Note: <UserPlaytime>.game is GameInfo not just Game
     *
     * Like getUserOwnedGames() but only returns games played in the last 2 weeks
     * @param id User ID
     * @param count Number of results to limit the request to (0 means no limit)
     * @returns Recently played games and their play times
     */
    async getUserRecentGames(id, count = 0) {
        assertID(id);
        const json = await this.get('/IPlayerService/GetRecentlyPlayedGames/v1', { steamid: id, count });
        return json.response.games.map((data) => new UserPlaytime(data, new GameInfoBasic(data)));
    }
    /**
     * Get a user's or multipler users' bans. If an array of IDs is passed in, this returns an array of UserBans
     * @param id User ID(s)
     * @returns Ban info
     */
    async getUserBans(id) {
        assertID(id);
        const arr = Array.isArray(id);
        const json = await this.get('/ISteamUser/GetPlayerBans/v1', {
            steamids: arr ? id.join(',') : id,
        });
        const bans = json.players.map((player) => new UserBans(player));
        return arr ? bans : bans[0];
    }
    /**
     * Get a user's friends
     * @param id User ID
     * @returns The provided user's friends
     */
    async getUserFriends(id) {
        assertID(id);
        const json = await this.get('/ISteamUser/GetFriendList/v1', { steamid: id });
        return json.friendslist.friends.map((friend) => new UserFriend(friend));
    }
    /**
     * Get the groups the user is a member of
     * @param id User ID
     * @returns Group IDs
     */
    async getUserGroups(id) {
        assertID(id);
        const json = await this.get('/ISteamUser/GetUserGroupList/v1', { steamid: id });
        if (!json.response.success)
            throw new Error(json.response.message);
        return json.response.groups.map((group) => group.gid);
    }
    /**
     * Gets servers on steamcommunity.com/dev/managegameservers using your key
     * @returns Your server
     */
    async getUserServers() {
        return new UserServers((await this.get('/IGameServersService/GetAccountList/v1')).response);
    }
    /**
     * Get users summary. If an array of IDs is passed in, this returns an array of UserSummary
     * @param id User ID(s)
     * @returns Summary
     */
    async getUserSummary(id) {
        assertID(id);
        const arr = Array.isArray(id);
        const json = await this.get('/ISteamUser/GetPlayerSummaries/v2', { steamids: arr ? id.join(',') : id });
        if (!json.response.players.length)
            throw new Error('No players found');
        const summaries = json.response.players.map((player) => new UserSummary(player));
        return arr ? summaries : summaries[0];
    }
    /**
     * Gets the Steam server's time
     * @returns Date object from the server
     */
    async getServerTime() {
        const json = await this.get('/ISteamWebAPIUtil/GetServerInfo/v1');
        return new Date(json.servertime * 1000);
    }
    /**
     * Gets all the countries
     * @returns Array of country objects with fields countrycode, hasstates, and countryname
     */
    async getCountries() {
        return (await this.get('/QueryLocations', {}, this.baseActions));
    }
    /**
     * Gets all the states for a particular country
     * @returns Array of state objects with fields countrycode, statecode, and statename
     */
    async getStates(countryCode) {
        return (await this.get(`/QueryLocations/${countryCode}`, {}, this.baseActions));
    }
    /**
     * Gets all the cities for a particular state
     * @returns Array of city objects with fields countrycode, statecode, cityname and cityid
     */
    async getCities(countryCode, stateCode) {
        return (await this.get(`/QueryLocations/${countryCode}/${stateCode}`, {}, this.baseActions));
    }
    /**
     * Gets servers using Master Server Query Protocol filtering
     * @param filter Filter as defined by the [Master Server Query Protocol](https://developer.valvesoftware.com/wiki/Master_Server_Query_Protocol#Filter).
     * Although a filter is not stricly required, you probably want to at least use something like \appid\[appid] to filter by app
     * @param count Number of results to return. 100 by default
     */
    async getServerList(filter = '', count = 100) {
        const json = await this.get('/IGameServersService/GetServerList/v1', { filter, count });
        return json.response.servers.map((server) => new GameServer(server));
    }
}
