
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, Wifi, Car, Coffee, Users, Calendar } from "lucide-react";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Sample data - user will customize
  const property = {
    id: 1,
    title: "Luxury Beach Villa",
    location: "Miami Beach, FL",
    price: 299,
    rating: 4.9,
    reviews: 127,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=600&h=400&fit=crop"
    ],
    amenities: ["WiFi", "Parking", "Kitchen", "Pool"],
    capacity: "6 guests",
    bedrooms: 3,
    bathrooms: 2,
    description: "Beautiful beachfront villa with stunning ocean views. Perfect for families and groups looking for a luxurious getaway with direct beach access."
  };

  const amenityIcons = {
    WiFi: Wifi,
    Parking: Car,
    Kitchen: Coffee,
    Pool: Users
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Property Details</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <img 
          src={property.images[selectedImageIndex]} 
          alt={property.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex space-x-2 overflow-x-auto">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 ${
                  selectedImageIndex === index ? "border-[#FCBB12]" : "border-white/50"
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <Badge className="absolute top-4 left-4 bg-[#FCBB12] text-[#242424]">
          🔥 Popular
        </Badge>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Property Info */}
        <div>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold">{property.title}</h1>
              <div className="flex items-center text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#FCBB12]">${property.price}</div>
              <div className="text-sm text-gray-500">per night</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-[#FCBB12] text-[#FCBB12] mr-1" />
              {property.rating} ({property.reviews} reviews)
            </div>
            <div>{property.capacity}</div>
            <div>{property.bedrooms} bed • {property.bathrooms} bath</div>
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">About this place</h3>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {property.amenities.map((amenity) => {
                const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
                return (
                  <div key={amenity} className="flex items-center space-x-2">
                    {IconComponent && <IconComponent className="w-5 h-5 text-[#FCBB12]" />}
                    <span className="text-sm">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Book Now Section */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t p-4 -mx-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-[#FCBB12]">${property.price} <span className="text-base text-gray-500">/ night</span></div>
              <div className="text-sm text-gray-500">Free cancellation • Pay later</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate(`/date-selection/${id}`)}
              className="w-full bg-[#FCBB12] text-[#242424] hover:bg-[#FCBB12]/90 h-12 text-lg font-semibold"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Select Dates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
