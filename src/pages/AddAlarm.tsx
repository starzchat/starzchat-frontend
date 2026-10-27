import React, { useState } from 'react';
import { AlarmTimePicker } from '../components/AlarmTimePicker';
import type { AlarmFormValues } from '../lib/types';

const RINGTONES = ['Morning Breeze', 'Sunrise Chime', 'Classic Bell', 'Ocean Waves', 'Retro Beep'];
const DURATIONS = ['1 minute', '3 minutes', '5 minutes', '10 minutes'];
const CLASS_MODES = ['Class 1 (Morning)', 'Class 2 (Afternoon)', 'Class 3 (Evening)', 'All Day'];

export function AddAlarm() {
  const [form, setForm] = useState<AlarmFormValues>({
    hour: '07',
    minute: '32',
    period: 'AM',
    ringtone: RINGTONES[0],
    ring_duration: DURATIONS[2],
    class_mode: CLASS_MODES[0],
  });

  const selectOption = (opts: string[], key: 'ringtone' | 'ring_duration' | 'class_mode', value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="add-alarm">
      <header className="alarm-header">
        <button className="icon-btn" aria-label="Back">‹</button>
        <h1 className="alarm-title">Add Alarm</h1>
        <button className="btn-save">Save</button>
      </header>

      <div className="alarm-body">
        {/* Time */}
        <div className="alarm-section">
          <div className="section-label">Time</div>
          <div className="time-display">
            {form.hour}:{form.minute} {form.period}
          </div>
          <AlarmTimePicker value={form} onChange={(v) => setForm({ ...form, ...v })} />
        </div>

        {/* Ringtone */}
        <div className="alarm-section">
          <div className="row-label">
            <span className="row-icon">🔔</span>
            Ringtone
          </div>
          <div className="row-value">{form.ringtone}</div>
          <div className="options-grid">
            {RINGTONES.map((r) => (
              <button
                key={r}
                className={`option-chip ${form.ringtone === r ? 'active' : ''}`}
                onClick={() => selectOption(RINGTONES, 'ringtone', r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Ring Duration */}
        <div className="alarm-section">
          <div className="row-label">
            <span className="row-icon">⏱</span>
            Ring Duration
          </div>
          <div className="row-value">{form.ring_duration}</div>
          <div className="options-grid">
            {DURATIONS.map((d) => (
              <button
                key={d}
                className={`option-chip ${form.ring_duration === d ? 'active' : ''}`}
                onClick={() => selectOption(DURATIONS, 'ring_duration', d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Class / Alarm Mode */}
        <div className="alarm-section">
          <div className="row-label">
            <span className="row-icon">🎓</span>
            Class / Alarm Mode
          </div>
          <div className="row-value">{form.class_mode}</div>
          <div className="options-grid">
            {CLASS_MODES.map((c) => (
              <button
                key={c}
                className={`option-chip ${form.class_mode === c ? 'active' : ''}`}
                onClick={() => selectOption(CLASS_MODES, 'class_mode', c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer className="alarm-footer">
        <button className="btn-add-alarm">+ Add Alarm</button>
      </footer>
    </div>
  );
}