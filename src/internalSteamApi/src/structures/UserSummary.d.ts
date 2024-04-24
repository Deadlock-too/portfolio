import User from './User.js';
/** Persona states as indicated by https://developer.valvesoftware.com/wiki/Steam_Web_API#Public_Data */
export declare enum UserPersonaState {
    Offline = 0,
    Online = 1,
    Busy = 2,
    Away = 3,
    Snooze = 4,
    LookingToTrade = 5,
    LookingToPlay = 6
}
export default class UserSummary extends User {
    /** The user's avatar in varous sizes */
    avatar: {
        small: string;
        medium: string;
        large: string;
        hash: string;
    };
    /** Link to the user's profile */
    url: string;
    /** Is this user's profile visible to you */
    visible: boolean;
    /** The user's persona state. Always 0 if profile is private */
    personaState: UserPersonaState;
    /** Flags for personState. Seems to always be 0 */
    personaStateFlags: number;
    /** If this user allows comments on their profile */
    allowsComments: boolean;
    /** The nickname this user has set */
    nickname: string;
    /** Unix Timestamp when the user last logged off */
    lastLogOffTimestamp?: number;
    /** Unix Timestamp when the profile was created if visible */
    createdTimestamp?: number;
    /** The user's real name if set and visible */
    realName?: string;
    /** The user's primary group ID if set and visible */
    primaryGroupID?: string;
    /** The game the user is currently playing if any */
    gameID?: number;
    /** The name of the game the user is currently playing if any */
    gameName?: string;
    /** The IP:PORT of the game server the user is currently playing on if any */
    gameServerIP?: string;
    /** The SteamID of the game server the user is currently playing on if any */
    gameServerID?: string;
    /** The user's country code if set and visible */
    countryCode?: string;
    /** The user's state code if set and visible */
    stateCode?: string;
    /** The user's city ID if set and visible */
    cityID?: string;
    constructor(data: any);
    /** Date when this user's account was created */
    get createdAt(): Date | undefined;
    /** Date when this user last logged off */
    get lastLogOffAt(): Date | undefined;
}
