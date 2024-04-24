import querystring from 'node:querystring';
import { CacheMap } from './Cache.js';
import Game from './structures/Game.js';
import GameInfo from './structures/GameInfo.js';
import GameInfoExtended from './structures/GameInfoExtended.js';
import UserPlaytime from './structures/UserPlaytime.js';
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
     * Get users owned games.
     * @param id User ID
     * @param opts Additional options for filtering
     * @returns Owned games
     */
    getUserOwnedGames(id: string, opts?: GetUserOwnedGamesOptions): Promise<UserPlaytime<Game | GameInfo | GameInfoExtended>[]>;
}
