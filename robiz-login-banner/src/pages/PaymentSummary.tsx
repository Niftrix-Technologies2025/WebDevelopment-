
import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Shield, Calendar, MapPin, Users } from "lucide-react";
import { format, differenceInDays } from "date-fns";

const PaymentSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  // Get booking details from URL params
  const checkInDate = searchParams.get("checkin") ? new Date(searchParams.get("checkin")!) : new Date();
  const checkOutDate = searchParams.get("checkout") ? new Date(searchParams.get("checkout")!) : new Date();
  const guests = searchParams.get("guests") || "2";

  const pricePerNight = 299;
  const nights = differenceInDays(checkOutDate, checkInDate);
  const subtotal = nights * pricePerNight;
  const serviceFee = Math.round(subtotal * 0.1);
  const taxes = Math.round(subtotal * 0.08);
  const total = subtotal + serviceFee + taxes;

  // Sample property data
  const property = {
    title: "Luxury Beach Villa",
    location: "Miami Beach, FL",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop"
  };

  const handlePayment = () => {
    // Here you would integrate with your payment processor
    console.log("Processing payment...", {
      cardNumber,
      expiryDate,
      cvv,
      name,
      amount: total,
      bookingDetails: {
        propertyId: id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests
      }
    });
    
    // Navigate to success page
    navigate("/booking-success");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(`/date-selection/${id}`)}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Payment Summary</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-3">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-20 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{property.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-[#FCBB12]" />
                  Check-in
                </div>
                <span>{format(checkInDate, "MMM dd, yyyy")}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-[#FCBB12]" />
                  Check-out
                </div>
                <span>{format(checkOutDate, "MMM dd, yyyy")}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-[#FCBB12]" />
                  Guests
                </div>
                <span>{guests} guests</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Price Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>${pricePerNight} x {nights} nights</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>${taxes}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-[#FCBB12]">${total}</span>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <Shield className="w-4 h-4 text-green-600" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>

      {/* Payment Button */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t p-4">
        <Button 
          onClick={handlePayment}
          disabled={!cardNumber || !expiryDate || !cvv || !name}
          className="w-full bg-[#FCBB12] text-[#242424] hover:bg-[#FCBB12]/90 h-12 text-lg font-semibold disabled:opacity-50"
        >
          Pay ${total}
        </Button>
        <p className="text-xs text-gray-500 text-center mt-2">
          You will be charged immediately. Cancellation policy applies.
        </p>
      </div>
    </div>
  );
};

export default PaymentSummary;
