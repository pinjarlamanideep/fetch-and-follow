import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Clock, CheckCircle2, Truck, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import TrackingMap from "@/components/TrackingMap";

const TrackOrder = () => {
  const navigate = useNavigate();
  const [trackingCode, setTrackingCode] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  
  // Mock order data
  const [orderData, setOrderData] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode) {
      toast({
        title: "Error",
        description: "Please enter a tracking code",
        variant: "destructive",
      });
      return;
    }

    // Mock tracking data - in real app, fetch from backend
    setOrderData({
      code: trackingCode,
      status: "on_the_way",
      estimatedTime: "15 mins",
      deliveryBoy: {
        name: "John Smith",
        phone: "+1234567890",
        location: { lat: 51.505, lng: -0.09 }
      },
      destination: { lat: 51.515, lng: -0.1 },
      timeline: [
        { status: "placed", label: "Order Placed", time: "10:30 AM", completed: true },
        { status: "picked_up", label: "Picked Up", time: "10:45 AM", completed: true },
        { status: "on_the_way", label: "On The Way", time: "11:00 AM", completed: true },
        { status: "delivered", label: "Delivered", time: "—", completed: false },
      ]
    });
    setIsTracking(true);
    toast({
      title: "Order Found!",
      description: "Tracking your delivery",
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

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    }
    switch (status) {
      case "on_the_way":
        return <Truck className="h-5 w-5 text-accent" />;
      case "picked_up":
        return <Package className="h-5 w-5 text-warning" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-gradient-primary py-4 px-4">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary-foreground" />
            <h1 className="text-xl font-bold text-primary-foreground">Track Order</h1>
          </div>
          <Button variant="ghost" className="text-primary-foreground" onClick={() => navigate("/")}>
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl p-4">
        {!isTracking ? (
          <Card className="p-6 shadow-elegant mt-8">
            <div className="mb-6 text-center">
              <div className="mb-4 inline-block rounded-lg bg-gradient-primary p-4">
                <Search className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Enter Tracking Code</h2>
              <p className="text-muted-foreground">Track your delivery in real-time</p>
            </div>

            <form onSubmit={handleTrack} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Tracking Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="e.g., TRK123456"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Track Order
              </Button>
            </form>
          </Card>
        ) : (
          <div className="space-y-6 mt-6">
            {/* Order Status Card */}
            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">Order #{orderData.code}</h2>
                  <p className="text-muted-foreground">Estimated delivery: {orderData.estimatedTime}</p>
                </div>
                <Badge className={getStatusColor(orderData.status)}>
                  {orderData.status.replace("_", " ").toUpperCase()}
                </Badge>
              </div>

              {/* Timeline */}
              <div className="space-y-4 mt-6">
                {orderData.timeline.map((item: any, index: number) => (
                  <div key={item.status} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`rounded-full p-2 ${item.completed ? 'bg-success/10' : 'bg-muted'}`}>
                        {getStatusIcon(item.status, item.completed)}
                      </div>
                      {index < orderData.timeline.length - 1 && (
                        <div className={`w-0.5 h-12 ${item.completed ? 'bg-success' : 'bg-border'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <h3 className={`font-semibold ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {item.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Map Card */}
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold">Live Location</h3>
              </div>
              <TrackingMap 
                deliveryLocation={orderData.deliveryBoy.location}
                destination={orderData.destination}
              />
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">{orderData.deliveryBoy.name}</p>
                <p className="text-sm text-muted-foreground">Your delivery partner</p>
              </div>
            </Card>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setIsTracking(false);
                setTrackingCode("");
              }}
            >
              Track Another Order
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
