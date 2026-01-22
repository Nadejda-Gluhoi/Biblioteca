import '../domain/entities.dart';

class SubjectModel {
  final String id;
  final String name;
  final String description;

  const SubjectModel({
    required this.id,
    required this.name,
    required this.description,
  });

  factory SubjectModel.fromJson(Map<String, dynamic> json) {
    return SubjectModel(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String? ?? '',
    );
  }

  Subject toEntity() {
    return Subject(id: id, name: name, description: description);
  }
}

class ThemeModel {
  final String id;
  final String subjectId;
  final String title;
  final String lessonId;
  final String gameId;

  const ThemeModel({
    required this.id,
    required this.subjectId,
    required this.title,
    required this.lessonId,
    required this.gameId,
  });

  factory ThemeModel.fromJson(Map<String, dynamic> json) {
    return ThemeModel(
      id: json['id'] as String,
      subjectId: json['subjectId'] as String,
      title: json['title'] as String,
      lessonId: json['lessonId'] as String,
      gameId: json['gameId'] as String,
    );
  }

  Theme toEntity() {
    return Theme(
      id: id,
      subjectId: subjectId,
      title: title,
      lessonId: lessonId,
      gameId: gameId,
    );
  }
}

class LessonModel {
  final String id;
  final String title;
  final String videoAsset;

  const LessonModel({
    required this.id,
    required this.title,
    required this.videoAsset,
  });

  factory LessonModel.fromJson(Map<String, dynamic> json) {
    return LessonModel(
      id: json['id'] as String,
      title: json['title'] as String,
      videoAsset: json['videoAsset'] as String,
    );
  }

  Lesson toEntity() {
    return Lesson(id: id, title: title, videoAsset: videoAsset);
  }
}

class GameDefinitionModel {
  final String id;
  final String type;
  final String title;
  final Map<String, dynamic> config;

  const GameDefinitionModel({
    required this.id,
    required this.type,
    required this.title,
    required this.config,
  });

  factory GameDefinitionModel.fromJson(Map<String, dynamic> json) {
    final config = <String, dynamic>{};
    final rawConfig = json['config'];
    if (rawConfig is Map) {
      config.addAll(Map<String, dynamic>.from(rawConfig));
    }
    return GameDefinitionModel(
      id: json['id'] as String,
      type: json['type'] as String,
      title: json['title'] as String,
      config: config,
    );
  }

  GameDefinition toEntity() {
    return GameDefinition(
      id: id,
      type: type,
      title: title,
      config: config,
    );
  }
}
