import React from 'react';
import { BookOpen, Compass, Award, PenTool, BrainCircuit, BookmarkCheck, MapPin, Globe } from 'lucide-react';
import { LanguageMedium, UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: LanguageMedium;
  setLanguage: (lang: LanguageMedium) => void;
  userProfile: UserProfile;
  onOpenDiagnostic: () => void;
  mistakeCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  userProfile,
  onOpenDiagnostic,
  mistakeCount,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Roadmap', icon: Compass },
    { id: 'syllabus', label: '12-Step Syllabus', icon: BookOpen },
    { id: 'test-mode', label: 'Test Mode', icon: Award },
    { id: 'mentor', label: 'Mentor AI', icon: BrainCircuit },
    { id: 'mistakes', label: `Error Log (${mistakeCount})`, icon: BookmarkCheck },
    { id: 'revision', label: '5-3-2-1-1 Recall', icon: PenTool },
    { id: 'rajasthan-vault', label: 'Rajasthan Layer', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-left group focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-tight text-amber-300 group-hover:text-amber-200 transition-colors">
                मार्गदर्शक <span className="text-xs uppercase tracking-widest text-slate-400 font-sans ml-1">Margdarshak</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
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
        <div className="flex items-center gap-2.5 shrink-0">
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors shadow-sm font-sans whitespace-nowrap cursor-pointer"
          >
            <span>{userProfile.isDiagnosticComplete ? 'Edit Profile' : 'Take Diagnostic'}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden flex items-center justify-between gap-1 overflow-x-auto pt-2.5 border-t border-slate-900 mt-2 text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2.5 py-1 whitespace-nowrap rounded font-medium ${
              activeTab === item.id ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
