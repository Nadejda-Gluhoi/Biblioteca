import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../providers.dart';
import '../widgets.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final subjectsAsync = ref.watch(subjectsProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Select Subject')),
      body: subjectsAsync.when(
        data: (subjects) {
          if (subjects.isEmpty) {
            return const Center(child: Text('No subjects available.'));
          }
          return ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: subjects.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final subject = subjects[index];
              return Card(
                child: ListTile(
                  title: Text(subject.name),
                  subtitle: Text(subject.description),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () {
                    context.go('/subjects/${subject.id}/themes');
                  },
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
