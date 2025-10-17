"use client";

import { usePathname } from 'next/navigation';
import Chatbot from './Chatbot';

export default function ConditionalChatbot() {
  const pathname = usePathname();
  
  // Hide chatbot on lesson pages (paths that contain /courses/*/content/*/*)
  const isLessonPage = pathname.includes('/courses/') && pathname.includes('/content/');
  
  // Don't render chatbot on lesson pages
  if (isLessonPage) {
    return null;
  }
  
  return <Chatbot />;
}
