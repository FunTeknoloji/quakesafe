import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

class ToolsScreen extends StatelessWidget {
  const ToolsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 2,
      padding: const EdgeInsets.all(20),
      mainAxisSpacing: 15,
      crossAxisSpacing: 15,
      children: [
        _toolCard("Çakar Fener", "Kör Edici Işık", LucideIcons.zap, Colors.yellow),
        _toolCard("Polis Modu", "Kırmızı/Mavi", LucideIcons.siren, Colors.blue),
        _toolCard("Köpek Düdüğü", "Ultrasonik", LucideIcons.mic, Colors.orange),
        _toolCard("Sinyal Aynası", "Haberleşme", LucideIcons.scanFace, Colors.green),
      ],
    );
  }

  Widget _toolCard(String title, String subtitle, IconData icon, Color color) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1A1A1A),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 40, color: color),
          const SizedBox(height: 15),
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16), textAlign: TextAlign.center),
          const SizedBox(height: 5),
          Text(subtitle, style: const TextStyle(fontSize: 12, color: Colors.grey), textAlign: TextAlign.center),
        ],
      ),
    );
  }
}
