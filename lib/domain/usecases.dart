import 'entities.dart';
import 'repositories.dart';

class GetSubjects {
  final SubjectRepository _repository;

  const GetSubjects(this._repository);

  Future<List<Subject>> call() {
    return _repository.getSubjects();
  }
}

class GetThemesForSubject {
  final ThemeRepository _repository;

  const GetThemesForSubject(this._repository);

  Future<List<Theme>> call(String subjectId) {
    return _repository.getThemes(subjectId: subjectId);
  }
}

class GetLesson {
  final LessonRepository _repository;

  const GetLesson(this._repository);

  Future<Lesson> call(String lessonId) {
    return _repository.getLesson(lessonId);
  }
}

class GetGameDefinition {
  final GameRepository _repository;

  const GetGameDefinition(this._repository);

  Future<GameDefinition> call(String gameId) {
    return _repository.getGame(gameId);
  }
}
