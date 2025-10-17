'use client';

import { useState, useEffect } from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
  publishedAt: string;
}

export default function VlogsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        const playlistId = 'PLNQT1LtURnzhGXKJhthBlvEXdRLFZFsb-';
        const apiKey = 'AIzaSyByxHQsuT-vFg6w20O2OWTri-4Da0PLbMY';

        const playlistResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
        );
        const playlistData = await playlistResponse.json();

        const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${apiKey}`
        );
        const videosData = await videosResponse.json();

        const formattedVideos = videosData.items.map((video: any) => ({
          id: video.id,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url,
          duration: formatDuration(video.contentDetails.duration),
          description: video.snippet.description,
          publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }));

        setVideos(formattedVideos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchPlaylistVideos();
  }, []);

  const formatDuration = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '00:00';

    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');

    let result = '';
    if (hours) result += `${hours}:`;
    result += `${minutes.padStart(2, '0')}:`;
    result += seconds.padStart(2, '0');

    return result;
  };

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-[#E43636]"></div>
          <p className="mt-4 text-lg text-[#000000]">Loading videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#E43636] sm:text-5xl">
            My Vlogs 
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#000000]">
              Join Me on My Global Fitness Journey: Inspiring Movement Across Studios Worldwide
          </p>
        </div>

        {selectedVideo && (
          <div className="mt-8 relative w-full pb-[56.25%] h-0">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&mute=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 h-full w-full"
            />
          </div>
        )}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative flex flex-col rounded-2xl shadow-md border border-[#E2DDB4] bg-white overflow-hidden"
            >
              <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                  onClick={() => handleVideoSelect(video.id)}
                />
                <div className="absolute bottom-2 right-2 rounded bg-[#E43636] bg-opacity-90 px-2 py-1 text-sm text-[#F6EFD2]">
                  {video.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#000000]">
                  {video.title}
                </h3>
                <p className="mt-2 text-sm text-[#E43636]">{video.publishedAt}</p>
                <p className="mt-4 text-[#000000] line-clamp-3">{video.description}</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleVideoSelect(video.id)}
                    className="inline-flex items-center rounded-md bg-[#E43636] px-4 py-2 text-sm font-semibold text-[#F6EFD2] shadow-none hover:bg-[#000000] hover:text-[#E43636] border border-[#E43636]"
                  >
                    Watch Now
                  </button>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md bg-white border border-[#E43636] px-4 py-2 text-sm font-semibold text-[#000000] hover:bg-[#E43636] hover:text-[#F6EFD2]"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
