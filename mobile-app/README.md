# EduMind Kids – Simona și Elisei 📚✨

O aplicație mobilă educativă pentru copii (5-8 ani) unde aceștia învață cifrele și literele prin desene animate și jocuri interactive.

![React Native](https://img.shields.io/badge/React%20Native-0.81-blue)
![Expo](https://img.shields.io/badge/Expo-54-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

## 🎯 Descriere

**EduMind Kids** este o aplicație MVP care îi ajută pe copii să învețe:
- **Literele**: A, M, N, I, R
- **Cifrele**: 1, 2, 3, 4, 5

Fiecare lecție include:
- 📺 Desen animat educativ
- 🎮 Joc interactiv cu recompense (stele)

## 🚀 Cum rulez aplicația

### Cerințe preliminare

- Node.js (v18 sau mai nou)
- npm sau yarn
- Expo Go app pe telefonul mobil (pentru testare)

### Instalare

```bash
# Clonează repository-ul (dacă nu l-ai făcut deja)
cd mobile-app

# Instalează dependențele
npm install
# sau
yarn install
```

### Rulare

```bash
# Pornește serverul Expo
npm start
# sau
npx expo start
```

Apoi:
- Scanează codul QR cu aplicația **Expo Go** (Android) sau Camera (iOS)
- Sau apasă `w` pentru a deschide în browser (web)
- Sau apasă `a` pentru Android emulator / `i` pentru iOS simulator

## 📱 Ecrane și Funcționalități

### 1. Ecran Onboarding
- Prezentarea personajelor Simona și Elisei
- Mesaj de bun venit
- Buton "Începe aventura"

### 2. Ecran Home (Acasă)
- Salut personalizat
- Două carduri mari: **Litere** și **Cifre**
- Secțiune "Progresul meu" cu statistici
- Placeholder pentru "AI Tutor" (în curând)

### 3. Ecran Litere
- Lista literelor disponibile: A, M, N, I, R
- Fiecare literă are:
  - Buton "Desen animat" → Video
  - Buton "Joacă-te" → Joc

### 4. Ecran Cifre
- Lista cifrelor: 1, 2, 3, 4, 5
- Similar cu ecranul de litere

### 5. Ecran Desen Animat (Video)
- Player video (expo-av)
- Descrierea lecției
- Explicație de la Simona/Elisei
- Buton "Continuă la joc"

### 6. Joc Educațional – Litere
- Simona întreabă: "Alege litera X"
- 4 butoane cu litere diferite
- Feedback: ✅ "Bravo!" + confetti / ❌ "Hai să mai încercăm"
- Recompensă: +1 stea pentru răspuns corect

### 7. Joc Educațional – Cifre
- Elisei întreabă: "Câte steluțe vezi?"
- Obiecte afișate pentru numărare
- 3 butoane cu cifre
- Același sistem de recompense

### 8. Ecran Profil
- Numele copilului
- Statistici: lecții terminate, jocuri jucate, stele
- Realizări (achievements)
- Opțiune de resetare progres

## 🏗️ Structura Proiectului

```
mobile-app/
├── App.tsx                 # Punctul de intrare
├── src/
│   ├── components/         # Componente reutilizabile
│   │   ├── Button.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── Character.tsx
│   │   ├── ConfettiOverlay.tsx
│   │   ├── GameOptionButton.tsx
│   │   ├── LessonCard.tsx
│   │   └── ProgressStats.tsx
│   ├── screens/            # Ecranele aplicației
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LettersListScreen.tsx
│   │   ├── NumbersListScreen.tsx
│   │   ├── VideoLessonScreen.tsx
│   │   ├── LetterGameScreen.tsx
│   │   ├── NumberGameScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/         # Configurare navigație
│   │   └── index.tsx
│   ├── context/            # Context API pentru state
│   │   └── ProgressContext.tsx
│   ├── data/               # Date și configurări
│   │   ├── letters.ts      # Datele pentru litere
│   │   ├── numbers.ts      # Datele pentru cifre
│   │   └── theme.ts        # Culori, fonturi, spacing
│   ├── game/               # Logica jocurilor
│   │   ├── letterGames.ts
│   │   └── numberGames.ts
│   ├── hooks/              # Custom hooks
│   │   └── useProgress.ts
│   ├── i18n/               # Traduceri
│   │   └── ro.ts           # Texte în română
│   └── types/              # TypeScript types
│       └── index.ts
├── assets/                 # Resurse statice
├── package.json
└── tsconfig.json
```

## 🛠️ Tehnologii Folosite

- **React Native** + **Expo** - Framework pentru mobile
- **TypeScript** - Type safety
- **React Navigation** - Navigație (Stack + Bottom Tabs)
- **Context API** - Management de state global
- **AsyncStorage** - Persistența datelor local
- **expo-video** - Player video
- **@expo/vector-icons** - Iconițe

## 📊 Tipuri TypeScript

```typescript
// Lecție de literă
interface LetterLesson {
  id: string;
  letter: string;
  label: string;
  description: string;
  video: string;
  exampleWord: string;
}

// Lecție de cifre
interface NumberLesson {
  id: string;
  value: number;
  label: string;
  description: string;
  video: string;
  countObjects: string;
  objectEmoji: string;
}

// Progresul copilului
interface ChildProgress {
  name: string;
  totalStars: number;
  completedLessons: string[];
  gamesPlayed: number;
  gameResults: GameResult[];
}
```

## 🎨 Temă și Stiluri

Culorile sunt definite în `src/data/theme.ts`:

- **Primary**: `#FF6B6B` (coral) - butoane principale
- **Secondary**: `#4ECDC4` (teal) - acțiuni secundare
- **Background**: `#FFF9F0` (cream cald)
- **Simona**: `#FF6B6B` (coral roșu)
- **Elisei**: `#74B9FF` (albastru)
- **Star**: `#FFD700` (auriu)

## 🔮 Funcționalități Viitoare

- [ ] **AI Tutor** - Asistent inteligent pentru ajutor
- [ ] Mai multe litere și cifre
- [ ] Jocuri adiționale (puzzle, matching)
- [ ] Sincronizare cloud
- [ ] Profil pentru mai mulți copii
- [ ] Conținut video real

## 📄 Licență

MIT License

---

Creat cu ❤️ pentru copiii din România 🇷🇴
