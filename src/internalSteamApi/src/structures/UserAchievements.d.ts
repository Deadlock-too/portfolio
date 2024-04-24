import User from './User.js';
import UserAchievement from './UserAchievement.js';
export default class UserAchievements extends User {
    /** Name of this game */
    game: string;
    /** All the achievements for this game with respect to the user */
    achievements: UserAchievement[];
    constructor(data: any);
}
