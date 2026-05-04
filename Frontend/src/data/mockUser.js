// Mock user data - act as a database for user data
// structure: id, name, username, email, xp, role, status, avatarUrl, isCurrentUser 

import { achievements } from './mockAchievements';

// getCurrent() function return current user data or default user data
function getCurrent() {
  return allUsers.find(u => u.isCurrentUser) || allUsers[0];
}

// Current login user
export const mockUser = {
  get id() { return getCurrent().id; },
  get name() { return getCurrent().name; },
  get username() { return getCurrent().username; },
  get email() { return getCurrent().email; },
  get bio() { return 'Ready to master JavaScript!'; },
  get avatarUrl() { return getCurrent().avatarUrl; },
  get avatarUrlSecondary() { return getCurrent().avatarUrl; },
  get totalXp() { return getCurrent().xp; },
  get role() { return getCurrent().role; },
  recentTopics: ['js-basics', 'loops-arrays', 'dom-manipulation', 'async-fetch'],
  unlockedAchievements: [],
  recentAchievements: []
};


/**
 * Unlock a single achievement 
 * unlockedAchievements 
 * recentAchievements 
 */
export function unlockAchievement(achievement) {
  if (mockUser.unlockedAchievements.includes(achievement.id)) {
    return false;
  }

  // Store achievement ID
  mockUser.unlockedAchievements.push(achievement.id);

  // Store latest achievements 
  mockUser.recentAchievements.unshift(achievement);
  if (mockUser.recentAchievements.length > 3) {
    mockUser.recentAchievements.pop();
  }

  return true;
}

/**
 * Iterate through all achievement definitions, evaluate their condition
 * against current user stats, and unlock if not already unlocked.
 *
 * @param {object} stats - { totalMaterialCompleted, totalQuizCompleted, accountCreated? }
 *   Compute with getUserStats() from userProgress.js, then spread in extra flags.
 *
 * Usage:
 *   import { getUserStats } from './userProgress';
 *   checkAchievements(getUserStats());                        // normal check
 *   checkAchievements({ ...getUserStats(), accountCreated: true }); // at registration
 */
export function checkAchievements(stats = {}) {
  achievements.forEach(achievement => {
    if (
      !mockUser.unlockedAchievements.includes(achievement.id) &&
      achievement.condition(stats)
    ) {
      unlockAchievement(achievement);
    }
  });
}

// All users in the system
export const allUsers = [
  {
    id: 100,
    name: 'Farras M',
    username: 'JS Master',
    email: 'farras@gmail.com',
    xp: 12500,
    role: 'student',
    status: 'active',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaA9-ssuQo5Agw6kpzH1yk0APh4FyhOgP0SQ&s',
    isCurrentUser: true
  },
  {
    id: 2,
    name: 'Sarah Chen',
    username: 'sarah_c',
    email: 'sarah@example.com',
    xp: 12150,
    role: 'Admin',
    status: 'active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1nonJmtHQsag1nrl5cM5PwE8nQ4pbQgTAou-Sdf13ePeKZsqxjwBpe_WJ4zI9OB7TTDAJ4g5gNtxfXfU31GQPmvZaANSp3EacQjuHTAsAuazTqLPVhn8rHR8FZ6qJfPoXhwXfKzQ9JOatJVjGgD-1FM5wtczjIUMkVG1InJ0eWJhwrx_2wIrtEfJ74hnkht9KZE78JfdGW1vACL3SvRkR3tE_X3HRFJyvg4XOAJhob_nXT8uDRgajJ4bSx57II99CrgoYgnEOcw'
  },
  {
    id: 3,
    name: 'Alex R.',
    username: 'alex_r',
    email: 'alex@example.com',
    xp: 8420,
    role: 'Student',
    status: 'active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrOROSnZRGjJ2LbuCDvqvkq7wvB4SkZvexWKhxAeaBoHfZWVHLu-nTYSltChGBHhn2WJMlUOmrJr9uo78o0E1cDNWtBaIzmRuCYAI4Ws_pz00HTOlL2FhvCjOUA6eX5rfhBk9IOwr0GwQrEBCrso70Y1JLLr4g6N7YpLDh71u_-SIaPBuM58WXeq1g_AcIfU7rtirc58_mcNFP8a-LaUFXdFRM0RWFQf6EWgsTwtQRmR_2yUhz-HPO_jPSKWrAV8HbP_9zZ6rQ5Q'
  },
  {
    id: 4,
    name: 'Jordan K.',
    username: 'jordan_k',
    email: 'jordan@example.com',
    xp: 7900,
    role: 'Student',
    status: 'active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3PRyIp5rHku8KviUXEDXb2xldeMQdzG4W3GADQLfa8yx0e3sNtk0sq8rf2JDRRCE2mx_0BEoo_Lx_dkvibIim3uSVMDSiVBRkcpgBgDZxIeG35EEHFgLaR8gCQYozAjGydmJ4FQPANOpwr3ChMshIP1iWnKREvCGHy3d0ObpE3l247l7uRIPkOzKvWQN1XYBhtmIMOmG5M6MRvcwBZMk-E7QeQRcm8PEFmbCv_On9nz3kvT_mFrPEP7kgMCdxXvYjYGEcgVqgJg'
  },
  {
    id: 5,
    name: 'Harun',
    username: 'harun_dev',
    email: 'harun@gmail.com',
    xp: 5420,
    role: 'Student',
    status: 'active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDckAF-s07l2eAfvlTwOuxU6FvkyooSj254Oeu7pbRKL7AGuFSp4_63mQrs12gFpfGH9szFpo28mhGXzXBHbxPXditX1d_4q9iobv3VyHgH2f29tE3P_m1iDcNlAAghdd-_7DF03fGLmoH7QBva1BkQOe0fADmDiGNjPrNb58t5LrmGO69er2P3ijEdjiA43QvcVjf8wLc8tNtOH3i77vXQNhMlwfSwCzg_rkYyBAQbcr_JxDu07BWHA96gBG_WdiPYQJ1DAf3XAA'
  },
  {
    id: 6,
    name: 'Riley Smith',
    username: 'riley_s',
    email: 'riley@example.com',
    xp: 4890,
    role: 'Student',
    status: 'suspended',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMFWQq66H683vNrTg_806NaMcnYJ7468xJcgjT0qDPEBgcO7ZWoQkHoMDttT1aZvj3cI4qrSRj_icFncGIP6q8f6XUB9Yy2M6CftgKhxgN14aJVMBDZ-Lzjc1OUoeFk5iR0Ium9sOfqrsYenvI7hDN3JLHW7nJINziqVm4zACLkDTLec3lLR3XtJnjMSxNcwjywFmY6Xb2dl-cIlL0OsmzPVBpMb-5M6UzF1_kuOPktAsVzxhOU0EfQndpjurZ718SSEBC3lB-Gg'
  },
  {
    id: 7,
    name: 'Dave G.',
    username: 'dave_g',
    email: 'dave@example.com',
    xp: 4200,
    role: 'Student',
    status: 'active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0dqUu8WVdf1uy7wcBC6EHSgexZYytZulUmrgGU8Z_5HtGuzNwei_ebCOPovpM2XRQwckcXvOah_YdNebPyFUrKxhOyhjtb9t1NoLgfiKM0cfHuzcWCmknL3Z5UbL7aeoVYImtoOC_5gaIUp4hP4EgoDthWwkRG7TtMQDBfnLyj0Ao243TE1SlSricmVlISvE8BYGuOwicgvNG1cp_ZzqpPveY-IL965Y5nU69cTZ1Md5vB-NmIX3SUWXiyWjZaE1TvuBllmiL4g'
  }
];

// Generate sorted leaderboard with dynamic ranks
export function getLeaderboard() {
  return [...allUsers]
    .filter(u => u.status === 'active')
    .sort((a, b) => b.xp - a.xp)
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }));
}

// Get current user's rank from leaderboard
export function getCurrentUserRank() {
  const board = getLeaderboard();
  const entry = board.find(u => u.isCurrentUser);
  return entry ? entry.rank : null;
}

// Update a user's XP (for quiz results, etc.)
// allUsers[currentUser].xp is the single source of truth.
// mockUser.totalXp is a getter derived from it — no manual sync needed.
export function updateUserXp(userId, xpToAdd) {
  const user = allUsers.find(u => u.id === userId);
  if (user) {
    user.xp += xpToAdd;
  }
}

// Add a topic to recent topics list 
export function addRecentTopic(topicId) {
  if (!topicId) return;

  // Remove existing
  mockUser.recentTopics = mockUser.recentTopics.filter(id => id !== topicId);

  mockUser.recentTopics.unshift(topicId);
  //  max 4
  if (mockUser.recentTopics.length > 4) {
    mockUser.recentTopics.pop();
  }
}

// Registered users store 
// NOTE: IDs must match allUsers IDs .
export const registeredUsers = allUsers.map(u => ({
  id: u.id,
  name: u.name,
  email: u.email,
  password: 'password123' // default plaintext password for all mock users
}));

// Register a new user (mock)
// Pushes to BOTH registeredUsers (auth) and allUsers (leaderboard/admin).
export function registerUser({ name, email, password }) {
  // Check if email already exists
  const exists = registeredUsers.find(u => u.email === email);
  if (exists) {
    return { success: false, message: 'Email sudah terdaftar. Silakan login.' };
  }

  // Generate a consistent unique ID 
  const newId = Math.max(...allUsers.map(u => u.id)) + 1;

  // Auth record
  const newUser = { id: newId, name, email, password };
  registeredUsers.push(newUser);

  // Leaderboard 
  allUsers.push({
    id: newId,
    name,
    username: email.split('@')[0],
    email,
    xp: 0,
    role: 'Student',
    status: 'active',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newId}`
  });

  // Unlock New Account achievement
  const { getUserStats } = require('./userProgress');
  checkAchievements({ ...getUserStats(), accountCreated: true });

  return { success: true, user: newUser };
}

// Login user 
export function loginUser(email, password) {
  const validUser = registeredUsers.find(u => u.email === email && u.password === password);

  if (validUser) {
    // Update current user 
    allUsers.forEach(u => u.isCurrentUser = false);
    const targetUser = allUsers.find(u => u.id === validUser.id);
    if (targetUser) targetUser.isCurrentUser = true;

    // Clear session state for the new user
    mockUser.recentTopics = [];
    mockUser.unlockedAchievements = [];
    mockUser.recentAchievements = [];

    return { success: true };
  }

  return { success: false, message: 'Oops! Email atau password kamu salah.' };
}
