import macarons from "@/assets/macarons.jpg";
import croissants from "@/assets/croissants.jpg";
import tart from "@/assets/tart.jpg";
import eclair from "@/assets/eclair.jpg";
import cake from "@/assets/cake.jpg";
import hero from "@/assets/hero-pastries.jpg";
import { useState } from "react";
import { OrderPopup } from "../ui/order-popup";
import { addOrder } from "@/api/order";
import { ApiResponse } from "@/types/orderdao.interface";

const items = [
  { img: macarons, name: "Rose Macarons", price: "$3.50", desc: "Delicate almond shells with rose cream", tag: "Bestseller" },
  { img: croissants, name: "Butter Croissants", price: "$4.20", desc: "72-hour laminated with French butter", tag: "Fresh Daily" },
  { img: tart, name: "Berry Tartlet", price: "$6.80", desc: "Vanilla custard with wild berries", tag: "Seasonal" },
  { img: eclair, name: "Dark Chocolate Éclair", price: "$5.50", desc: "Choux pastry, ganache, crème pâtissière", tag: "Classic" },
  { img: cake, name: "Strawberry Fraisier", price: "$8.90", desc: "Génoise, cream, fresh strawberries", tag: "Signature" },
  { img: hero, name: "Palette Assortment", price: "$28.00", desc: "A curated box of six pastries", tag: "Gift" },
];

// Define the item type
interface MenuItem {
  img: string;
  name: string;
  price: string;
  desc: string;
  tag: string;
}

// Define the order data type
interface OrderData {
  name: string;
  phone: string;
  address: string;
  quantity: number;
  notes: string;
}

export function MenuSection() {




  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleOrderClick = (item: MenuItem): void => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleOrderSubmit = async (orderData: OrderData) => {
    if (!selectedItem) return;

    console.log("Order submitted:", {
      item: selectedItem,
      ...orderData
    });

    // Here you would send the order to your backend
    const priceValue = parseFloat(selectedItem.price.replace("$", ""));
    const total = (priceValue * orderData.quantity).toFixed(2);

    const response: ApiResponse = await addOrder({
      quantity: orderData.quantity,
      totalAmount: Number(total),
      productName: selectedItem.name,
      productDescription: selectedItem.desc,
      phoneNo: orderData.phone,
      address: orderData.address
    })

    if (!response.success) {
      alert("Error : " + response.message);
    }
    //     alert(`Order placed for ${selectedItem.name}! 
    // Total: $${total}
    // We'll deliver to: ${orderData.address}`);

  };

  const handleClosePopup = (): void => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };




  return (
    <section id="menu" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center animate-fade-up">
          <p className="font-script text-3xl text-caramel">Our Menu</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl text-primary">
            Handcrafted delights, made to be savoured
          </h2>
          <p className="mt-4 text-muted-foreground">
            A rotating selection of pastries and cakes, baked in small batches from the freshest
            seasonal ingredients.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <article
              key={item.name}
              className="group relative overflow-hidden rounded-3xl bg-card shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2"
              style={{ animation: `fade-up 0.7s ${i * 90}ms ease-out both` }}
              onClick={() => handleOrderClick(item)}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-medium text-primary">
                  {item.tag}
                </span>
              </div>
              <div className="p-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-display text-2xl text-primary truncate">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.desc}</p>
                </div>
                <span className="shrink-0 font-display text-xl text-caramel">{item.price}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 font-medium shadow-soft hover:scale-105 transition-transform"
          >
            View Full Menu
          </a>
        </div>
      </div>

      {/* Order Popup */}
      {selectedItem && (
        <OrderPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          item={selectedItem}
          onSubmit={handleOrderSubmit}
        />
      )}

    </section>
  );
}
