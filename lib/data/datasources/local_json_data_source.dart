import 'dart:convert';

import 'package:flutter/services.dart';

class LocalJsonDataSource {
  Future<List<Map<String, dynamic>>> loadList(String assetPath) async {
    final jsonString = await rootBundle.loadString(assetPath);
    final decoded = jsonDecode(jsonString);
    if (decoded is! List) {
      throw FormatException('Expected a JSON list in $assetPath');
    }
    return decoded
        .map((item) => Map<String, dynamic>.from(item as Map))
        .toList();
  }
}
