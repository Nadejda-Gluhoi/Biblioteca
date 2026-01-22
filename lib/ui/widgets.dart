import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class LoadingView extends StatelessWidget {
  const LoadingView({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: CircularProgressIndicator());
  }
}

class ErrorView extends StatelessWidget {
  final String message;

  const ErrorView({
    super.key,
    required this.message,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Text(
          message,
          textAlign: TextAlign.center,
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ),
    );
  }
}

class LessonVideoPlayer extends StatefulWidget {
  final String videoAsset;

  const LessonVideoPlayer({
    super.key,
    required this.videoAsset,
  });

  @override
  State<LessonVideoPlayer> createState() => _LessonVideoPlayerState();
}

class _LessonVideoPlayerState extends State<LessonVideoPlayer> {
  late VideoPlayerController _controller;
  late Future<void> _initializeFuture;

  @override
  void initState() {
    super.initState();
    _initializeController();
  }

  @override
  void didUpdateWidget(covariant LessonVideoPlayer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.videoAsset != widget.videoAsset) {
      _controller.dispose();
      _initializeController();
    }
  }

  void _initializeController() {
    _controller = VideoPlayerController.asset(widget.videoAsset);
    _initializeFuture = _controller.initialize();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
      future: _initializeFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState != ConnectionState.done) {
          return const LoadingView();
        }
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            AspectRatio(
              aspectRatio: _controller.value.aspectRatio,
              child: VideoPlayer(_controller),
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  icon: Icon(
                    _controller.value.isPlaying
                        ? Icons.pause_circle
                        : Icons.play_circle,
                  ),
                  iconSize: 36,
                  onPressed: () {
                    setState(() {
                      if (_controller.value.isPlaying) {
                        _controller.pause();
                      } else {
                        _controller.play();
                      }
                    });
                  },
                ),
                Text(_controller.value.isPlaying ? 'Playing' : 'Paused'),
              ],
            ),
          ],
        );
      },
    );
  }
}
