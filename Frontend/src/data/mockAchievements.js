// Achievement definitions — single source of truth.
// Each condition receives a `stats` object computed from user state.
export const achievements = [
  {
    id: 'ach_new_account',
    title: 'New Account',
    description: 'Welcome aboard! Your learning journey starts here.',
    icon: 'waving_hand',
    iconColorTheme: 'primary',
    // Triggered explicitly at registerUser() with { accountCreated: true }
    // NOT a wildcard — prevents triggering on every profile page mount
    condition: (stats) => stats.accountCreated === true,
  },
  {
    id: 'ach_first_material',
    title: 'First Read',
    description: 'You completed your first learning material. Keep it up!',
    icon: 'menu_book',
    iconColorTheme: 'secondary',
    condition: (stats) => stats.totalMaterialCompleted >= 1,
  },
  {
    id: 'ach_first_quiz',
    title: 'Quiz Starter',
    description: 'You completed your first quiz. Test that knowledge!',
    icon: 'quiz',
    iconColorTheme: 'tertiary',
    condition: (stats) => stats.totalQuizCompleted >= 1,
  },
];
