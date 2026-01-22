import '../domain/entities.dart';
import '../domain/repositories.dart';
import 'datasources/local_json_data_source.dart';
import 'models.dart';

const _subjectsPath = 'assets/data/subjects.json';
const _themesPath = 'assets/data/themes.json';
const _lessonsPath = 'assets/data/lessons.json';
const _gamesPath = 'assets/data/games.json';

class SubjectRepositoryImpl implements SubjectRepository {
  SubjectRepositoryImpl(this._dataSource);

  final LocalJsonDataSource _dataSource;

  @override
  Future<List<Subject>> getSubjects() async {
    final list = await _dataSource.loadList(_subjectsPath);
    return list
        .map(SubjectModel.fromJson)
        .map((model) => model.toEntity())
        .toList();
  }
}

class ThemeRepositoryImpl implements ThemeRepository {
  ThemeRepositoryImpl(this._dataSource);

  final LocalJsonDataSource _dataSource;

  @override
  Future<List<Theme>> getThemes({required String subjectId}) async {
    final list = await _dataSource.loadList(_themesPath);
    return list
        .map(ThemeModel.fromJson)
        .map((model) => model.toEntity())
        .where((theme) => theme.subjectId == subjectId)
        .toList();
  }
}

class LessonRepositoryImpl implements LessonRepository {
  LessonRepositoryImpl(this._dataSource);

  final LocalJsonDataSource _dataSource;

  @override
  Future<Lesson> getLesson(String lessonId) async {
    final list = await _dataSource.loadList(_lessonsPath);
    final lessons = list.map(LessonModel.fromJson).toList();
    final lesson = lessons.firstWhere(
      (model) => model.id == lessonId,
      orElse: () => throw StateError('Lesson not found: $lessonId'),
    );
    return lesson.toEntity();
  }
}

class GameRepositoryImpl implements GameRepository {
  GameRepositoryImpl(this._dataSource);

  final LocalJsonDataSource _dataSource;

  @override
  Future<GameDefinition> getGame(String gameId) async {
    final list = await _dataSource.loadList(_gamesPath);
    final games = list.map(GameDefinitionModel.fromJson).toList();
    final game = games.firstWhere(
      (model) => model.id == gameId,
      orElse: () => throw StateError('Game not found: $gameId'),
    );
    return game.toEntity();
  }
}
