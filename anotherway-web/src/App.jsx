import "./styles/global.css";

import Navbar         from "./components/Navbar/Navbar";
import HeroSection    from "./components/HeroSection/HeroSection";
import ProductSection from "./components/ProductSection/ProductSection";
import OrderForm      from "./components/OrderForm/OrderForm";
import Footer         from "./components/Footer/Footer";

import { usePreOrder } from "./hooks/usePreOrder";

export default function App() {
  const {
    selectedSize, setSelectedSize,
    qty, setQty,
    form, setForm,
    step,
    loading, error, orderId,
    proceedToForm,
    submitOrder,
    reset,
  } = usePreOrder();

  return (
    <div>
      <div className="noise" />

      <Navbar />

      <HeroSection />

      <ProductSection
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        qty={qty}
        setQty={setQty}
        onProceed={proceedToForm}
      />

      <OrderForm
        form={form}
        setForm={setForm}
        selectedSize={selectedSize}
        qty={qty}
        step={step}
        loading={loading}
        error={error}
        orderId={orderId}
        onSubmit={submitOrder}
        onReset={reset}
      />

      <Footer />
    </div>
  );
}