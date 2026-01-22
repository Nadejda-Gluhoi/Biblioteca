import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../providers.dart';
import '../widgets.dart';

class ThemeListScreen extends ConsumerWidget {
  final String subjectId;

  const ThemeListScreen({
    super.key,
    required this.subjectId,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themesAsync = ref.watch(themesProvider(subjectId));
    return Scaffold(
      appBar: AppBar(title: Text('Themes: $subjectId')),
      body: themesAsync.when(
        data: (themes) {
          if (themes.isEmpty) {
            return const Center(child: Text('No themes for this subject.'));
          }
          return ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: themes.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final theme = themes[index];
              return Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        theme.title,
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: 12),
                      Wrap(
                        spacing: 12,
                        children: [
                          ElevatedButton.icon(
                            onPressed: () {
                              context.push('/lessons/${theme.lessonId}');
                            },
                            icon: const Icon(Icons.play_circle_fill),
                            label: const Text('Lesson'),
                          ),
                          OutlinedButton.icon(
                            onPressed: () {
                              context.push('/games/${theme.gameId}');
                            },
                            icon: const Icon(Icons.extension),
                            label: const Text('Game'),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
        loading: () => const LoadingView(),
        error: (error, stackTrace) =>
            ErrorView(message: error.toString()),
      ),
    );
  }
}
