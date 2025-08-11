
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronDown } from "lucide-react";

const BannerPayment = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { image, config, selectedDate } = location.state || {};

  const pricing = {
    premium: { base: 25900, tax: 500, total: 26400 },
    trending: { base: 5000, tax: 500, total: 5500 }
  };

  const currentPricing = pricing[type as keyof typeof pricing] || pricing.premium;

  const sampleBannerImages = {
    premium: "/lovable-uploads/eef6ce32-222b-4846-9275-6a6a688a4b30.png",
    trending: "/lovable-uploads/b395d349-b8a1-4106-b37c-a89e41f4ccf4.png"
  };

  const displayImage = image || sampleBannerImages[type as keyof typeof sampleBannerImages];

  const handleMakePayment = () => {
    console.log("Processing banner payment...", {
      type,
      amount: currentPricing.total,
      selectedDate,
      bannerImage: displayImage
    });
    
    navigate("/payment-success");
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
          {type?.toUpperCase()} BANNER
        </h1>
      </div>

      <div className="px-4 space-y-6 max-w-md mx-auto">
        {/* Date Display */}
        <div className="text-center">
          <div className="bg-brand-dark-gray rounded-lg px-4 py-2 inline-flex items-center space-x-2">
            <span className="text-brand-gold font-medium">Date:</span>
            <span className="text-white">{selectedDate}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Banner Preview */}
        <Card className="bg-brand-dark-gray border-brand-dark-gray">
          <CardContent className="p-4">
            <h3 className="text-white text-lg font-semibold mb-4">Preview</h3>
            <div className="bg-brand-black rounded-lg overflow-hidden">
              {displayImage && (
                <img 
                  src={displayImage} 
                  alt="Banner preview" 
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
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

        {/* Summary */}
        <div className="space-y-4">
          <h3 className="text-brand-gold text-lg font-semibold">Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total duration</span>
              <span className="text-white">10 days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Base price</span>
              <span className="text-white">₹{currentPricing.base.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Tax</span>
              <span className="text-white">₹{currentPricing.tax}</span>
            </div>
            <div className="border-t border-brand-dark-gray pt-3">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-white">Total</span>
                <span className="text-brand-gold">₹{currentPricing.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <Button 
          onClick={handleMakePayment}
          className="w-full bg-brand-gold text-black hover:bg-brand-gold/90 h-12 text-lg font-semibold"
        >
          MAKE PAYMENT
        </Button>
      </div>
    </div>
  );
};

export default BannerPayment;
