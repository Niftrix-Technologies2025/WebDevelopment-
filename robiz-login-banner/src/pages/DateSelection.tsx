
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Calendar as CalendarIcon, Users } from "lucide-react";
import { format, differenceInDays } from "date-fns";

const DateSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);

  const pricePerNight = 299;
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const subtotal = nights * pricePerNight;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const handleContinue = () => {
    if (checkIn && checkOut) {
      navigate(`/payment-summary/${id}?checkin=${checkIn.toISOString()}&checkout=${checkOut.toISOString()}&guests=${guests}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(`/booking/${id}`)}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Select Dates</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Date Selection */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-[#FCBB12]" />
              <h3 className="font-semibold">When do you want to stay?</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Check-in</div>
                  <div className="font-semibold">
                    {checkIn ? format(checkIn, "MMM dd") : "Select date"}
                  </div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Check-out</div>
                  <div className="font-semibold">
                    {checkOut ? format(checkOut, "MMM dd") : "Select date"}
                  </div>
                </div>
              </div>

              <Calendar
                mode="range"
                selected={{ from: checkIn, to: checkOut }}
                onSelect={(range) => {
                  if (range?.from) setCheckIn(range.from);
                  if (range?.to) setCheckOut(range.to);
                }}
                disabled={(date) => date < new Date()}
                className="rounded-md border mx-auto"
              />
            </div>
          </CardContent>
        </Card>

        {/* Guests Selection */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#FCBB12]" />
                <div>
                  <h3 className="font-semibold">Guests</h3>
                  <p className="text-sm text-gray-500">Maximum 6 guests</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-8 h-8 p-0"
                >
                  -
                </Button>
                <span className="font-semibold w-8 text-center">{guests}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setGuests(Math.min(6, guests + 1))}
                  className="w-8 h-8 p-0"
                >
                  +
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        {nights > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Price Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>${pricePerNight} x {nights} nights</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-[#FCBB12]">${total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Continue Button */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t p-4">
        <Button 
          onClick={handleContinue}
          disabled={!checkIn || !checkOut || nights <= 0}
          className="w-full bg-[#FCBB12] text-[#242424] hover:bg-[#FCBB12]/90 h-12 text-lg font-semibold disabled:opacity-50"
        >
          Continue to Payment ({nights > 0 ? `$${total}` : "Select dates"})
        </Button>
      </div>
    </div>
  );
};

export default DateSelection;
