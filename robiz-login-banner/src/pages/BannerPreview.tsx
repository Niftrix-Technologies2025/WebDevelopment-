import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

const BannerPreview = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("April");
  const [selectedYear, setSelectedYear] = useState("2021");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { image, images, config } = location.state || {};
  const isTrending = type === "trending";

  const sampleBannerImages = {
    premium: "/lovable-uploads/eef6ce32-222b-4846-9275-6a6a688a4b30.png",
    trending: "/lovable-uploads/b395d349-b8a1-4106-b37c-a89e41f4ccf4.png"
  };

  const displayImages = images || [image || sampleBannerImages[type as keyof typeof sampleBannerImages]];
  const currentDisplayImage = displayImages[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const daysInMonth = 30; // April has 30 days
  const startDay = 4; // April 1st, 2021 was a Thursday (4th day of week)

  const handleDateSelect = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else if (selectedDays.length < 2) {
      const newSelectedDays = [...selectedDays, day].sort((a, b) => a - b);
      setSelectedDays(newSelectedDays);
      
      if (newSelectedDays.length === 2) {
        const startDate = `${newSelectedDays[0].toString().padStart(2, '0')}/04/2021`;
        const endDate = `${(newSelectedDays[1] + 9).toString().padStart(2, '0')}/04/2021`;
        setSelectedDate(`${startDate}-${endDate}`);
      }
    }
  };

  const confirmSelection = () => {
    if (selectedDate) {
      setShowDatePicker(false);
    }
  };

  const handleMakePayment = () => {
    navigate(`/banner-payment/${type}`, {
      state: {
        image: currentDisplayImage,
        images: images,
        config: config,
        selectedDate: selectedDate
      }
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    
    // Header with day names
    dayNames.forEach(day => {
      days.push(
        <div key={day} className="text-gray-400 text-sm text-center py-2 font-medium">
          {day}
        </div>
      );
    });

    // Empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDays.includes(day);
      const isInRange = selectedDays.length === 2 && day >= selectedDays[0] && day <= selectedDays[1];
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`
            p-2 text-center rounded-lg text-sm font-medium transition-colors
            ${isSelected 
              ? 'bg-brand-gold text-black' 
              : isInRange 
                ? 'bg-brand-gold/30 text-white'
                : 'text-white hover:bg-brand-dark-gray'
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8 max-w-md mx-auto">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(-1)}
          className="p-2 text-white hover:bg-brand-dark-gray"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/406ea8f8-ec27-4947-b051-07b2795d6b40.png" 
            alt="ROBIZ Logo"
            className="w-12 h-8 object-contain"
          />
        </div>
        <div className="w-10 h-10 bg-brand-dark-gray rounded-full overflow-hidden">
          <div className="w-full h-full bg-muted"></div>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 mt-4 mb-6 max-w-md mx-auto">
        <h1 className="text-brand-gold text-xl font-bold text-center">
          {config?.title || `${type?.toUpperCase()} BANNER`}
        </h1>
      </div>

      <div className="px-4 space-y-6 max-w-md mx-auto">
        {/* Banner Preview */}
        <Card className="bg-brand-dark-gray border-brand-dark-gray">
          <CardContent className="p-4">
            <div className="bg-brand-black rounded-lg overflow-hidden relative">
              {currentDisplayImage && (
                <img 
                  src={currentDisplayImage} 
                  alt="Banner preview" 
                  className="w-full h-auto object-cover"
                />
              )}
              
              {/* Navigation buttons for multiple images (trending only) */}
              {isTrending && displayImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {currentImageIndex + 1}/{displayImages.length}
                  </div>
                </>
              )}
            </div>
            <div className="mt-4 text-center text-gray-400 text-sm">
              Upload the banner{isTrending ? 's' : ''} in JPG,JPEG,PNG ({isTrending ? 'w=132cm,h=205cm' : 'w=300px,h=156cm'})
            </div>
            {(image || images) && (
              <Button 
                className="w-full mt-4 bg-brand-gold text-black hover:bg-brand-gold/90 border-0 font-semibold"
                onClick={() => navigate(`/banner-upload/${type}`)}
              >
                Change Banner{isTrending ? 's' : ''}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Query Section */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-gray-300 text-sm">Any queries related to payment or design?</span>
            <button className="text-brand-gold text-sm underline">Click Here</button>
          </div>
          <p className="text-gray-400 text-xs">
            Please note: The amount paid is non-refundable and cannot be cancelled
          </p>
        </div>

        {/* Date Selection */}
        <div className="space-y-3">
          <div className="text-white font-medium">Date</div>
          <div className="relative">
            <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full bg-brand-dark-gray border border-brand-dark-gray rounded-lg px-4 py-3 text-left flex items-center justify-between text-gray-300"
            >
              <span>{selectedDate || "Click to select"}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Select the date until which your banner should be visible.
          </p>
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleMakePayment}
          disabled={!selectedDate}
          className="w-full bg-brand-gold text-black hover:bg-brand-gold/90 h-12 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          SUBMIT
        </Button>
      </div>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-brand-dark-gray rounded-lg max-w-sm w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-brand-black">
              <h3 className="text-brand-gold text-lg font-bold">SELECT THE DATE</h3>
              <button 
                onClick={() => setShowDatePicker(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Date Picker Content */}
            <div className="p-4">
              <div className="bg-brand-black rounded-lg p-4">
                <div className="text-white text-sm mb-4">Date:</div>
                
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <button className="p-1">
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <div className="text-white text-lg font-semibold">
                    {selectedMonth} {selectedYear}
                  </div>
                  <button className="p-1">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {renderCalendarDays()}
                </div>

                {/* Confirm Button */}
                <Button 
                  onClick={confirmSelection}
                  disabled={selectedDays.length !== 2}
                  className="w-full bg-brand-gold text-black hover:bg-brand-gold/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  CONFIRM SELECTION
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerPreview;
