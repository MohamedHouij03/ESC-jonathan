'use client';

import { useState, useEffect } from 'react';

interface LocationPermissionProps {
  onLocationGranted?: (location: { lat: number; lng: number; address: string }) => void;
}

export default function LocationPermission({ onLocationGranted }: LocationPermissionProps) {
  const [showPermission, setShowPermission] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'pending' | 'not-requested'>('not-requested');

  useEffect(() => {
    // Check if location permission has been requested before
    const hasRequested = localStorage.getItem('locationPermissionRequested');
    if (!hasRequested) {
      setShowPermission(true);
    }
  }, []);

  const requestLocation = () => {
    setPermissionStatus('pending');
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Get address from coordinates using reverse geocoding
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );
            const data = await response.json();
            const address = data.display_name || 'Unknown location';
            
            const locationData = { lat: latitude, lng: longitude, address };
            setLocation(locationData);
            setPermissionStatus('granted');
            setShowPermission(false);
            
            // Save to localStorage
            localStorage.setItem('locationPermissionRequested', 'true');
            localStorage.setItem('userLocation', JSON.stringify(locationData));
            
            // Callback to parent component
            if (onLocationGranted) {
              onLocationGranted(locationData);
            }
            
            // Send to server if user is logged in
            const user = localStorage.getItem('user');
            if (user) {
              await fetch('/api/user/update-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location: locationData }),
              });
            }
          } catch (error) {
            console.error('Error getting address:', error);
            const locationData = { lat: latitude, lng: longitude, address: 'Unknown location' };
            setLocation(locationData);
            setPermissionStatus('granted');
            setShowPermission(false);
          }
        },
        (error) => {
          console.error('Location permission denied:', error);
          setPermissionStatus('denied');
          localStorage.setItem('locationPermissionRequested', 'true');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    } else {
      setPermissionStatus('denied');
      localStorage.setItem('locationPermissionRequested', 'true');
    }
  };

  const denyLocation = () => {
    setPermissionStatus('denied');
    setShowPermission(false);
    localStorage.setItem('locationPermissionRequested', 'true');
  };

  if (!showPermission) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Location Access Requested</h3>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            This website would like to access your location to:
          </p>
          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Provide personalized content based on your location
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Show nearby fitness studios and trainers
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Improve your workout recommendations
            </li>
          </ul>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Your location data will be stored securely and used only for the purposes listed above. 
              You can change this permission anytime in your browser settings.
            </p>
          </div>
        </div>

        {permissionStatus === 'pending' && (
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600">Getting your location...</span>
          </div>
        )}

        {permissionStatus === 'denied' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-800">
              Location access was denied. You can still use the website, but some features may be limited.
            </p>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={requestLocation}
            disabled={permissionStatus === 'pending'}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Allow Location Access
          </button>
          <button
            onClick={denyLocation}
            disabled={permissionStatus === 'pending'}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
} 