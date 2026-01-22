class Subject {
  final String id;
  final String name;
  final String description;

  const Subject({
    required this.id,
    required this.name,
    required this.description,
  });
}

class Theme {
  final String id;
  final String subjectId;
  final String title;
  final String lessonId;
  final String gameId;

  const Theme({
    required this.id,
    required this.subjectId,
    required this.title,
    required this.lessonId,
    required this.gameId,
  });
}

class Lesson {
  final String id;
  final String title;
  final String videoAsset;

  const Lesson({
    required this.id,
    required this.title,
    required this.videoAsset,
  });
}

class GameDefinition {
  final String id;
  final String type;
  final String title;
  final Map<String, dynamic> config;

  const GameDefinition({
    required this.id,
    required this.type,
    required this.title,
    required this.config,
  });
}
