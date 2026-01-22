import 'entities.dart';

abstract class SubjectRepository {
  Future<List<Subject>> getSubjects();
}

abstract class ThemeRepository {
  Future<List<Theme>> getThemes({required String subjectId});
}

abstract class LessonRepository {
  Future<Lesson> getLesson(String lessonId);
}

abstract class GameRepository {
  Future<GameDefinition> getGame(String gameId);
}
