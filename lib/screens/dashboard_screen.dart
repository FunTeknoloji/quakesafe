import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/sos_button.dart';
import '../widgets/status_bar.dart';
import 'tools_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // HUD Header
            const StatusBar(),
            
            // Main Content
            Expanded(
              child: IndexedStack(
                index: _selectedIndex,
                children: [
                   _buildHomeView(),
                   const ToolsScreen(),
                   const Center(child: Text("Bilgi Sayfası Hazırlanıyor...")),
                   const Center(child: Text("Profil Sayfası Hazırlanıyor...")),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (i) => setState(() => _selectedIndex = i),
        backgroundColor: const Color(0xFF111111),
        indicatorColor: const Color(0xFFFF3B30).withOpacity(0.2),
        destinations: const [
          NavigationDestination(icon: Icon(LucideIcons.activity), label: 'ACİL'),
          NavigationDestination(icon: Icon(LucideIcons.briefcase), label: 'ARAÇLAR'),
          NavigationDestination(icon: Icon(LucideIcons.bookOpen), label: 'BİLGİ'),
          NavigationDestination(icon: Icon(LucideIcons.user), label: 'KİMLİK'),
        ],
      ),
    );
  }

  Widget _buildHomeView() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Spacer(),
          const SosButton(),
          const SizedBox(height: 20),
          Text(
            "BASILI TUT: ACİL YAYIN",
            style: TextStyle(
              color: Colors.grey[600],
              fontStyle: FontStyle.italic,
              letterSpacing: 1.2,
            ),
          ),
          const Spacer(),
          _buildQuickActions(),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildQuickActions() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 30),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _actionBtn("Fener", LucideIcons.flashlight, () {}),
          _actionBtn("Düdük", LucideIcons.volume2, () {}),
          _actionBtn("Konum", LucideIcons.mapPin, () {}),
        ],
      ),
    );
  }

  Widget _actionBtn(String label, IconData icon, VoidCallback onTap) {
    return Column(
      children: [
        Container(
          width: 60,
          height: 60,
          decoration: BoxDecoration(
            color: const Color(0xFF222222),
            borderRadius: BorderRadius.circular(15),
            border: Border.all(color: Colors.white12),
          ),
          child: IconButton(
            icon: Icon(icon, color: Colors.white),
            onPressed: onTap,
          ),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
      ],
    );
  }
}
