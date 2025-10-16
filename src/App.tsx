import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CustomerLogin from "./pages/customer/Login";
import TrackOrder from "./pages/customer/TrackOrder";
import DeliveryLogin from "./pages/delivery/Login";
import DeliveryOrders from "./pages/delivery/Orders";
import OrderDetail from "./pages/delivery/OrderDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/track" element={<TrackOrder />} />
          <Route path="/delivery/login" element={<DeliveryLogin />} />
          <Route path="/delivery/orders" element={<DeliveryOrders />} />
          <Route path="/delivery/order/:orderId" element={<OrderDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
