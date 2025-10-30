import React, { useState } from 'react';
import Icon from '@/Component/AppIcon';
import Image from '@/Component/AppImage';
import Button from '@/Component/ui/Button';


const MapView = ({ alumni = [], onConnect, onMessage, onViewProfile }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredAlumni, setHoveredAlumni] = useState(null);

  // Group alumni by location
  const locationGroups = alumni.reduce((acc, person) => {
    const location = person?.location || "Unknown";
    if (!acc[location]) acc[location] = [];
    acc[location].push(person);
    return acc;
  }, {});

  // Convert into array with mock coordinates
  const locations = Object.keys(locationGroups).map((location) => ({
    name: location,
    count: locationGroups[location].length,
    alumni: locationGroups[location],
    // Mock coordinates for now (replace with geocoding later)
    lat: Math.random() * 60 + 20,
    lng: Math.random() * 120 - 60,
  }));

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row h-[600px]">
        {/* Map */}
        <div className="flex-1 relative bg-muted">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Alumni Global Distribution"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=2&output=embed"
            className="w-full h-full"
          />

          {/* Marker Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {locations.map((location, index) => (
              <div
                key={index}
                role="button"
                aria-label={`Location: ${location.name}, ${location.count} alumni`}
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  left: `${(location.lng + 180) * (100 / 360)}%`,
                  top: `${(90 - location.lat) * (100 / 180)}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => handleLocationClick(location)}
              >
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg transition-all duration-200 hover:scale-110 ${
                      selectedLocation?.name === location.name
                        ? "bg-primary ring-4 ring-primary/30"
                        : "bg-secondary hover:bg-primary"
                    }`}
                  >
                    {location.count}
                  </div>
                  {selectedLocation?.name === location.name && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-popover border border-border rounded-lg shadow-lg p-2 whitespace-nowrap z-10">
                      <div className="text-sm font-medium text-foreground">
                        {location.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {location.count} alumni
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button variant="outline" size="sm" iconName="ZoomIn" className="bg-background/90 backdrop-blur-sm">
              Zoom In
            </Button>
            <Button variant="outline" size="sm" iconName="ZoomOut" className="bg-background/90 backdrop-blur-sm">
              Zoom Out
            </Button>
            <Button variant="outline" size="sm" iconName="RotateCcw" className="bg-background/90 backdrop-blur-sm">
              Reset
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-background">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {selectedLocation ? selectedLocation.name : "Global Alumni Network"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedLocation
                  ? `${selectedLocation.count} alumni in this location`
                  : `${alumni.length} alumni worldwide`}
              </p>
            </div>
            {selectedLocation && (
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                onClick={() => setSelectedLocation(null)}
              >
                Back
              </Button>
            )}
          </div>

          <div className="overflow-y-auto h-full">
            {selectedLocation ? (
              // Location-specific alumni
              <div className="p-4 space-y-4">
                {selectedLocation.alumni.map((person) => (
                  <div
                    key={person?.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      hoveredAlumni?.id === person?.id ? "bg-muted" : "hover:bg-muted"
                    }`}
                    onMouseEnter={() => setHoveredAlumni(person)}
                    onMouseLeave={() => setHoveredAlumni(null)}
                  >
                    <Image
                      src={person?.profileImage}
                      alt={person?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {person?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {person?.currentPosition}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {person?.company}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="xs"
                          iconName="UserPlus"
                          onClick={() => onConnect(person?.id)}
                        >
                          Connect
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="MessageCircle"
                          onClick={() => onMessage(person?.id)}
                        />
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="Eye"
                          onClick={() => onViewProfile(person?.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Overview
              <div className="p-4 space-y-4">
                <div className="text-center py-8">
                  <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    Explore Alumni Locations
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click on any location marker to see alumni in that area
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Top Locations
                  </h4>
                  <div className="space-y-2">
                    {locations
                      .sort((a, b) => b.count - a.count)
                      .slice(0, 5)
                      .map((location, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                          onClick={() => handleLocationClick(location)}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon name="MapPin" size={16} className="text-muted-foreground" />
                            <span className="text-sm text-foreground">{location.name}</span>
                          </div>
                          <span className="text-sm font-medium text-primary">
                            {location.count}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
