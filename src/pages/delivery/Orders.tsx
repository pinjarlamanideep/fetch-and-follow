import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Truck, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeliveryOrders = () => {
  const navigate = useNavigate();
  
  // Mock orders data
  const [orders] = useState([
    {
      id: "ORD123456",
      trackingCode: "TRK123456",
      status: "picked_up",
      customer: "Alice Johnson",
      address: "123 Main St, City, State 12345",
      phone: "+1234567890",
      estimatedTime: "15 mins"
    },
    {
      id: "ORD123457",
      trackingCode: "TRK123457",
      status: "assigned",
      customer: "Bob Smith",
      address: "456 Oak Ave, City, State 12345",
      phone: "+1234567891",
      estimatedTime: "25 mins"
    },
  ]);

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
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-accent-foreground" />
            <h1 className="text-xl font-bold text-accent-foreground">My Deliveries</h1>
          </div>
          <Button variant="ghost" className="text-accent-foreground" onClick={() => navigate("/")}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl p-4">
        <div className="space-y-4 mt-6">
          {orders.length === 0 ? (
            <Card className="p-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No active deliveries</h3>
              <p className="text-muted-foreground">New orders will appear here</p>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="p-6 shadow-card hover:shadow-elegant transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold">{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Code: {order.trackingCode}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm">{order.address}</p>
                      <p className="text-xs text-muted-foreground">ETA: {order.estimatedTime}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/delivery/order/${order.id}`)}
                  >
                    View Details & Update Status
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryOrders;
