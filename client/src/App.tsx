import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import OrdersPage from "./pages/OrdersPage";
import OwnerOrdersPage from "./pages/OwnerOrdersPage";
import DeliveryInfoPage from "./pages/DeliveryInfoPage";
import AboutPage from "./pages/AboutPage";
import SupportPage from "./pages/SupportPage";
import PoliciesPage from "./pages/PoliciesPage";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={AboutPage} />
      <Route path={"/product"} component={ProductPage} />
      <Route path={"/cart"} component={CartPage} />
      <Route path={"/checkout"} component={CheckoutPage} />
      <Route path={"/orders"} component={OrdersPage} />
      <Route path={"/delivery-installation"} component={DeliveryInfoPage} />
      <Route path={"/support"} component={SupportPage} />
      <Route path={"/policies"} component={PoliciesPage} />
      <Route path={"/order-confirmation"} component={OrderConfirmation} />
      <Route path={"/admin"} component={AdminOrdersPage} />
      <Route path={"/admin/orders"} component={AdminOrdersPage} />
      <Route path={"/owner-orders"} component={OwnerOrdersPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
