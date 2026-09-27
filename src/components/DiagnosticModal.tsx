import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Sliders, Sparkles, BookOpen, Clock, Target, ShieldAlert } from 'lucide-react';
import { UserProfile, LanguageMedium } from '../types';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

const ALL_SUBJECTS = [
  'Indian Polity & Constitution',
  'Ancient & Medieval History',
  'Modern Indian History',
  'Art & Culture',
  'Physical & Indian Geography',
  'Rajasthan Geography',
  'Indian Economy',
  'Rajasthan Economy & Budget',
  'Environment & Ecology',
  'General Science & Technology',
  'Current Affairs & Schemes',
  'Rajasthan History & Heritage'
];

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
}) => {
  const [profile, setProfile] = useState<UserProfile>(currentProfile);

  useEffect(() => {
    if (isOpen) {
      setProfile(currentProfile);
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const toggleSubject = (sub: string, type: 'strong' | 'weak') => {
    if (type === 'strong') {
      const exists = profile.strongSubjects.includes(sub);
      const updated = exists
        ? profile.strongSubjects.filter((s) => s !== sub)
        : [...profile.strongSubjects, sub];
      setProfile({
        ...profile,
        strongSubjects: updated,
        weakSubjects: profile.weakSubjects.filter((s) => s !== sub),
      });
    } else {
      const exists = profile.weakSubjects.includes(sub);
      const updated = exists
        ? profile.weakSubjects.filter((s) => s !== sub)
        : [...profile.weakSubjects, sub];
      setProfile({
        ...profile,
        weakSubjects: updated,
        strongSubjects: profile.strongSubjects.filter((s) => s !== sub),
      });
    }
  };

  const handleApplyPreset = (presetType: 'dual-fulltime' | 'working-pro' | 'ras-specialist') => {
    if (presetType === 'dual-fulltime') {
      setProfile({
        targetExam: 'Dual (UPSC + RPSC)',
        targetYear: '2026',
        attemptNumber: 1,
        studyHours: 8,
        medium: 'English',
        prepLevel: 'Intermediate',
        strongSubjects: ['Indian Polity & Constitution', 'Modern Indian History'],
        weakSubjects: ['Rajasthan Geography', 'Rajasthan Economy & Budget'],
        mainsIntegrated: true,
        preferredSchedule: 'Regular Day',
        isDiagnosticComplete: true,
      });
    } else if (presetType === 'working-pro') {
      setProfile({
        targetExam: 'Dual (UPSC + RPSC)',
        targetYear: '2026',
        attemptNumber: 2,
        studyHours: 5,
        medium: 'Bilingual',
        prepLevel: 'Intermediate',
        strongSubjects: ['Indian Economy', 'Current Affairs & Schemes'],
        weakSubjects: ['Art & Culture', 'Rajasthan History & Heritage'],
        mainsIntegrated: false,
        preferredSchedule: 'Working Professional Modular',
        isDiagnosticComplete: true,
      });
    } else {
      setProfile({
        targetExam: 'RPSC RAS',
        targetYear: '2026',
        attemptNumber: 1,
        studyHours: 7,
        medium: 'Hindi',
        prepLevel: 'Beginner',
        strongSubjects: ['General Science & Technology', 'Environment & Ecology'],
        weakSubjects: ['Rajasthan History & Heritage', 'Ancient & Medieval History'],
        mainsIntegrated: true,
        preferredSchedule: 'Early Morning',
        isDiagnosticComplete: true,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...profile,
      isDiagnosticComplete: true,
    });
    onClose();
  };

  // 70-20-10 calculation based on study hours
  const commonHours = ((profile.studyHours * 0.70)).toFixed(1);
  const rajasthanHours = ((profile.studyHours * 0.20)).toFixed(1);
  const testHours = ((profile.studyHours * 0.10)).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-xl max-w-3xl w-full my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Aspirant Diagnostic Intake & Strategy Calibration</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalize your integrated UPSC CSE & RPSC RAS dual preparation roadmap
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Quick Presets */}
          <div className="bg-slate-950/40 border border-slate-800 p-3.5 rounded-lg">
            <span className="text-xs font-semibold text-slate-400 block mb-2">
              Quick Baseline Presets:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset('dual-fulltime')}
                className="px-3 py-2 text-xs bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md text-left transition-colors"
              >
                <div className="font-semibold text-amber-300">Serious Full-Time Dual</div>
                <div className="text-[11px] text-slate-400 mt-0.5">8 hrs/day · 70:20:10 ratio</div>
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('working-pro')}
                className="px-3 py-2 text-xs bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md text-left transition-colors"
              >
                <div className="font-semibold text-amber-300">Working Professional</div>
                <div className="text-[11px] text-slate-400 mt-0.5">5 hrs/day · Modular slots</div>
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('ras-specialist')}
                className="px-3 py-2 text-xs bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md text-left transition-colors"
              >
                <div className="font-semibold text-amber-300">RPSC RAS Focused (Hindi)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">7 hrs/day · State priority</div>
              </button>
            </div>
          </div>

          {/* Section 1: Target Exam & Attempt */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Examination
              </label>
              <select
                value={profile.targetExam}
                onChange={(e) => setProfile({ ...profile, targetExam: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Dual (UPSC + RPSC)">Dual (UPSC CSE & RPSC RAS)</option>
                <option value="UPSC CSE">UPSC CSE (Primary)</option>
                <option value="RPSC RAS">RPSC RAS (Primary)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Year
              </label>
              <select
                value={profile.targetYear}
                onChange={(e) => setProfile({ ...profile, targetYear: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="2026">2026 Attempt</option>
                <option value="2027">2027 Attempt</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Medium of Examination
              </label>
              <select
                value={profile.medium}
                onChange={(e) => setProfile({ ...profile, medium: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="English">English Medium</option>
                <option value="Hindi">हिन्दी माध्यम (Devanagari)</option>
                <option value="Bilingual">Bilingual (English + Hindi concepts)</option>
              </select>
            </div>
          </div>

          {/* Section 2: Study Hours & Prep Level */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Available Daily Hours: <span className="text-amber-400 font-bold">{profile.studyHours}h</span>
              </label>
              <input
                type="range"
                min="4"
                max="14"
                step="1"
                value={profile.studyHours}
                onChange={(e) => setProfile({ ...profile, studyHours: Number(e.target.value) })}
                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>4h</span>
                <span>8h (Default)</span>
                <span>14h</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Current Preparation Level
              </label>
              <select
                value={profile.prepLevel}
                onChange={(e) => setProfile({ ...profile, prepLevel: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Beginner">Beginner (Foundations starting)</option>
                <option value="Intermediate">Intermediate (1+ syllabus reading)</option>
                <option value="Advanced (Given Prelims)">Advanced (Given Prelims before)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Study Routine / Schedule
              </label>
              <select
                value={profile.preferredSchedule}
                onChange={(e) => setProfile({ ...profile, preferredSchedule: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Regular Day">Regular Day (8am - 10pm)</option>
                <option value="Early Morning">Early Bird (5am - 2pm)</option>
                <option value="Night Owl">Night Owl (8pm - 4am)</option>
                <option value="Working Professional Modular">Working Modular (2h AM + 3h PM)</option>
              </select>
            </div>
          </div>

          {/* Section 3: Mains Integration */}
          <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-200 text-xs">
                Integrate Mains Conceptual Foundation with Prelims?
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Build analytical links for UPSC GS-1/2/3 and RPSC Paper 1/2/3 without distracting from Prelims MCQs.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.mainsIntegrated}
                onChange={(e) => setProfile({ ...profile, mainsIntegrated: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {/* Section 4: Strong & Weak Subject Tagging */}
          <div>
            <div className="text-xs font-medium text-slate-300 mb-2">
              Select Strong Subjects (Green) and Weak Subjects (Red) for custom time weighting:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ALL_SUBJECTS.map((sub) => {
                const isStrong = profile.strongSubjects.includes(sub);
                const isWeak = profile.weakSubjects.includes(sub);
                return (
                  <div
                    key={sub}
                    className={`p-2 rounded-lg border text-xs flex flex-col justify-between ${
                      isStrong
                        ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                        : isWeak
                        ? 'bg-rose-950/40 border-rose-600/60 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="font-medium truncate mb-1">{sub}</span>
                    <div className="flex gap-1 mt-1">
                      <button
                        type="button"
                        onClick={() => toggleSubject(sub, 'strong')}
                        className={`px-1.5 py-0.5 text-[10px] rounded ${
                          isStrong ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        Strong
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSubject(sub, 'weak')}
                        className={`px-1.5 py-0.5 text-[10px] rounded ${
                          isWeak ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        Weak
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 70-20-10 Time Allocation Preview */}
          <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl">
            <div className="text-xs font-semibold text-amber-300 mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Calculated Daily Syllabus Distribution (Margdarshak 70:20:10 Rule)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <div className="text-amber-400 font-bold text-base tabular-nums">{commonHours} hrs</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Common UPSC-RPSC Core (70%)</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <div className="text-amber-400 font-bold text-base tabular-nums">{rajasthanHours} hrs</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Rajasthan Layer (20%)</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <div className="text-amber-400 font-bold text-base tabular-nums">{testHours} hrs</div>
                <div className="text-slate-400 text-[11px] mt-0.5">MCQs, Errors & Recall (10%)</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-sans font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Apply Roadmap Calibration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
