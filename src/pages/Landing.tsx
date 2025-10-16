import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, MapPin, Users, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-primary-foreground">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Track Your Deliveries in Real-Time
            </h1>
            <p className="mb-8 text-xl opacity-90 md:text-2xl">
              Modern last-mile tracking solution for customers and delivery partners
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg"
                onClick={() => navigate('/customer/login')}
              >
                <Package className="mr-2 h-5 w-5" />
                Track My Order
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => navigate('/delivery/login')}
              >
                <Users className="mr-2 h-5 w-5" />
                Delivery Partner Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">Why Choose LastMileTracker?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 shadow-card hover:shadow-elegant transition-all">
              <div className="mb-4 inline-block rounded-lg bg-primary p-3">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Live Tracking</h3>
              <p className="text-muted-foreground">
                Track your delivery in real-time with precise GPS location updates
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-elegant transition-all">
              <div className="mb-4 inline-block rounded-lg bg-accent p-3">
                <Smartphone className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy to Use</h3>
              <p className="text-muted-foreground">
                Simple interface for both customers and delivery partners
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-elegant transition-all">
              <div className="mb-4 inline-block rounded-lg bg-success p-3">
                <Package className="h-6 w-6 text-success-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Status Updates</h3>
              <p className="text-muted-foreground">
                Get instant notifications when your order status changes
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <p>© 2025 LastMileTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
