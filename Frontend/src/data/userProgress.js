// act as logic antar frontend & mockUser  frontend only
import { updateUserXp } from './mockUser';

const createDefaultQuizzes = () => ({
  'q1': { completed: false, lastScore: 0, bestScore: 0, bestXp: 0 },
  'q2': { completed: false, lastScore: 0, bestScore: 0, bestXp: 0 }
});

const createDefaultMaterials = () => ({
  'm1': { completed: false },
  'm2': { completed: false }
});

export const userProgress = {
  'js-basics': { materials: createDefaultMaterials(), quizzes: createDefaultQuizzes(), topicBonusGranted: false },
  'loops-arrays': { materials: createDefaultMaterials(), quizzes: createDefaultQuizzes(), topicBonusGranted: false },
  'dom-manipulation': { materials: createDefaultMaterials(), quizzes: createDefaultQuizzes(), topicBonusGranted: false },
  'async-fetch': { materials: createDefaultMaterials(), quizzes: createDefaultQuizzes(), topicBonusGranted: false },
  'react-hooks': { materials: createDefaultMaterials(), quizzes: createDefaultQuizzes(), topicBonusGranted: false },
  'nodejs-express': { materials: createDefaultMaterials(), quizzes: createDefaultQuizzes(), topicBonusGranted: false }
};

//check if user complete all material and quiz then grant topic bonus xp frontend only
function checkAndGrantTopicBonus(courseId, userId = 100) {
  const progress = userProgress[courseId];
  if (!progress || progress.topicBonusGranted) return false;

  const allMaterialsCompleted = Object.values(progress.materials).every(m => m.completed);
  const allQuizzesCompleted = Object.values(progress.quizzes).every(q => q.completed);

  if (allMaterialsCompleted && allQuizzesCompleted) {
    progress.topicBonusGranted = true;
    updateUserXp(userId, 50);
    return true;
  }
  return false;
}

export function calculateProgress(courseId) {
  const progress = userProgress[courseId];
  if (!progress) return 0;

  let completedCount = 0;

  const totalAvailable =
    // dynamic total available, menghitung jumlah material dan quiz yang tersedia
    //Object.keys() mengembalikan array dari nama-nama key yang ada di dalam object

    Object.keys(progress.materials).length +
    Object.keys(progress.quizzes).length;

  if (totalAvailable === 0) return 0;
  // Object.values() mengembalikan array dari nilai-nilai yang ada di dalam object
  Object.values(progress.materials).forEach(m => {
    if (m.completed) completedCount++;
  });

  Object.values(progress.quizzes).forEach(q => {
    if (q.completed) completedCount++;
  });

  return Math.round((completedCount / totalAvailable) * 100);
}


export function markMaterialCompleted(courseId, materialId, userId = 100) {
  const material = userProgress[courseId]?.materials?.[materialId];
  if (material && !material.completed) {
    material.completed = true;
    updateUserXp(userId, 5);

    // Check if this topic is completed
    checkAndGrantTopicBonus(courseId, userId);
    return true;
  }
  return false;
}

export function markQuizCompleted(courseId, quizId, score, xp, userId = 100) {
  const quizData = userProgress[courseId]?.quizzes?.[quizId];
  if (!quizData) return { newXpEarned: 0, isNewBest: false };

  quizData.completed = true;
  quizData.lastScore = score;

  let newXpEarned = 0;
  let isNewBest = false;

  if (xp > quizData.bestXp) {
    newXpEarned = xp - quizData.bestXp;
    quizData.bestXp = xp;
    if (score > quizData.bestScore) {
      quizData.bestScore = score;
    }
    isNewBest = true;
    updateUserXp(userId, newXpEarned);
  }

  // Check if this topic completed
  checkAndGrantTopicBonus(courseId, userId);

  return { newXpEarned, isNewBest };
}

// Aggregate stats used by the achievement system
export function getUserStats() {
  let totalMaterialCompleted = 0;
  let totalQuizCompleted = 0;

  Object.values(userProgress).forEach(topic => {
    Object.values(topic.materials).forEach(m => {
      if (m.completed) totalMaterialCompleted++;
    });
    Object.values(topic.quizzes).forEach(q => {
      if (q.completed) totalQuizCompleted++;
    });
  });

  return { totalMaterialCompleted, totalQuizCompleted };
}
