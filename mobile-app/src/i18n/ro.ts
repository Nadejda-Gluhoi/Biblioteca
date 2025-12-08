/**
 * Romanian language strings for EduMind Kids app
 * All UI text is centralized here for easy maintenance and future localization
 */

export const ro = {
  // App name and general
  appName: 'EduMind Kids',
  appSubtitle: 'Simona și Elisei',
  
  // Onboarding screen
  onboarding: {
    welcome: 'Bine ai venit!',
    mainText: 'Hai să învățăm cifrele și literele prin joacă!',
    startButton: 'Începe aventura',
    characters: 'Simona și Elisei te așteaptă!',
  },
  
  // Home screen
  home: {
    greeting: 'Salut, {name}!',
    title: 'Ce vrei să înveți azi?',
    lettersCard: 'Litere',
    numbersCard: 'Cifre',
    progressSection: 'Progresul meu',
    lessonsCompleted: 'Lecții terminate',
    starsCollected: 'Stele colectate',
    gamesPlayed: 'Jocuri jucate',
  },
  
  // Letters screen
  letters: {
    title: 'Literele',
    subtitle: 'Alege o literă pentru a începe',
    watchVideo: 'Desen animat',
    playGame: 'Joacă-te',
  },
  
  // Numbers screen
  numbers: {
    title: 'Cifrele',
    subtitle: 'Alege o cifră pentru a începe',
    watchVideo: 'Desen animat',
    playGame: 'Joacă-te',
  },
  
  // Video lesson screen
  video: {
    loading: 'Se încarcă...',
    continueToGame: 'Continuă la joc',
    backToList: 'Înapoi la listă',
    watchAgain: 'Privește din nou',
  },
  
  // Letter game screen
  letterGame: {
    title: 'Găsește litera!',
    simonaAsks: 'Simona te întreabă:',
    chooseLetterPrompt: 'Alege litera {letter}',
    correct: 'Bravo! 🎉',
    incorrect: 'Hai să mai încercăm!',
    nextQuestion: 'Următoarea întrebare',
    finish: 'Termină jocul',
    starEarned: '+1 ⭐',
  },
  
  // Number game screen
  numberGame: {
    title: 'Numără obiectele!',
    eliseiAsks: 'Elisei te întreabă:',
    countPrompt: 'Câte {objects} vezi?',
    correct: 'Excelent! 🎉',
    incorrect: 'Mai numără o dată!',
    nextQuestion: 'Următoarea întrebare',
    finish: 'Termină jocul',
    starEarned: '+1 ⭐',
  },
  
  // Profile screen
  profile: {
    title: 'Profilul meu',
    childName: 'Nume:',
    statistics: 'Statistici',
    lessonsCompleted: 'Lecții terminate',
    gamesPlayed: 'Jocuri jucate',
    totalStars: 'Total stele',
    achievements: 'Realizări',
    resetProgress: 'Resetează progresul',
    resetConfirm: 'Ești sigur că vrei să ștergi tot progresul?',
    yes: 'Da',
    no: 'Nu',
  },
  
  // Navigation
  nav: {
    home: 'Acasă',
    letters: 'Litere',
    numbers: 'Cifre',
    profile: 'Profil',
  },
  
  // Common
  common: {
    loading: 'Se încarcă...',
    error: 'A apărut o eroare',
    retry: 'Încearcă din nou',
    back: 'Înapoi',
    next: 'Înainte',
    cancel: 'Anulează',
    confirm: 'Confirmă',
    comingSoon: 'În curând',
    aiTutor: 'În curând: Ajutor inteligent',
  },
  
  // Game results
  results: {
    congratulations: 'Felicitări!',
    youEarned: 'Ai câștigat {stars} stele!',
    playAgain: 'Joacă din nou',
    backToHome: 'Înapoi acasă',
  },
};

export type TranslationKeys = typeof ro;
