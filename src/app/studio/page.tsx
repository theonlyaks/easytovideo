// app/studio/page.tsx
'use client'

import { redirect } from 'next/navigation';

export default function Studio() {
  redirect('/studio/text-to-sfx');
}