
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import BannerUpload from "./pages/BannerUpload";
import BannerPreview from "./pages/BannerPreview";
import BannerPayment from "./pages/BannerPayment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/banner-upload/:type" element={<BannerUpload />} />
          <Route path="/banner-preview/:type" element={<BannerPreview />} />
          <Route path="/banner-payment/:type" element={<BannerPayment />} />
          <Route path="/payment-success" element={<Navigate to="/" replace />} />
          <Route path="/banner-success" element={<Navigate to="/" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
