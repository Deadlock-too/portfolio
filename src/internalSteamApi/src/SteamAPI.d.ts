/// <reference types="node" resolution-mode="require"/>
import querystring from 'node:querystring';
import { CacheMap } from './Cache.js';
import { City, Country, State } from './structures/Locations.js';
import AppBase from './structures/AppBase.js';
import AchievementPercentage from './structures/AchievementPercentage.js';
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
export interface SteamAPIOptions {
    /**
     * Default language to use for the API when a language is not explicitly provided
     *
     * 'english' by default
     */
    language?: Language;
    /**
     * Default currency to use for the API when a currency is not explicitly provided
     *
     * 'us' by default
     */
    currency?: Currency;
    /**
     * Custom headers to send for all API requests
     *
     * By default, User-Agent is "SteamAPI/<VERSION> (https://www.npmjs.com/package/steamapi)"
     */
    headers?: {
        [key: string]: string;
    };
    /**
     * URL to use for Steam API requests
     *
     * 'https://api.steampowered.com' by default
     */
    baseAPI?: string;
    /**
     * URL to use for Steam Store API requests
     *
     * 'https://store.steampowered.com/api' by default
     */
    baseStore?: string;
    /**
     * URL to use for Steam action requests (only used for getLocations)
     *
     * 'https://steamcommunity.com/actions' by default
     */
    baseActions?: string;
    /**
     * Whether to use built-in in-memory caching for gameDetailCache and userResolveCache
     */
    inMemoryCacheEnabled?: boolean;
    /**
     * If `inMemoryCacheEnabled` is true, this decides whether to cache API requests for getGameDetails()
     */
    gameDetailCacheEnabled?: boolean;
    /**
     * How long to cache getGameDetails() in milliseconds
     */
    gameDetailCacheTTL?: number;
    /**
     * If `inMemoryCacheEnabled` is true, this decides whether to cache API requests for resolve()
     */
    userResolveCacheEnabled?: boolean;
    /**
     * How long to cache resolve() in milliseconds
     */
    userResolveCacheTTL?: number;
}
export interface GetGameNewsOptions {
    /** Maximum length for the content to return, if this is 0 the full content is returned, if it's less then a blurb is generated to fit */
    maxContentLength?: number;
    /** Retrieve posts earlier than this date */
    endDate?: Date;
    /** Number of posts to retrieve (default 20) */
    count?: number;
    /** List of feed names to return news for */
    feeds?: string[];
    /** List of tags to filter by (e.g. 'patchnotes') */
    tags?: string[];
}
export interface GetUserOwnedGamesOptions {
    /** Include additional details (name, icon) about each game */
    includeAppInfo?: boolean;
    /** Include free games the user has played */
    includeFreeGames?: boolean;
    /** Includes games in the free sub (defaults to false) */
    includeFreeSubGames?: boolean;
    /** Include unvetted store apps (defaults to false) */
    includeUnvettedApps?: boolean;
    /** Include even more app details. If true, `includeAppInfo` will also be set to true */
    includeExtendedAppInfo?: boolean;
    /** If set, restricts results to the passed in apps. (note: does not seem to actually work) */
    filterApps?: number[];
    /** Language to return app info in. (note: does not seem to actualy work) */
    language?: Language;
}
export type Currency = 'us' | 'uk' | 'eu' | 'ru' | 'br' | 'jp' | 'id' | 'my' | 'ph' | 'sg' | 'th' | 'vn' | 'kr' | 'ua' | 'mx' | 'ca' | 'au' | 'nz' | 'no' | 'pl' | 'ch' | 'cn' | 'in' | 'cl' | 'pe' | 'co' | 'za' | 'hk' | 'tw' | 'sa' | 'ae' | 'il' | 'kz' | 'kw' | 'qa' | 'cr' | 'uy' | 'az' | 'ar' | 'tr' | 'pk';
export type Language = 'arabic' | 'bulgarian' | 'schinese' | 'tchinese' | 'czech' | 'danish' | 'dutch' | 'english' | 'finnish' | 'french' | 'german' | 'greek' | 'hungarian' | 'italian' | 'japanese' | 'koreana' | 'norwegian' | 'polish' | 'brazilian' | 'portuguese' | 'romanian' | 'russian' | 'latam' | 'spanish' | 'swedish' | 'thai' | 'turkish' | 'ukrainian' | 'vietnamese';
export default class SteamAPI {
    static reProfileBase: string;
    static reCommunityID: RegExp;
    static reSteamID2: RegExp;
    static reSteamID3: RegExp;
    static reProfileURL: RegExp;
    static reProfileID: RegExp;
    static SUCCESS_CODE: number;
    language: Language;
    currency: Currency;
    headers: {
        [key: string]: string;
    };
    baseAPI: string;
    baseStore: string;
    baseActions: string;
    gameDetailCache?: CacheMap<string, Object>;
    userResolveCache?: CacheMap<string, string>;
    private key;
    /**
     * Make a new SteamAPI Client
     * @param key Key to use for API calls. Key can be generated at https://steamcommunity.com/dev/apikey. If you want to make requests without a key, pass in false
     * @param options Custom options for default language, HTTP parameters, and caching
     */
    constructor(key: string | false, options?: SteamAPIOptions);
    /**
     * Used to make any GET request to the Steam API
     * @param path Path to request e.g '/IPlayerService/GetOwnedGames/v1?steamid=76561198378422474'
     * @param base Base API URL
     * @returns Parse JSON
     */
    get(path: string, params?: querystring.ParsedUrlQueryInput, base?: string): Promise<any>;
    /**
     * Resolve runs through a couple different methods for finding a user's profile ID based on
     * either their id, username, profile url, vanity url, steamID2, or steamID3.
     * Rejects promise if a profile couldn't be resolved
     * @param query Something to resolve like https://steamcommunity.com/id/xDim
     * @returns Profile ID
     */
    resolve(query: string): Promise<string>;
    /**
     * Gets featured categories on Steam store
     *
     * <warn>undocumented endpoint -- may be unstable</warn>
     * @param options More options
     * @param options.language The language
     * @param options.currency The currency
     */
    getFeaturedCategories({ language, currency }?: {
        language?: Language | undefined;
        currency?: Currency | undefined;
    }): Promise<{
        [key: string]: any;
    }>;
    /**
     * Gets featured games on Steam store
     *
     * <warn>undocumented endpoint -- may be unstable</warn>
     * @param options More options
     * @param options.language The language
     * @param options.currency The currency
     */
    getFeaturedGames({ language, currency }?: {
        language?: Language | undefined;
        currency?: Currency | undefined;
    }): Promise<{
        [key: string]: any;
    }>;
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
    getGameDetails(app: number | number[], { language, currency, filters }?: {
        language?: Language | undefined;
        currency?: Currency | undefined;
        filters?: never[] | undefined;
    }): Promise<{
        [key: string]: any;
    }>;
    /**
     * Get every single app on steam
     *
     * Note: Original JSON names are being preserved instead of converting
     * each element to a class here because there are 186311+ games
     * that would have to be made into a class.
     * @returns Array of very basic app info (ID + name)
     */
    getAppList(): Promise<AppBase[]>;
    /**
     * Get every server associated with a particular host
     * @param host Host to query (IPv4 or IPv4:queryport)
     * @returns Info of servers
     */
    getServers(host: string): Promise<Server[]>;
    /**
     * Get number of current players for app ID
     * @param app App ID to get number of current players for
     * @returns Number of current players
     */
    getGamePlayers(app: number): Promise<number>;
    /**
     * Get schema for app ID
     * @param app App ID to get schema for
     * @param language Language to return strings for (note: does not seem to affect stats; only achievements)
     * @returns Schema
     */
    getGameSchema(app: number, language?: Language): Promise<any>;
    /**
     * Get a user's achievements for app ID
     * @param id Steam ID of user
     * @param app App ID to get achievements for
     * @param language Language to return strings for
     * @returns Achievements
     */
    getUserAchievements(id: string, app: number, language?: Language): Promise<UserAchievements>;
    /**
     * Get achievement percentages for app ID
     *
     * If a game does not hvae any achievements, this will error
     * @param app App ID to get achievement progress for
     * @returns Array of object with achievement name and percentage for app ID
     */
    getGameAchievementPercentages(app: number): Promise<AchievementPercentage[]>;
    /**
     * Get a user's stats for app ID
     * @param id Steam ID of user
     * @param app App ID to get user stats for
     * @returns Stats for app ID
     */
    getUserStats(id: string, app: number): Promise<UserStats>;
    /**
     * Get news for app ID
     * @param app App ID
     * @param options Additional options for filtering posts
     * @returns App news for ID
     */
    getGameNews(app: number, options?: GetGameNewsOptions): Promise<NewsPost[]>;
    /**
     * Get a user's badges
     * @param id User ID
     * @returns User level info and badges
     */
    getUserBadges(id: string): Promise<UserBadges>;
    /**
     * Get a user's level
     * @param id User ID
     * @returns The user's Steam level
     */
    getUserLevel(id: string): Promise<number>;
    /**
     * Get users owned games.
     * @param id User ID
     * @param opts Additional options for filtering
     * @returns Owned games
     */
    getUserOwnedGames(id: string, opts?: GetUserOwnedGamesOptions): Promise<UserPlaytime<Game | GameInfo | GameInfoExtended>[]>;
    /**
     * Get a user's recently played games. Note: <UserPlaytime>.game is GameInfo not just Game
     *
     * Like getUserOwnedGames() but only returns games played in the last 2 weeks
     * @param id User ID
     * @param count Number of results to limit the request to (0 means no limit)
     * @returns Recently played games and their play times
     */
    getUserRecentGames(id: string, count?: number): Promise<UserPlaytime<GameInfoBasic>[]>;
    /**
     * Get a user's or multipler users' bans. If an array of IDs is passed in, this returns an array of UserBans
     * @param id User ID(s)
     * @returns Ban info
     */
    getUserBans(id: string | string[]): Promise<UserBans | UserBans[]>;
    /**
     * Get a user's friends
     * @param id User ID
     * @returns The provided user's friends
     */
    getUserFriends(id: string): Promise<UserFriend[]>;
    /**
     * Get the groups the user is a member of
     * @param id User ID
     * @returns Group IDs
     */
    getUserGroups(id: string): Promise<string[]>;
    /**
     * Gets servers on steamcommunity.com/dev/managegameservers using your key
     * @returns Your server
     */
    getUserServers(): Promise<UserServers>;
    /**
     * Get users summary. If an array of IDs is passed in, this returns an array of UserSummary
     * @param id User ID(s)
     * @returns Summary
     */
    getUserSummary(id: string | string[]): Promise<UserSummary | UserSummary[]>;
    /**
     * Gets the Steam server's time
     * @returns Date object from the server
     */
    getServerTime(): Promise<Date>;
    /**
     * Gets all the countries
     * @returns Array of country objects with fields countrycode, hasstates, and countryname
     */
    getCountries(): Promise<Country[]>;
    /**
     * Gets all the states for a particular country
     * @returns Array of state objects with fields countrycode, statecode, and statename
     */
    getStates(countryCode: string): Promise<State[]>;
    /**
     * Gets all the cities for a particular state
     * @returns Array of city objects with fields countrycode, statecode, cityname and cityid
     */
    getCities(countryCode: string, stateCode: string): Promise<City[]>;
    /**
     * Gets servers using Master Server Query Protocol filtering
     * @param filter Filter as defined by the [Master Server Query Protocol](https://developer.valvesoftware.com/wiki/Master_Server_Query_Protocol#Filter).
     * Although a filter is not stricly required, you probably want to at least use something like \appid\[appid] to filter by app
     * @param count Number of results to return. 100 by default
     */
    getServerList(filter?: string, count?: number): Promise<GameServer[]>;
}
