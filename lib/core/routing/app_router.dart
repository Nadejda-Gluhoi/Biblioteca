import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../ui/screens/game_runner_screen.dart';
import '../../ui/screens/home_screen.dart';
import '../../ui/screens/lesson_screen.dart';
import '../../ui/screens/theme_list_screen.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/subjects/:subjectId/themes',
        builder: (context, state) {
          final subjectId = state.pathParameters['subjectId']!;
          return ThemeListScreen(subjectId: subjectId);
        },
      ),
      GoRoute(
        path: '/lessons/:lessonId',
        builder: (context, state) {
          final lessonId = state.pathParameters['lessonId']!;
          return LessonScreen(lessonId: lessonId);
        },
      ),
      GoRoute(
        path: '/games/:gameId',
        builder: (context, state) {
          final gameId = state.pathParameters['gameId']!;
          return GameRunnerScreen(gameId: gameId);
        },
      ),
    ],
  );
});
