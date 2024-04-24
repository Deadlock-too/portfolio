import UserBadge from './UserBadge.js';
export default class UserBadges {
    /** Badges this user owns */
    badges: UserBadge[];
    /** The total amount of XP this user has */
    xp: number;
    /** The amount of XP remaining for this user to reach the next level */
    xpRemaining: number;
    /** This user's current level */
    level: number;
    /** The amount of XP it took to reach this user's level (e.g. reaching level 26 requires 4800 XP) */
    levelXP: number;
    constructor(data: any);
}
