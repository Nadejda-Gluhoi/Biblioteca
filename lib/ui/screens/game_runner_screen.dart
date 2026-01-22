import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../domain/entities.dart';
import '../providers.dart';
import '../widgets.dart';

class GameRunnerScreen extends ConsumerWidget {
  final String gameId;

  const GameRunnerScreen({
    super.key,
    required this.gameId,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final gameAsync = ref.watch(gameDefinitionProvider(gameId));
    return Scaffold(
      appBar: AppBar(title: const Text('Game Runner')),
      body: gameAsync.when(
        data: (game) => _GameBody(game: game),
        loading: () => const LoadingView(),
        error: (error, stackTrace) =>
            ErrorView(message: error.toString()),
      ),
    );
  }
}

class _GameBody extends StatelessWidget {
  final GameDefinition game;

  const _GameBody({required this.game});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          game.title,
          style: Theme.of(context).textTheme.headlineSmall,
        ),
        const SizedBox(height: 12),
        ..._buildGameWidgets(context, game),
      ],
    );
  }

  List<Widget> _buildGameWidgets(
    BuildContext context,
    GameDefinition game,
  ) {
    switch (game.type) {
      case 'quiz':
        return _buildQuiz(game);
      case 'match':
        return _buildMatch(game);
      default:
        return [
          Text('Unknown game type: ${game.type}'),
          const SizedBox(height: 8),
          const Text('Add a widget renderer for this game type.'),
        ];
    }
  }

  List<Widget> _buildQuiz(GameDefinition game) {
    final question = game.config['question'] as String? ?? 'Question';
    final options = (game.config['options'] as List?)
            ?.whereType<String>()
            .toList() ??
        const <String>[];

    return [
      Text(
        question,
        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
      ),
      const SizedBox(height: 12),
      ...options.map(
        (option) => Card(
          child: ListTile(
            title: Text(option),
            leading: const Icon(Icons.radio_button_unchecked),
            onTap: () {},
          ),
        ),
      ),
    ];
  }

  List<Widget> _buildMatch(GameDefinition game) {
    final rawPairs = game.config['pairs'];
    final pairs = <Map<String, dynamic>>[];
    if (rawPairs is List) {
      for (final pair in rawPairs) {
        if (pair is Map) {
          pairs.add(Map<String, dynamic>.from(pair));
        }
      }
    }

    return [
      const Text(
        'Match the items',
        style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
      ),
      const SizedBox(height: 12),
      ...pairs.map(
        (pair) => Card(
          child: ListTile(
            title: Text(pair['left']?.toString() ?? ''),
            subtitle: Text(pair['right']?.toString() ?? ''),
            trailing: const Icon(Icons.compare_arrows),
          ),
        ),
      ),
    ];
  }
}
