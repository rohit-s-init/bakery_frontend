import { MenuSection } from "@/components/site/Menu";
import { SiteLayout } from "@/components/site/SiteLayout";
import Item from "@/types/item.interface";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import macarons from "@/assets/macarons.jpg";
import croissants from "@/assets/croissants.jpg";
import tart from "@/assets/tart.jpg";
import eclair from "@/assets/eclair.jpg";
import cake from "@/assets/cake.jpg";
import hero from "@/assets/hero-pastries.jpg";
import { MyOrders } from "@/components/site/MyOrders";

export const Route = createFileRoute("/Order")({
  component: OrderPage,
});


function OrderPage() {

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(
      [
        { img: macarons, name: "Rose Macarons", price: "$3.50", desc: "Delicate almond shells with rose cream", tag: "Bestseller" },
        // { img: croissants, name: "Butter Croissants", price: "$4.20", desc: "72-hour laminated with French butter", tag: "Fresh Daily" },
        // { img: tart, name: "Berry Tartlet", price: "$6.80", desc: "Vanilla custard with wild berries", tag: "Seasonal" },
        // { img: eclair, name: "Dark Chocolate Éclair", price: "$5.50", desc: "Choux pastry, ganache, crème pâtissière", tag: "Classic" },
        // { img: cake, name: "Strawberry Fraisier", price: "$8.90", desc: "Génoise, cream, fresh strawberries", tag: "Signature" },
        // { img: hero, name: "Palette Assortment", price: "$28.00", desc: "A curated box of six pastries", tag: "Gift" },
      ]
    )
  }, [])

  return (
    <SiteLayout>
      {/* <Hero /> */}
      {/* <MenuSection /> */}
      <MyOrders items={items} />
      {/* <About />
      <Testimonials />
      <CTA /> */}
    </SiteLayout>
  );
}