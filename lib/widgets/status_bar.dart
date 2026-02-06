import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:google_fonts/google_fonts.dart';

class StatusBar extends StatelessWidget {
  const StatusBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
      decoration: const BoxDecoration(
        color: Colors.transparent,
        border: Border(bottom: BorderSide(color: Colors.white10)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Text("PRO", style: GoogleFonts.sairaStencilOne(fontSize: 24, color: const Color(0xFFFF3B30))),
              Text("SAFE", style: GoogleFonts.sairaStencilOne(fontSize: 24, color: Colors.white)),
            ],
          ),
          const Row(
            children: [
              Icon(LucideIcons.crosshair, size: 16, color: Color(0xFF0A84FF)),
              SizedBox(width: 5),
              Text("GPS", style: TextStyle(color: Color(0xFF0A84FF), fontWeight: FontWeight.bold)),
              SizedBox(width: 15),
              Icon(LucideIcons.batteryFull, size: 16, color: Color(0xFF32D74B)),
              SizedBox(width: 5),
              Text("100%", style: TextStyle(color: Color(0xFF32D74B), fontWeight: FontWeight.bold)),
            ],
          )
        ],
      ),
    );
  }
}
