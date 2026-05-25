'use client';

import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

export default function SuccessConfetti() {
  return <Fireworks autorun={{ speed: 3 }} />;
}
