"""Prepare widget-render capture harnesses inside disposable source checkouts.

Usage: python scripts/capture-flutter-previews.py SOURCE_ROOT
Then run flutter test --no-pub test/portfolio_capture_test.dart in each checkout.
The portfolio ships only compressed screen renders and small navigation hotspots.
"""
from pathlib import Path
import os
import re
import sys
import urllib.request

root = Path(sys.argv[1]).resolve()
captures = root / 'portfolio-native-renders'
fonts = captures / 'fonts'
fonts.mkdir(parents=True, exist_ok=True)
for family, remote in {
    'Syne': 'syne/Syne[wght].ttf', 'Inter': 'inter/Inter[opsz,wght].ttf',
    'SpaceMono': 'spacemono/SpaceMono-Regular.ttf', 'serif': 'notoserif/NotoSerif[wdth,wght].ttf',
}.items():
    dest = fonts / (family + '.ttf')
    if not dest.exists():
        url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/' + remote
        dest.write_bytes(urllib.request.urlopen(url, timeout=30).read())

common = r'''
import 'dart:io';
import 'dart:convert';
import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

final captureKey = GlobalKey();
const captureRoot = r'CAPTURE_ROOT';
Future<void> loadCaptureFonts() async {
  for (final name in ['Roboto', 'MaterialIcons', 'Syne', 'Inter', 'SpaceMono', 'serif', 'monospace', 'Courier', 'Georgia', 'sans-serif']) {
    final path = name == 'Roboto' ? r'C:/Users/sange/flutter/bin/cache/artifacts/material_fonts/roboto-regular.ttf'
      : name == 'MaterialIcons' ? r'C:/Users/sange/flutter/bin/cache/artifacts/material_fonts/materialicons-regular.otf'
      : ['monospace', 'Courier'].contains(name) ? r'FONT_ROOT/SpaceMono.ttf'
      : name == 'Georgia' ? r'FONT_ROOT/serif.ttf'
      : name == 'sans-serif' ? r'C:/Users/sange/flutter/bin/cache/artifacts/material_fonts/roboto-regular.ttf'
      : r'FONT_ROOT/' + name + '.ttf';
    final loader = FontLoader(name)..addFont(Future.value(ByteData.sublistView(File(path).readAsBytesSync())));
    await loader.load();
  }
}
Future<void> settleCapture(WidgetTester tester) async {
  await tester.pump();
  await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 150)));
  for (var i = 0; i < 10; i++) { await tester.pump(const Duration(milliseconds: 60)); }
}
Future<void> captureScreen(WidgetTester tester, String app, String name, Map<String, String> links) async {
  await settleCapture(tester);
  final boundary = captureKey.currentContext!.findRenderObject() as RenderRepaintBoundary;
  final dir = Directory('$captureRoot/$app')..createSync(recursive: true);
  await tester.runAsync(() async {
    final image = await boundary.toImage(pixelRatio: 1.5);
    final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
    File('${dir.path}/$name.png').writeAsBytesSync(bytes!.buffer.asUint8List());
    image.dispose();
  });
  final targets = <Map<String, dynamic>>[];
  for (final entry in links.entries) {
    for (final element in find.text(entry.key).hitTestable().evaluate()) {
      final rect = tester.getRect(find.byElementPredicate((e) => e == element));
      targets.add({'label': entry.key, 'target': entry.value, 'x': rect.left, 'y': rect.top, 'width': rect.width, 'height': rect.height});
    }
  }
  for (final icon in [Icons.add, Icons.add_rounded, Icons.add_outlined, Icons.edit, Icons.edit_rounded, Icons.edit_outlined]) {
    for (final element in find.byIcon(icon).hitTestable().evaluate()) {
      final rect = tester.getRect(find.byElementPredicate((e) => e == element));
      targets.add({'label': 'Create new entry', 'target': 'compose', 'x': rect.left - 10, 'y': rect.top - 10, 'width': rect.width + 20, 'height': rect.height + 20});
    }
  }
  final fields = <Map<String, dynamic>>[];
  for (final element in find.byType(TextField).hitTestable().evaluate()) {
    final field = element.widget as TextField;
    final rect = tester.getRect(find.byElementPredicate((e) => e == element));
    fields.add({'hint': field.decoration?.hintText ?? field.decoration?.labelText ?? 'Demo input',
      'value': field.controller?.text ?? '', 'multiline': field.maxLines != 1,
      'fontSize': field.style?.fontSize ?? 16, 'x': rect.left, 'y': rect.top, 'width': rect.width, 'height': rect.height});
  }
  File('${dir.path}/$name.json').writeAsStringSync(jsonEncode({'name': name, 'width': 390, 'height': 680, 'targets': targets, 'fields': fields}));
  print('$app/$name: original Flutter screen rendered');
}
'''.replace('CAPTURE_ROOT', captures.as_posix()).replace('FONT_ROOT', fonts.as_posix())

dayform = r'''
import 'package:dayform/core/state/app_state.dart';
import 'package:dayform/core/database/app_database.dart';
import 'package:dayform/core/theme/app_theme.dart';
import 'package:dayform/domain/models/user_settings.dart';
import 'package:dayform/domain/repositories/schedule_repository.dart';
import 'package:dayform/domain/repositories/task_repository.dart';
import 'package:dayform/domain/repositories/bill_repository.dart';
import 'package:dayform/domain/repositories/birthday_repository.dart';
import 'package:dayform/domain/repositories/habit_repository.dart';
import 'package:dayform/domain/repositories/focus_repository.dart';
import 'package:dayform/domain/repositories/settings_repository.dart';
import 'package:dayform/features/navigation/main_scaffold.dart';
import 'package:dayform/features/settings/settings_screen.dart';

class PreviewState extends AppState {
  PreviewState(AppDatabase db): super(scheduleRepo: ScheduleRepository(db), taskRepo: TaskRepository(db),
    billRepo: BillRepository(db), birthdayRepo: BirthdayRepository(db), habitRepo: HabitRepository(db),
    focusRepo: FocusRepository(db), settingsRepo: SettingsRepository(db));
  @override bool get isLoading => false;
  @override UserSettings get settings => const UserSettings(userName: 'Demo visitor', hasCompletedOnboarding: true, reducedMotion: true);
  @override DateTime get selectedDate => DateTime(2026, 11, 6);
}
void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  testWidgets('Capture original Dayform screens', (tester) async {
    tester.view.physicalSize = const Size(390, 680); tester.view.devicePixelRatio = 1;
    await loadCaptureFonts();
    final state = PreviewState(AppDatabase.inMemory());
    await tester.pumpWidget(RepaintBoundary(key: captureKey, child: AppStateProvider(appState: state,
      child: MaterialApp(debugShowCheckedModeBanner: false, theme: AppTheme.lightTheme, home: MainScaffold(appState: state)))));
    const labels = ['Today', 'Calendar', 'Tasks', 'My Space', 'Settings'];
    const names = ['index', 'calendar', 'tasks', 'space', 'settings'];
    final links = {for (var i=0;i<labels.length;i++) labels[i]: names[i]};
    for (var i=0;i<labels.length;i++) {
      await tester.tap(find.byType(NavigationDestination).at(i));
      await captureScreen(tester, 'dayform', names[i], links);
    }
    await tester.tap(find.byType(NavigationDestination).first); await settleCapture(tester);
    await tester.tap(find.byType(FloatingActionButton).first);
    await captureScreen(tester, 'dayform', 'compose', {...links, 'Event': 'compose', 'Task': 'tasks', 'Save': 'index', 'Cancel': 'index'});
    await tester.pumpWidget(const SizedBox()); state.dispose();
  });
}
'''

rewind = r'''
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:spool/core/constants/app_theme.dart';
import 'package:spool/features/library/presentation/providers/library_provider.dart';
import 'package:spool/features/settings/presentation/providers/settings_provider.dart';
import 'package:spool/features/settings/domain/app_settings.dart';
import 'package:spool/features/audio_player/presentation/providers/audio_player_provider.dart';
import 'package:spool/features/audio_player/domain/audio_track.dart';
import 'package:spool/features/audio_player/domain/playback_state.dart';
import 'package:spool/features/navigation/presentation/screens/main_shell_screen.dart';
final tracks = [for (var i=0;i<3;i++) AudioTrack(id:'demo-$i',title:['Midnight Side A','Golden Hour','Coastal Drive'][i],artist:'Demo library',album:'Portfolio sessions',durationMs:180000,uri:'demo://track-$i',path:'',fileExtension:'flac')];
class PreviewLibrary extends StateNotifier<LibraryState> implements LibraryNotifier {
  PreviewLibrary():super(LibraryState(allSongs:tracks));
  @override dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(invocation);
}
class PreviewSettings extends StateNotifier<AppSettings> implements SettingsNotifier {
  PreviewSettings():super(const AppSettings());
  @override dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(invocation);
}
class PreviewPlayback extends StateNotifier<SpoolPlaybackState> implements PlaybackNotifier {
  PreviewPlayback():super(SpoolPlaybackState(currentTrack:tracks.first,queue:tracks,position:const Duration(seconds:42),duration:const Duration(minutes:3)));
  @override dynamic noSuchMethod(Invocation invocation) => super.noSuchMethod(invocation);
  void setPlaying(bool value) { state=state.copyWith(isPlaying:value); }
}
void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  testWidgets('Capture original Rewind screens', (tester) async {
    tester.view.physicalSize = const Size(390, 680); tester.view.devicePixelRatio = 1;
    await loadCaptureFonts();
    await tester.pumpWidget(RepaintBoundary(key:captureKey, child:ProviderScope(overrides:[
      libraryNotifierProvider.overrideWith((ref)=>PreviewLibrary()), settingsNotifierProvider.overrideWith((ref)=>PreviewSettings()),
      playbackNotifierProvider.overrideWith((ref)=>PreviewPlayback())],child:MaterialApp(debugShowCheckedModeBanner:false,theme:AppTheme.getTheme(),home:const MainShellScreen()))));
    const labels=['HOME','LIBRARY','WALKMAN','FOLDERS','SETUP'];
    const names=['index','library','walkman','folders','settings'];
    final links={for(var i=0;i<labels.length;i++) labels[i]:names[i], 'Midnight Side A':'walkman', 'PLAY':'playing', 'PAUSE':'walkman', 'BACK':'index'};
    for(var i=0;i<labels.length;i++) {
      await tester.tap(find.text(labels[i]).hitTestable().last);
      await captureScreen(tester,'rewind',names[i],links);
    }
    await tester.tap(find.text('WALKMAN').hitTestable().last);
    final scope=ProviderScope.containerOf(tester.element(find.byType(MainShellScreen)));
    (scope.read(playbackNotifierProvider.notifier) as PreviewPlayback).setPlaying(true);
    await captureScreen(tester,'rewind','playing',links);
    await tester.pumpWidget(const SizedBox());
  });
}
'''

chronicle = r'''
import 'package:drift/drift.dart' show Value;
import 'package:drift/native.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:chronicle/main.dart';
import 'package:chronicle/data/local/app_database.dart';
import 'package:chronicle/presentation/providers/database_provider.dart';
import 'package:chronicle/presentation/router/app_router.dart';
void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  testWidgets('Capture original Chronicle screens', (tester) async {
    tester.view.physicalSize=const Size(390,680);tester.view.devicePixelRatio=1;
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger.setMockMethodCallHandler(
      const MethodChannel('com.llfbandit.record/messages'), (call) async => null);
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger.setMockMethodCallHandler(
      const MethodChannel('com.chronicle.journal/music_service'), (call) async => false);
    await loadCaptureFonts();
    SharedPreferences.setMockInitialValues({'onboarding_completed':true,'theme_mode':'light','music_integration_enabled':false,'reader_bg_mode':'desk'});
    final db=AppDatabase(NativeDatabase.memory());
    await tester.runAsync(() async {
      await db.into(db.journalEntries).insert(JournalEntriesCompanion.insert(id:'demo-entry',title:const Value('Small moments, kept close'),content:'A sample journal entry for this portfolio preview.',createdAt:DateTime(2026,11,6),updatedAt:DateTime(2026,11,6),entryDate:DateTime(2026,11,6)));
    });
    final container=ProviderContainer(overrides:[databaseProvider.overrideWithValue(db)]);
    await tester.pumpWidget(RepaintBoundary(key:captureKey,child:UncontrolledProviderScope(container:container,child:const MioraApp())));
    await settleCapture(tester);
    final router=container.read(appRouterProvider);
    const routes={'index':'/','journal':'/journal','calendar':'/calendar','insights':'/insights','settings':'/settings','compose':'/editor','entry':'/entry/demo-entry'};
    const links={'Home':'index','Journal':'journal','Calendar':'calendar','Insights':'insights','Settings':'settings','New Entry':'compose','Small moments, kept close':'entry','Save':'journal','Cancel':'index'};
    for(final entry in routes.entries) {
      router.go(entry.value);
      await captureScreen(tester,'chronicle',entry.key,links);
    }
    await tester.pumpWidget(const SizedBox()); router.dispose(); container.dispose();
    await tester.pumpAndSettle(const Duration(milliseconds: 20));
    // This isolated renderer process owns the in-memory database; no disk data exists.
  });
}
'''

for repo, code in [('dayform', dayform), ('rewind', rewind), ('chronicle-journal', chronicle)]:
    checkout = root / ('portfolio-native-' + repo)
    if repo == 'chronicle-journal':
        shell = checkout / 'lib/presentation/screens/shell/navigation_shell.dart'
        text = shell.read_text(encoding='utf-8').replace('body: navigationShell,', 'body: HeroMode(enabled: false, child: navigationShell),')
        shell.write_text(text, encoding='utf-8')
        editor = checkout / 'lib/presentation/screens/editor/editor_screen.dart'
        text = editor.read_text(encoding='utf-8')
        # An Expanded spacer cannot be laid out in the source's horizontal toolbar.
        start = text.index('child: SingleChildScrollView(', text.index('Widget build'))
        position = text.rfind('const Spacer(),', start)
        if position >= start:
            text = text[:position] + 'const SizedBox(width: 16),' + text[position + len('const Spacer(),'):]
        editor.write_text(text, encoding='utf-8')
    # Keep every original style value, resolving Google Fonts from local TTFs for rendering.
    if repo == 'rewind':
        typography = checkout / 'lib/core/constants/app_typography.dart'
        text = typography.read_text(encoding='utf-8')
        for name, family in [('syne', 'Syne'), ('inter', 'Inter'), ('spaceMono', 'SpaceMono')]:
            text = text.replace('GoogleFonts.' + name + '(', "TextStyle(fontFamily: '" + family + "',")
        text = text.replace("import 'package:google_fonts/google_fonts.dart';\n", '')
        typography.write_text(text, encoding='utf-8')
    imports = re.findall(r"^import [^\n]+;", code, re.M)
    body = re.sub(r"^import [^\n]+;\n", '', code, flags=re.M)
    split = common.index('final captureKey')
    harness = common[:split] + '\n'.join(imports) + '\n' + common[split:] + body
    (checkout / 'test/portfolio_capture_test.dart').write_text(harness, encoding='utf-8')
    print('Prepared original widget capture:', repo)
