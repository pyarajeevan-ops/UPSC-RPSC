import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  Award,
  PenTool,
  MapPin,
  CalendarCheck,
  Download,
  Filter,
  Trash2,
  Edit2,
  X,
  RotateCcw,
  AlertCircle,
  Flame,
  Tag,
  Share2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { CalendarEvent, CalendarEventType, LanguageMedium, UserProfile } from '../types';

interface StudyCalendarViewProps {
  language: LanguageMedium;
  userProfile: UserProfile;
  onSelectTopic?: (topicId: string) => void;
  onStartPractice?: () => void;
}

type CalendarViewMode = 'month' | 'week' | 'day' | 'revisions';

export const StudyCalendarView: React.FC<StudyCalendarViewProps> = ({
  language,
  userProfile,
  onSelectTopic,
  onStartPractice,
}) => {
  // Calendar state
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  });
  const [viewMode, setViewMode] = useState<CalendarViewMode>('month');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState(selectedDateStr);
  const [formStartTime, setFormStartTime] = useState('07:00');
  const [formEndTime, setFormEndTime] = useState('09:00');
  const [formType, setFormType] = useState<CalendarEventType>('UPSC_CORE');
  const [formSubject, setFormSubject] = useState('Indian Polity');
  const [formHours, setFormHours] = useState('2');
  const [formNotes, setFormNotes] = useState('');
  const [formExamTag, setFormExamTag] = useState<'UPSC' | 'RPSC' | 'DUAL'>('DUAL');
  const [formPriority, setFormPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');

  // Load events from backend API with localStorage backup
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/calendar/events');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.events)) {
          setEvents(data.events);
          localStorage.setItem('margdarshak_calendar_events', JSON.stringify(data.events));
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend calendar fetch failed, checking localStorage fallback:', err);
    }

    // LocalStorage fallback
    const saved = localStorage.getItem('margdarshak_calendar_events');
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cached calendar events', e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const saveEventsLocally = (updated: CalendarEvent[]) => {
    setEvents(updated);
    localStorage.setItem('margdarshak_calendar_events', JSON.stringify(updated));
  };

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Helper date conversions
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthNamesHindi = [
    'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysOfWeekHindi = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

  // Navigate calendar
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setSelectedDateStr(`${y}-${m}-${day}`);
  };

  // Toggle event completion
  const handleToggleComplete = async (eventId: string) => {
    const target = events.find((e) => e.id === eventId);
    if (!target) return;

    const newCompleted = !target.completed;
    const updated = events.map((e) => (e.id === eventId ? { ...e, completed: newCompleted } : e));
    saveEventsLocally(updated);

    try {
      await fetch(`/api/calendar/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newCompleted }),
      });
      showNotification(newCompleted ? 'Session marked completed! +Focus recorded.' : 'Session marked pending.');
    } catch (e) {
      console.error('Failed to sync completion with backend', e);
    }
  };

  // Delete event
  const handleDeleteEvent = async (eventId: string) => {
    const updated = events.filter((e) => e.id !== eventId);
    saveEventsLocally(updated);

    try {
      await fetch(`/api/calendar/events/${eventId}`, { method: 'DELETE' });
      showNotification('Study session removed from calendar.');
    } catch (e) {
      console.error('Failed to delete on backend', e);
    }
  };

  // Auto-schedule 30-day dual plan
  const handleAutoSchedule30Day = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/calendar/auto-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: '30-day-plan',
          baseDate: selectedDateStr,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        showNotification(data.message || '30-Day Dual Preparation Calendar generated!');
        fetchEvents();
      }
    } catch (e) {
      console.error(e);
      showNotification('Could not connect to backend. Please try again.');
    }
    setLoading(false);
  };

  // Reset defaults
  const handleResetDefaults = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/calendar/auto-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset-defaults' }),
      });
      if (res.ok) {
        showNotification('Calendar reset to default dual preparation milestones!');
        fetchEvents();
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // Export iCalendar (.ics)
  const handleExportICS = async () => {
    try {
      const res = await fetch('/api/calendar/export-ics', { method: 'POST' });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `margdarshak-study-calendar-${selectedDateStr}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        showNotification('Calendar downloaded! Ready to import into Google or Apple Calendar.');
      }
    } catch (e) {
      console.error(e);
      showNotification('Export failed. Please check network connection.');
    }
  };

  // Open add modal
  const handleOpenAddModal = (dateStr?: string) => {
    setEditingEvent(null);
    setFormDate(dateStr || selectedDateStr);
    setFormTitle('');
    setFormStartTime('07:00');
    setFormEndTime('09:00');
    setFormType('UPSC_CORE');
    setFormSubject('Indian Polity & Constitution');
    setFormHours('2');
    setFormNotes('');
    setFormExamTag('DUAL');
    setFormPriority('HIGH');
    setIsAddModalOpen(true);
  };

  // Open edit modal
  const handleOpenEditModal = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormDate(event.date);
    setFormTitle(event.title);
    setFormStartTime(event.startTime || '07:00');
    setFormEndTime(event.endTime || '09:00');
    setFormType(event.type);
    setFormSubject(event.subject || 'General Studies');
    setFormHours(String(event.targetHours || 2));
    setFormNotes(event.notes || '');
    setFormExamTag(event.examTag || 'DUAL');
    setFormPriority(event.priority || 'MEDIUM');
    setIsAddModalOpen(true);
  };

  // Save event form
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingEvent) {
      // Update
      const updatedEvent: CalendarEvent = {
        ...editingEvent,
        title: formTitle.trim(),
        date: formDate,
        startTime: formStartTime,
        endTime: formEndTime,
        type: formType,
        subject: formSubject,
        targetHours: parseFloat(formHours) || 2,
        notes: formNotes,
        examTag: formExamTag,
        priority: formPriority,
      };

      const updatedList = events.map((ev) => (ev.id === editingEvent.id ? updatedEvent : ev));
      saveEventsLocally(updatedList);
      setIsAddModalOpen(false);

      try {
        await fetch(`/api/calendar/events/${editingEvent.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedEvent),
        });
        showNotification('Study session updated.');
      } catch (err) {
        console.error(err);
      }
    } else {
      // Create
      const newEvent: CalendarEvent = {
        id: `cal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title: formTitle.trim(),
        date: formDate,
        startTime: formStartTime,
        endTime: formEndTime,
        type: formType,
        subject: formSubject,
        targetHours: parseFloat(formHours) || 2,
        completed: false,
        notes: formNotes,
        examTag: formExamTag,
        priority: formPriority,
      };

      const updatedList = [...events, newEvent];
      saveEventsLocally(updatedList);
      setIsAddModalOpen(false);

      try {
        await fetch('/api/calendar/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEvent),
        });
        showNotification('New study session scheduled!');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Filtered events
  const filteredEvents = useMemo(() => {
    if (typeFilter === 'ALL') return events;
    return events.filter((e) => e.type === typeFilter);
  }, [events, typeFilter]);

  // Events on selected day
  const selectedDayEvents = useMemo(() => {
    return filteredEvents
      .filter((e) => e.date === selectedDateStr)
      .sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));
  }, [filteredEvents, selectedDateStr]);

  // Spaced revision events
  const spacedRevisionEvents = useMemo(() => {
    return events
      .filter((e) => e.type === 'SPACED_REVISION')
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events]);

  // Statistics
  const stats = useMemo(() => {
    const total = events.length;
    const completed = events.filter((e) => e.completed).length;
    const totalHours = events.reduce((sum, e) => sum + (e.targetHours || 0), 0);
    const completedHours = events
      .filter((e) => e.completed)
      .reduce((sum, e) => sum + (e.targetHours || 0), 0);
    const mockCount = events.filter((e) => e.type === 'MOCK_TEST').length;
    const revisionsCount = events.filter((e) => e.type === 'SPACED_REVISION').length;

    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      totalHours: Math.round(totalHours * 10) / 10,
      completedHours: Math.round(completedHours * 10) / 10,
      mockCount,
      revisionsCount,
    };
  }, [events]);

  // Month grid calculation
  const calendarGrid = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: Array<{
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      events: CalendarEvent[];
    }> = [];

    const todayStr = (() => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    })();

    // Previous month padding days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      cells.push({
        dateStr: dStr,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isToday: dStr === todayStr,
        events: filteredEvents.filter((e) => e.date === dStr),
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({
        dateStr: dStr,
        dayNumber: d,
        isCurrentMonth: true,
        isToday: dStr === todayStr,
        events: filteredEvents.filter((e) => e.date === dStr),
      });
    }

    // Next month padding to fill complete weeks (up to 35 or 42 cells)
    const totalSlots = cells.length > 35 ? 42 : 35;
    const remaining = totalSlots - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({
        dateStr: dStr,
        dayNumber: d,
        isCurrentMonth: false,
        isToday: dStr === todayStr,
        events: filteredEvents.filter((e) => e.date === dStr),
      });
    }

    return cells;
  }, [year, month, filteredEvents]);

  // Week view calculation
  const weekDays = useMemo(() => {
    const sel = new Date(selectedDateStr);
    const dayOfWeek = sel.getDay(); // 0-6
    const sunday = new Date(sel);
    sunday.setDate(sel.getDate() - dayOfWeek);

    const days: Array<{
      dateStr: string;
      dayName: string;
      dayNumber: number;
      isToday: boolean;
      events: CalendarEvent[];
    }> = [];

    const todayStr = (() => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    })();

    for (let i = 0; i < 7; i++) {
      const curr = new Date(sunday);
      curr.setDate(sunday.getDate() + i);
      const dStr = `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, '0')}-${String(curr.getDate()).padStart(2, '0')}`;
      days.push({
        dateStr: dStr,
        dayName: daysOfWeek[i],
        dayNumber: curr.getDate(),
        isToday: dStr === todayStr,
        events: filteredEvents.filter((e) => e.date === dStr),
      });
    }

    return days;
  }, [selectedDateStr, filteredEvents]);

  // Color helper for badges and tags
  const getTypeBadge = (type: CalendarEventType) => {
    switch (type) {
      case 'UPSC_CORE':
        return {
          bg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          dot: 'bg-blue-400',
          label: '70% UPSC Core',
          labelHindi: '70% यूपीएससी कोर',
        };
      case 'RPSC_RAJASTHAN':
        return {
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
          label: '20% Rajasthan Layer',
          labelHindi: '20% राजस्थान लेयर',
        };
      case 'SPACED_REVISION':
        return {
          bg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          dot: 'bg-purple-400',
          label: '10% Spaced Recall',
          labelHindi: '10% सक्रिय स्मरण',
        };
      case 'MOCK_TEST':
        return {
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
          label: 'Prelims Simulator',
          labelHindi: 'प्रारंभिक परीक्षा मॉक',
        };
      case 'EXAM_COUNTDOWN':
        return {
          bg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-400',
          label: 'Official Horizon',
          labelHindi: 'परीक्षा तिथि',
        };
      case 'CURRENT_AFFAIRS':
        return {
          bg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
          dot: 'bg-cyan-400',
          label: 'Current Affairs Digest',
          labelHindi: 'समसामयिकी सार',
        };
      default:
        return {
          bg: 'bg-slate-800 text-slate-300 border-slate-700',
          dot: 'bg-slate-400',
          label: 'Study Session',
          labelHindi: 'अध्ययन सत्र',
        };
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Toast Notification Banner */}
      {statusMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-semibold shadow-xl border border-amber-400 animate-fade-in">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span className="text-xs">{statusMessage}</span>
        </div>
      )}

      {/* Top Header & Overview Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 flex items-center gap-2">
                <span>Civil Services Study Calendar & Spaced Scheduler</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {language === 'Hindi'
                  ? '70:20:10 दैनिक अध्ययन विभाजन, आवर्ती स्मरण (1d-3d-7d-15d-30d) एवं प्रारंभिक परीक्षा मॉक टेस्ट कैलेंडर'
                  : '70:20:10 Workload Distribution · Spaced Repetition (1d-3d-7d-15d-30d) · Prelims Milestones'}
              </p>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => handleOpenAddModal(selectedDateStr)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Session</span>
          </button>

          <button
            onClick={handleAutoSchedule30Day}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-amber-300 font-medium text-xs transition-colors cursor-pointer"
            title="Automatically generates a balanced 30-day dual prep plan"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Auto-Plan 30-Day Track</span>
          </button>

          <button
            onClick={handleExportICS}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 font-medium text-xs transition-colors cursor-pointer"
            title="Download .ics file to sync with Google Calendar or Apple Calendar"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export to</span> <span>iCal (.ics)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-medium text-slate-400">Total Planned</div>
          <div className="text-xl font-bold text-slate-100 mt-1">{stats.total} sessions</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{stats.totalHours} study hours</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
          <div className="text-[11px] font-medium text-emerald-400">Completed</div>
          <div className="text-xl font-bold text-emerald-300 mt-1">{stats.completed} sessions</div>
          <div className="text-[10px] text-emerald-400/80 mt-0.5">{stats.completedHours}h logged ({stats.percentage}%)</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-purple-950/20 border border-purple-500/30">
          <div className="text-[11px] font-medium text-purple-400">Spaced Recalls</div>
          <div className="text-xl font-bold text-purple-300 mt-1">{stats.revisionsCount} scheduled</div>
          <div className="text-[10px] text-purple-400/80 mt-0.5">1d · 3d · 7d · 15d · 30d</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30">
          <div className="text-[11px] font-medium text-amber-400">Prelims Mocks</div>
          <div className="text-xl font-bold text-amber-300 mt-1">{stats.mockCount} simulated</div>
          <div className="text-[10px] text-amber-400/80 mt-0.5">Full 100/150 Q tests</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-500/30">
          <div className="text-[11px] font-medium text-blue-400">UPSC Horizon</div>
          <div className="text-sm font-bold text-blue-300 mt-1">May 24, 2026</div>
          <div className="text-[10px] text-blue-400/80 mt-0.5">Civil Services Prelims</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
          <div className="text-[11px] font-medium text-rose-400">RPSC Horizon</div>
          <div className="text-sm font-bold text-rose-300 mt-1">Aug 30, 2026</div>
          <div className="text-[10px] text-rose-400/80 mt-0.5">RAS Prelims (5 Options)</div>
        </div>
      </div>

      {/* Control Bar: Month Switcher, View Switcher & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
        {/* Month & Date Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="font-serif font-bold text-base sm:text-lg text-slate-100 min-w-36 text-center">
            {language === 'Hindi' ? monthNamesHindi[month] : monthNames[month]} {year}
          </div>

          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleToday}
            className="ml-2 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-amber-300 transition-colors cursor-pointer"
          >
            Today
          </button>
        </div>

        {/* View Mode Segmented Controls */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
              viewMode === 'month'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Month Grid
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
              viewMode === 'week'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Week Plan
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
              viewMode === 'day'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Day Focus ({selectedDayEvents.length})
          </button>
          <button
            onClick={() => setViewMode('revisions')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
              viewMode === 'revisions'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Spaced Recalls ({spacedRevisionEvents.length})
          </button>
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500/50 cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="UPSC_CORE">70% UPSC Core</option>
            <option value="RPSC_RAJASTHAN">20% Rajasthan Vault</option>
            <option value="SPACED_REVISION">10% Spaced Recall</option>
            <option value="MOCK_TEST">Prelims Mock Test</option>
            <option value="EXAM_COUNTDOWN">Milestones & Exams</option>
          </select>
        </div>
      </div>

      {/* Main Calendar View Body */}
      {viewMode === 'month' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left 3 cols: Full Calendar Grid */}
          <div className="lg:col-span-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-semibold text-slate-400">
              {daysOfWeek.map((d, idx) => (
                <div key={d} className="py-1">
                  <span className="hidden sm:inline">{d}</span>
                  <span className="sm:hidden">{d[0]}</span>
                </div>
              ))}
            </div>

            {/* Calendar Cells */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {calendarGrid.map((cell, idx) => {
                const isSelected = cell.dateStr === selectedDateStr;
                const completedCount = cell.events.filter((e) => e.completed).length;

                return (
                  <div
                    key={`${cell.dateStr}-${idx}`}
                    onClick={() => setSelectedDateStr(cell.dateStr)}
                    className={`min-h-[75px] sm:min-h-[96px] p-1.5 rounded-xl border flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/40 shadow-md'
                        : cell.isToday
                        ? 'border-slate-700 bg-slate-800/80 font-bold'
                        : cell.isCurrentMonth
                        ? 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/50'
                        : 'border-slate-900/50 bg-slate-950/20 opacity-40 hover:opacity-70'
                    }`}
                  >
                    {/* Top Row: Date Number & Mini Completion Dot */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold rounded-md px-1.5 py-0.5 ${
                          cell.isToday
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : isSelected
                            ? 'text-amber-300 font-bold'
                            : cell.isCurrentMonth
                            ? 'text-slate-200'
                            : 'text-slate-500'
                        }`}
                      >
                        {cell.dayNumber}
                      </span>

                      {cell.events.length > 0 && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {completedCount}/{cell.events.length}
                        </span>
                      )}
                    </div>

                    {/* Middle: Micro Event Pills */}
                    <div className="space-y-1 my-1 overflow-hidden">
                      {cell.events.slice(0, 2).map((ev) => {
                        const badge = getTypeBadge(ev.type);
                        return (
                          <div
                            key={ev.id}
                            className={`text-[10px] truncate px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                              ev.completed
                                ? 'line-through opacity-50 bg-slate-900 text-slate-400 border-slate-800'
                                : `${badge.bg} font-medium`
                            }`}
                            title={`${ev.startTime || ''} ${ev.title}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${badge.dot}`} />
                            <span className="truncate">{ev.title}</span>
                          </div>
                        );
                      })}

                      {cell.events.length > 2 && (
                        <div className="text-[9px] text-slate-400 font-medium pl-1">
                          +{cell.events.length - 2} more
                        </div>
                      )}
                    </div>

                    {/* Bottom: Quick Add on Hover / Status */}
                    <div className="text-[9px] text-slate-500 truncate flex items-center justify-between">
                      {cell.events.length === 0 ? (
                        <span className="opacity-0 hover:opacity-100 text-slate-600">+ Add</span>
                      ) : (
                        <span>
                          {cell.events.reduce((s, e) => s + (e.targetHours || 0), 0)}h total
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 1 col: Selected Day Agenda & Tasks */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Day Agenda
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-100">
                    {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-IN', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </h3>
                </div>

                <button
                  onClick={() => handleOpenAddModal(selectedDateStr)}
                  className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  title="Add session to this day"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Day Tasks List */}
              <div className="mt-4 space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {selectedDayEvents.length === 0 ? (
                  <div className="text-center py-8 px-4 rounded-xl bg-slate-950/60 border border-dashed border-slate-800">
                    <CalendarCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-300 font-medium">No sessions scheduled for this date</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Plan your 70% UPSC Core, 20% Rajasthan Layer or 10% Spaced Recall block.
                    </p>
                    <button
                      onClick={() => handleOpenAddModal(selectedDateStr)}
                      className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Schedule for {selectedDateStr}
                    </button>
                  </div>
                ) : (
                  selectedDayEvents.map((ev) => {
                    const badge = getTypeBadge(ev.type);
                    return (
                      <div
                        key={ev.id}
                        className={`p-3 rounded-xl border transition-all ${
                          ev.completed
                            ? 'bg-slate-950/80 border-slate-800 text-slate-400 opacity-75'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5">
                            <button
                              onClick={() => handleToggleComplete(ev.id)}
                              className="mt-0.5 text-slate-400 hover:text-amber-400 cursor-pointer"
                              title={ev.completed ? 'Mark incomplete' : 'Mark completed'}
                            >
                              {ev.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-500" />
                              )}
                            </button>
                            <div>
                              <div
                                className={`text-xs font-semibold ${
                                  ev.completed ? 'line-through text-slate-400' : 'text-slate-100'
                                }`}
                              >
                                {ev.title}
                              </div>
                              {ev.titleHindi && (
                                <div className="text-[11px] text-slate-400 font-serif">
                                  {ev.titleHindi}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditModal(ev)}
                              className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(ev.id)}
                              className="p-1 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Event Metadata row */}
                        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px]">
                          <span className={`px-2 py-0.5 rounded-md border font-medium ${badge.bg}`}>
                            {badge.label}
                          </span>

                          {ev.startTime && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {ev.startTime} - {ev.endTime || ''}
                            </span>
                          )}

                          <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-amber-300/90 font-mono">
                            {ev.targetHours}h
                          </span>

                          {ev.examTag && (
                            <span className="px-1.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                              {ev.examTag}
                            </span>
                          )}
                        </div>

                        {ev.notes && (
                          <p className="mt-2 text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 leading-relaxed">
                            {ev.notes}
                          </p>
                        )}

                        {/* Interactive Jump link if linked to syllabus */}
                        {ev.topicId && onSelectTopic && (
                          <div className="mt-2 flex justify-end">
                            <button
                              onClick={() => onSelectTopic(ev.topicId!)}
                              className="inline-flex items-center gap-1 text-[10px] text-amber-400 hover:text-amber-300 hover:underline cursor-pointer"
                            >
                              <span>Open Topic in Syllabus</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Bottom 70:20:10 Micro Tip */}
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-xl">
              <span className="text-amber-400 font-semibold">Margdarshak Dual Golden Rule:</span>{' '}
              Reserve morning 3 hours for UPSC core concepts, midday 1.5 hours for Rajasthan state facts, and evening 1 hour for active recall.
            </div>
          </div>
        </div>
      )}

      {/* Week Plan View */}
      {viewMode === 'week' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-100">
                Week Timetable & Balance Grid
              </h3>
              <p className="text-xs text-slate-400">
                Hourly study commitments mapped across the 7-day dual preparation cycle
              </p>
            </div>
            <button
              onClick={() => handleOpenAddModal(selectedDateStr)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Session</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {weekDays.map((day) => {
              const isSelected = day.dateStr === selectedDateStr;
              const completedCount = day.events.filter((e) => e.completed).length;
              const totalHours = day.events.reduce((s, e) => s + (e.targetHours || 0), 0);

              return (
                <div
                  key={day.dateStr}
                  onClick={() => setSelectedDateStr(day.dateStr)}
                  className={`rounded-2xl border p-3 flex flex-col justify-between min-h-[320px] transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/30'
                      : day.isToday
                      ? 'border-slate-700 bg-slate-950 ring-1 ring-slate-700'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Day Column Header */}
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
                      <div>
                        <div className="text-xs font-bold text-slate-300">{day.dayName}</div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(day.dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 font-semibold">
                        {totalHours}h
                      </span>
                    </div>

                    {/* Day Events Column */}
                    <div className="space-y-2">
                      {day.events.length === 0 ? (
                        <div className="text-center py-6 text-[11px] text-slate-600 italic">
                          No sessions
                        </div>
                      ) : (
                        day.events.map((ev) => {
                          const badge = getTypeBadge(ev.type);
                          return (
                            <div
                              key={ev.id}
                              className={`p-2 rounded-xl border text-[11px] space-y-1 ${
                                ev.completed
                                  ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                                  : 'bg-slate-900 border-slate-800 text-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className={`px-1.5 py-0.2 rounded text-[9px] font-medium border ${badge.bg}`}>
                                  {badge.label.split(' ')[0]}
                                </span>
                                <span className="text-[9px] text-slate-400">
                                  {ev.targetHours}h
                                </span>
                              </div>
                              <div className={`font-semibold line-clamp-2 ${ev.completed ? 'line-through' : ''}`}>
                                {ev.title}
                              </div>
                              {ev.startTime && (
                                <div className="text-[9px] text-slate-400 flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" />
                                  <span>{ev.startTime}</span>
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Day Footer */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{completedCount}/{day.events.length} done</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAddModal(day.dateStr);
                      }}
                      className="text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day Focus Timeline View */}
      {viewMode === 'day' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                Detailed Timeline
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-100">
                {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDateStr}
                onChange={(e) => setSelectedDateStr(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
              />
              <button
                onClick={() => handleOpenAddModal(selectedDateStr)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Session</span>
              </button>
            </div>
          </div>

          {/* Timeline Stack */}
          <div className="space-y-4">
            {selectedDayEvents.length === 0 ? (
              <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800">
                <Clock className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-slate-200">No scheduled study blocks for this day</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Click the button below to schedule your UPSC or RPSC study sessions, or run the 30-day auto-planner.
                </p>
                <button
                  onClick={() => handleOpenAddModal(selectedDateStr)}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-semibold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  Schedule First Session
                </button>
              </div>
            ) : (
              selectedDayEvents.map((ev, index) => {
                const badge = getTypeBadge(ev.type);
                return (
                  <div
                    key={ev.id}
                    className={`relative flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                      ev.completed
                        ? 'bg-slate-950/80 border-slate-800/80 opacity-75'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 shadow-md'
                    }`}
                  >
                    {/* Time indicator pill */}
                    <div className="w-24 shrink-0 text-center py-2 px-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <div className="font-bold text-slate-200">{ev.startTime || 'Flex'}</div>
                      <div className="text-[10px] text-slate-500">{ev.endTime || 'End'}</div>
                      <div className="text-[10px] text-amber-400 font-mono mt-1 font-semibold">
                        {ev.targetHours}h
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${badge.bg}`}>
                              {badge.label}
                            </span>
                            {ev.subject && (
                              <span className="text-xs text-slate-400 font-medium">
                                {ev.subject}
                              </span>
                            )}
                          </div>
                          <h4
                            className={`font-semibold text-base mt-1 ${
                              ev.completed ? 'line-through text-slate-400' : 'text-slate-100'
                            }`}
                          >
                            {ev.title}
                          </h4>
                          {ev.titleHindi && (
                            <p className="text-xs text-slate-400 font-serif">{ev.titleHindi}</p>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleComplete(ev.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              ev.completed
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                            }`}
                          >
                            {ev.completed ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Completed</span>
                              </>
                            ) : (
                              <>
                                <Circle className="w-3.5 h-3.5 text-slate-400" />
                                <span>Mark Complete</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(ev)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                            title="Edit session"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteEvent(ev.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 cursor-pointer"
                            title="Delete session"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {ev.notes && (
                        <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                          {ev.notes}
                        </div>
                      )}

                      {/* Direct Topic Launch Button */}
                      {ev.topicId && onSelectTopic && (
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            onClick={() => onSelectTopic(ev.topicId!)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium cursor-pointer"
                          >
                            <BookOpen className="w-3 h-3 text-amber-400" />
                            <span>Drill Down into Syllabus Topic</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </button>

                          {onStartPractice && (
                            <button
                              onClick={onStartPractice}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium cursor-pointer"
                            >
                              <Award className="w-3 h-3 text-amber-400" />
                              <span>Practice MCQs</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Spaced Revisions Dedicated Tracker View */}
      {viewMode === 'revisions' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-purple-400" />
                <h3 className="font-serif text-xl font-bold text-slate-100">
                  Cumulative 1d → 3d → 7d → 15d → 30d Spaced Revision Radar
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Ebbinghaus memory curve countermeasures preventing critical prelims factual decay.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetDefaults}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 cursor-pointer"
                title="Restore default syllabus milestones"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Milestones</span>
              </button>
            </div>
          </div>

          {/* Explanation Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30">
              <span className="font-bold text-purple-300">Day 1 Review</span>
              <p className="text-[10px] text-slate-400 mt-1">5-3-2-1-1 Active Recall sheet without looking at notes.</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30">
              <span className="font-bold text-purple-300">Day 3 Review</span>
              <p className="text-[10px] text-slate-400 mt-1">Solve 15-20 closed MCQs and analyze answer traps.</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30">
              <span className="font-bold text-purple-300">Day 7 Review</span>
              <p className="text-[10px] text-slate-400 mt-1">Interleave with related topics & revise PYQ trends.</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30">
              <span className="font-bold text-purple-300">Day 15 Review</span>
              <p className="text-[10px] text-slate-400 mt-1">High-speed elimination drill: 90 seconds per statement.</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30">
              <span className="font-bold text-purple-300">Day 30 Review</span>
              <p className="text-[10px] text-slate-400 mt-1">Full Sectional or Cumulative Mock Integration.</p>
            </div>
          </div>

          {/* Table / List of Scheduled Spaced Revisions */}
          <div className="space-y-3">
            {spacedRevisionEvents.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No spaced revisions currently scheduled.
              </div>
            ) : (
              spacedRevisionEvents.map((rev) => (
                <div
                  key={rev.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    rev.completed
                      ? 'bg-slate-950/60 border-slate-800 text-slate-500'
                      : 'bg-slate-950 border-purple-500/20 hover:border-purple-500/40 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleComplete(rev.id)}
                      className="mt-0.5 text-slate-400 hover:text-purple-400 cursor-pointer"
                    >
                      {rev.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {rev.spacedInterval ? `Day ${rev.spacedInterval} Interval` : 'Spaced Recall'}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          Due: {rev.date}
                        </span>
                      </div>
                      <h4 className={`text-sm font-semibold mt-1 ${rev.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                        {rev.title}
                      </h4>
                      {rev.notes && (
                        <p className="text-xs text-slate-400 mt-1">{rev.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono text-amber-300 bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">
                      {rev.targetHours}h study
                    </span>
                    <button
                      onClick={() => handleDeleteEvent(rev.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Session Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-2 font-serif text-lg font-bold text-slate-100">
                <CalendarIcon className="w-5 h-5 text-amber-400" />
                <span>{editingEvent ? 'Edit Study Session' : 'Schedule New Study Session'}</span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Session Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Constitutional Amendments & Article 368 Drill"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Study Category *
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as CalendarEventType)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 cursor-pointer"
                  >
                    <option value="UPSC_CORE">70% UPSC Core (General Studies)</option>
                    <option value="RPSC_RAJASTHAN">20% Rajasthan Vault Layer</option>
                    <option value="SPACED_REVISION">10% Spaced Active Recall</option>
                    <option value="MOCK_TEST">Prelims Simulator Mock Test</option>
                    <option value="CURRENT_AFFAIRS">Current Affairs Digest</option>
                    <option value="EXAM_COUNTDOWN">Milestone / Horizon</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formEndTime}
                    onChange={(e) => setFormEndTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Target Hours
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="12"
                    value={formHours}
                    onChange={(e) => setFormHours(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Subject / Domain
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Polity, Modern History"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Exam Tag
                  </label>
                  <select
                    value={formExamTag}
                    onChange={(e) => setFormExamTag(e.target.value as 'UPSC' | 'RPSC' | 'DUAL')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 cursor-pointer"
                  >
                    <option value="DUAL">Dual Target (UPSC + RPSC)</option>
                    <option value="UPSC">UPSC CSE Focus</option>
                    <option value="RPSC">RPSC RAS Focus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Preparation Notes / Key Concepts
                </label>
                <textarea
                  rows={3}
                  placeholder="Key articles to review, textbook pages, 5-3-2-1-1 recall targets..."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  {editingEvent ? 'Save Changes' : 'Schedule Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
