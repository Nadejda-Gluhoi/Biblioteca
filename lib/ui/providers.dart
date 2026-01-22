import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/datasources/local_json_data_source.dart';
import '../data/repositories.dart';
import '../domain/entities.dart';
import '../domain/repositories.dart';
import '../domain/usecases.dart';

final localJsonDataSourceProvider = Provider<LocalJsonDataSource>((ref) {
  return LocalJsonDataSource();
});

final subjectRepositoryProvider = Provider<SubjectRepository>((ref) {
  return SubjectRepositoryImpl(ref.read(localJsonDataSourceProvider));
});

final themeRepositoryProvider = Provider<ThemeRepository>((ref) {
  return ThemeRepositoryImpl(ref.read(localJsonDataSourceProvider));
});

final lessonRepositoryProvider = Provider<LessonRepository>((ref) {
  return LessonRepositoryImpl(ref.read(localJsonDataSourceProvider));
});

final gameRepositoryProvider = Provider<GameRepository>((ref) {
  return GameRepositoryImpl(ref.read(localJsonDataSourceProvider));
});

final getSubjectsProvider = Provider<GetSubjects>((ref) {
  return GetSubjects(ref.read(subjectRepositoryProvider));
});

final getThemesForSubjectProvider = Provider<GetThemesForSubject>((ref) {
  return GetThemesForSubject(ref.read(themeRepositoryProvider));
});

final getLessonProvider = Provider<GetLesson>((ref) {
  return GetLesson(ref.read(lessonRepositoryProvider));
});

final getGameDefinitionProvider = Provider<GetGameDefinition>((ref) {
  return GetGameDefinition(ref.read(gameRepositoryProvider));
});

final subjectsProvider = FutureProvider<List<Subject>>((ref) {
  return ref.read(getSubjectsProvider)();
});

final themesProvider = FutureProvider.family<List<Theme>, String>((ref, subjectId) {
  return ref.read(getThemesForSubjectProvider)(subjectId);
});

final lessonProvider = FutureProvider.family<Lesson, String>((ref, lessonId) {
  return ref.read(getLessonProvider)(lessonId);
});

final gameDefinitionProvider =
    FutureProvider.family<GameDefinition, String>((ref, gameId) {
  return ref.read(getGameDefinitionProvider)(gameId);
});
