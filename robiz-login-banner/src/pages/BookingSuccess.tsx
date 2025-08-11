
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, MapPin, Users, Download } from "lucide-react";

const BookingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Success Icon */}
        <div className="text-center">
          <div className="gradient-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-[#242424]" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your reservation has been successfully processed</p>
        </div>

        {/* Booking Details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Booking Reference</div>
              <div className="text-lg font-bold text-[#FCBB12]">#BK2024-001</div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  Property
                </div>
                <span>Luxury Beach Villa</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  Check-in
                </div>
                <span>Dec 15, 2024</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  Check-out
                </div>
                <span>Dec 18, 2024</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  Guests
                </div>
                <span>2 guests</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total Paid</span>
                <span className="text-[#FCBB12]">$1,023</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-[#FCBB12] text-[#242424] hover:bg-[#FCBB12]/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Confirmation
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>A confirmation email has been sent to your registered email address.</p>
          <p>For any questions, contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
