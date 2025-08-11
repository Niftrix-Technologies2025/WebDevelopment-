
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Calendar, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const bannerTypes = [
    {
      id: "premium",
      title: "Premium Banner",
      subtitle: "Select the place holder",
      price: 2599,
      period: "day",
      featured: true,
      description: "High visibility premium placement"
    },
    {
      id: "trending",
      title: "Trending Banner",
      subtitle: "Select the place holder", 
      price: 500,
      period: "day",
      featured: false,
      description: "Popular trending section placement"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8 max-w-md mx-auto">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/406ea8f8-ec27-4947-b051-07b2795d6b40.png" 
            alt="ROBIZ Logo"
            className="w-16 h-10 object-contain"
          />
        </div>
        <div className="w-10 h-10 bg-brand-dark-gray rounded-full overflow-hidden">
          <div className="w-full h-full bg-muted"></div>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 mt-8 mb-8 max-w-md mx-auto">
        <h1 className="text-brand-gold text-xl font-bold text-center">SELECT BANNER TYPE</h1>
      </div>

      {/* Banner Types */}
      <div className="px-4 space-y-6 max-w-md mx-auto">
        {bannerTypes.map((banner) => (
          <Card 
            key={banner.id}
            className="bg-brand-dark-gray border-brand-dark-gray overflow-hidden cursor-pointer hover:bg-brand-dark-gray/80 transition-colors"
            onClick={() => navigate(`/banner-upload/${banner.id}`)}
          >
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-brand-gold text-lg font-bold">{banner.title}</h3>
                    <p className="text-gray-400 text-sm">{banner.subtitle}</p>
                  </div>
                  {banner.featured && (
                    <Badge className="bg-brand-gold text-black text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-white text-lg">₹{banner.price.toLocaleString()}</span>
                  <span className="text-gray-400 text-sm">/{banner.period}</span>
                </div>
              </div>

              {/* Placeholder Banner Area */}
              <div className="bg-brand-black mx-4 mb-4 rounded-lg h-40 flex items-center justify-center border-2 border-dashed border-brand-dark-gray">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Banner Preview</p>
                </div>
              </div>

              <div className="px-4 pb-4">
                <Button 
                  className="w-full bg-brand-gold text-black hover:bg-brand-gold/90 font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/banner-upload/${banner.id}`);
                  }}
                >
                  Select Banner
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Navigation Hint */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
        <div className="bg-brand-dark-gray rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm">Select a banner type to get started</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
