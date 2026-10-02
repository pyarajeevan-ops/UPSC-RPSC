import React from 'react';
import { BookOpen, Compass, Award, PenTool, BrainCircuit, BookmarkCheck, MapPin, Globe, GraduationCap, Search, Calendar, FolderClock, Library } from 'lucide-react';
import { LanguageMedium, UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: LanguageMedium;
  setLanguage: (lang: LanguageMedium) => void;
  userProfile: UserProfile;
  onOpenDiagnostic: () => void;
  mistakeCount: number;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  userProfile,
  onOpenDiagnostic,
  mistakeCount,
  onOpenCommandPalette,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Roadmap', icon: Compass },
    { id: 'curriculum', label: 'Curriculum', icon: GraduationCap },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: Library },
    { id: 'notes-history', label: 'Notes & Vault', icon: FolderClock },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'test-mode', label: 'Test Mode', icon: Award },
    { id: 'mentor', label: 'Mentor AI', icon: BrainCircuit },
    { id: 'mistakes', label: `Error Log (${mistakeCount})`, icon: BookmarkCheck },
    { id: 'revision', label: '5-3-2-1-1 Recall', icon: PenTool },
    { id: 'rajasthan-vault', label: 'Rajasthan Layer', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-4 lg:px-8 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Zone 1: Brand & Command Palette Quick Search */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-left group focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-amber-300 group-hover:text-amber-200 transition-colors">
                मार्गदर्शक <span className="text-xs uppercase tracking-widest text-slate-400 font-sans ml-1 hidden sm:inline">Margdarshak</span>
              </span>
            </div>
          </button>

          {/* Quick Jump Command Palette Button */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800/90 hover:border-amber-500/40 text-xs text-slate-400 hover:text-slate-200 transition-all cursor-pointer group"
              title="Search topics, views & commands (Ctrl+K or Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-medium hidden md:inline">Jump to...</span>
              <kbd className="px-1.5 py-0.2 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-500 font-mono group-hover:text-amber-300 transition-colors">
                ⌘K
              </kbd>
            </button>
          )}
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Language Segmented Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setLanguage('English')}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                language === 'English'
                  ? 'bg-slate-800 text-amber-300 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ENG
            </button>
            <button
              onClick={() => setLanguage('Hindi')}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                language === 'Hindi'
                  ? 'bg-slate-800 text-amber-300 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('Bilingual')}
              className={`px-2 py-1 rounded transition-colors whitespace-nowrap hidden sm:inline-block ${
                language === 'Bilingual'
                  ? 'bg-slate-800 text-amber-300 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hinglish
            </button>
          </div>

          {/* Profile Intake button */}
          <button
            onClick={onOpenDiagnostic}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors shadow-sm font-sans whitespace-nowrap cursor-pointer"
          >
            <span>{userProfile.isDiagnosticComplete ? 'Profile' : 'Diagnostic'}</span>
          </button>
        </div>
      </div>

      {/* Sub-header horizontal navigation bar for mobile & tablet */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-900 mt-2 text-xs scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1 whitespace-nowrap rounded-lg font-medium flex items-center gap-1 shrink-0 transition-colors ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950/60'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
