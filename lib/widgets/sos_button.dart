import 'dart:async';
import 'package:flutter/material.dart';
import 'package:vibration/vibration.dart';
import 'package:torch_light/torch_light.dart';

class SosButton extends StatefulWidget {
  const SosButton({super.key});

  @override
  State<SosButton> createState() => _SosButtonState();
}

class _SosButtonState extends State<SosButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  Timer? _holdTimer;
  bool _isHolding = false;
  double _progress = 0.0;
  final int _durationMs = 1500;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onDown(TapDownDetails details) {
    setState(() => _isHolding = true);
    _progress = 0.0;
    
    // Simulate progress
    const step = 50;
    _holdTimer = Timer.periodic(const Duration(milliseconds: step), (timer) {
      if (!_isHolding) {
        timer.cancel();
        return;
      }
      setState(() {
        _progress += step / _durationMs;
      });
      
      if (_progress >= 1.0) {
        timer.cancel();
        _inputSuccess();
      }
    });
  }

  void _onUp(TapUpDetails details) {
    _reset();
  }

  void _onCancel() {
    _reset();
  }
  
  void _reset() {
    setState(() {
      _isHolding = false;
      _progress = 0.0;
    });
    _holdTimer?.cancel();
  }

  Future<void> _inputSuccess() async {
    // TRIGGER SOS
    if (await Vibration.hasVibrator() ?? false) {
      Vibration.vibrate(pattern: [0, 500, 100, 500]);
    }
    try {
      // Simple toggle for demo
      await TorchLight.enableTorch();
      await Future.delayed(const Duration(milliseconds: 500));
      await TorchLight.disableTorch();
    } catch (e) {
      debugPrint("Torch error: $e");
    }
    
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('ACİL DURUM MODU BAŞLATILDI!', 
            style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
            textAlign: TextAlign.center,
          ),
          backgroundColor: Colors.red[900],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: _onDown,
      onTapUp: _onUp,
      onTapCancel: _onCancel,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Pulse Ring
          AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              return Container(
                width: 250 + (_controller.value * 20),
                height: 250 + (_controller.value * 20),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: const Color(0xFFFF3B30).withOpacity(0.3 * (1 - _controller.value)),
                    width: 2,
                  ),
                ),
              );
            },
          ),
          // Progress Ring
          SizedBox(
            width: 220,
            height: 220,
            child: CircularProgressIndicator(
              value: _progress,
              strokeWidth: 8,
              backgroundColor: Colors.transparent,
              valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
            ),
          ),
          // Main Button
          Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [Color(0xFFCC0000), Color(0xFF880000)],
              ),
              boxShadow: [
                 BoxShadow(
                   color: const Color(0xFFFF3B30).withOpacity(0.6),
                   blurRadius: 30,
                   spreadRadius: 5,
                 )
              ],
              border: Border.all(color: const Color(0xFFFF4444), width: 4),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.power_settings_new, size: 60, color: Colors.white),
                const SizedBox(height: 10),
                Text(
                  "SOS",
                  style: GoogleFonts.sairaStencilOne(
                    fontSize: 40,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
