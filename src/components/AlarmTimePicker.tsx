import React, { useState } from 'react';

const HOURS = ['01','02','03','04','05','06','07','08','09','10','11','12'];
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

interface AlarmTimePickerProps {
  value: { hour: string; minute: string; period: 'AM' | 'PM' };
  onChange: (v: { hour: string; minute: string; period: 'AM' | 'PM' }) => void;
}

export function AlarmTimePicker({ value, onChange }: AlarmTimePickerProps) {
  const [scrollTop, setScrollTop] = useState(0);

  const scrollTo = (list: string[], target: string) => {
    const idx = list.indexOf(target);
    if (idx === -1) return;
    setScrollTop(idx * 40); // each row is ~40px tall
  };

  return (
    <div className="time-picker">
      <div className="picker-column">
        {HOURS.map((h) => (
          <div
            key={h}
            className={`picker-row ${value.hour === h ? 'selected' : ''}`}
            onClick={() => {
              onChange({ ...value, hour: h });
              scrollTo(HOURS, h);
            }}
          >
            {h}
          </div>
        ))}
      </div>
      <div className="picker-column">
        {MINUTES.map((m) => (
          <div
            key={m}
            className={`picker-row ${value.minute === m ? 'selected' : ''}`}
            onClick={() => {
              onChange({ ...value, minute: m });
              scrollTo(MINUTES, m);
            }}
          >
            {m}
          </div>
        ))}
      </div>
      <div className="picker-column">
        {['AM', 'PM'].map((p) => (
          <div
            key={p}
            className={`picker-row ${value.period === p ? 'selected' : ''}`}
            onClick={() => {
              onChange({ ...value, period: p as 'AM' | 'PM' });
            }}
          >
            {p}
          </div>
        ))}
      </div>
      <div className="picker-center" />
    </div>
  );
}