import React, { useState } from 'react';

// Put your brand logo at public/logo.png and it shows up automatically.
export function LoadingScreen() {
  const [logoOk, setLogoOk] = useState(true);
  return (
    <div className="loading-screen">
      <div className="loading-logo">
        {logoOk ? (
          <img src="/logo.png" alt="StarzChat" onError={() => setLogoOk(false)} />
        ) : (
          '★'
        )}
      </div>
      <div className="loading-name">StarzChat</div>
      <div className="loading-bar" />
    </div>
  );
}
