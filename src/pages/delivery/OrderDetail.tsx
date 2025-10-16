import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Phone, ArrowLeft, Navigation } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import TrackingMap from "@/components/TrackingMap";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [isSharing, setIsSharing] = useState(false);
  
  // Mock order data
  const [order] = useState({
    id: orderId,
    trackingCode: "TRK123456",
    status: "picked_up",
    customer: "Alice Johnson",
    address: "123 Main St, City, State 12345",
    phone: "+1234567890",
    estimatedTime: "15 mins",
    deliveryLocation: { lat: 51.505, lng: -0.09 },
    destination: { lat: 51.515, lng: -0.1 }
  });

  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleStatusUpdate = (newStatus: string) => {
    setCurrentStatus(newStatus);
    toast({
      title: "Status Updated",
      description: `Order status changed to ${newStatus.replace("_", " ")}`,
    });
  };

  const toggleLocationSharing = () => {
    setIsSharing(!isSharing);
    toast({
      title: isSharing ? "Location Sharing Stopped" : "Location Sharing Started",
      description: isSharing 
        ? "Customer can no longer see your live location" 
        : "Customer can now see your live location",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success text-success-foreground";
      case "on_the_way":
        return "bg-accent text-accent-foreground";
      case "picked_up":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-gradient-accent py-4 px-4">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            className="text-accent-foreground mb-2"
            onClick={() => navigate("/delivery/orders")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
          <h1 className="text-xl font-bold text-accent-foreground">Order Details</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        {/* Order Info Card */}
        <Card className="p-6 shadow-card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">{order.id}</h2>
              <p className="text-sm text-muted-foreground">Tracking: {order.trackingCode}</p>
            </div>
            <Badge className={getStatusColor(currentStatus)}>
              {currentStatus.replace("_", " ").toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{order.customer}</p>
                <p className="text-sm text-muted-foreground">Customer</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <a href={`tel:${order.phone}`} className="font-medium text-primary hover:underline">
                  {order.phone}
                </a>
                <p className="text-sm text-muted-foreground">Tap to call</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm">{order.address}</p>
                <p className="text-xs text-muted-foreground">Delivery address</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Map Card */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Route Map</h3>
            <Button
              variant={isSharing ? "destructive" : "default"}
              size="sm"
              onClick={toggleLocationSharing}
            >
              <Navigation className="mr-2 h-4 w-4" />
              {isSharing ? "Stop Sharing" : "Share Location"}
            </Button>
          </div>
          <TrackingMap 
            deliveryLocation={order.deliveryLocation}
            destination={order.destination}
          />
        </Card>

        {/* Status Update Card */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>
          <div className="space-y-3">
            {currentStatus === "assigned" && (
              <Button 
                className="w-full bg-warning hover:bg-warning/90"
                onClick={() => handleStatusUpdate("picked_up")}
              >
                Mark as Picked Up
              </Button>
            )}
            {currentStatus === "picked_up" && (
              <Button 
                className="w-full bg-accent hover:bg-accent/90"
                onClick={() => handleStatusUpdate("on_the_way")}
              >
                Mark as On The Way
              </Button>
            )}
            {currentStatus === "on_the_way" && (
              <Button 
                className="w-full bg-success hover:bg-success/90"
                onClick={() => handleStatusUpdate("delivered")}
              >
                Mark as Delivered
              </Button>
            )}
            {currentStatus === "delivered" && (
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <p className="text-success font-semibold">✓ Order Delivered Successfully</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetail;
