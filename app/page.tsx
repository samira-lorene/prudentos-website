import FrontImage from "@/components/FrontImage";
import Product from "@/components/Product";
import { getProducts } from "../utils/shopify";
import PreLoad from "@/components/PreLoad";

export default async function Home() {
  const shopifyProducts = await getProducts();
  const availableProducts = shopifyProducts.products.edges;
  // const variantId = availableProducts[0].node.variants.edges[0].node.id;

  // reihenfolge: grün, schwarz, unten: türkis, blau

  return (
    <main className="flex top-12 flex-col">
      <PreLoad />
      <section className="overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 opacity-90">
          <FrontImage
            src={"/GRUEN_web.webm"}
            title="Enfant Sauvage"
            posterSrc="/gruen.webp"
          />
          <div className="hidden sm:block">
            <FrontImage
              src={"/SCHWARZ_web.webm"}
              posterSrc="/schwarz.webp"
              title="Ma vie"
            />
          </div>
        </div>
      </section>
      <section className="">
        <div className="grid grid-cols-2 md:grid-cols-4 p-1 gap-1">
          {availableProducts.map((product: any) => (
            <Product
              key={product.node.id}
              {...product.node}
              variantId={product.node.variants?.edges[0]?.node?.id}
            />
          ))}
        </div>
      </section>
      <section className="overflow-hidden">
        <div className="sm:hidden block">
          <FrontImage
            src={"/TUERKIS_web.webm"}
            posterSrc="/tuerkis.webp"
            title="En voyage"
          />
        </div>
      </section>
      <section className="overflow-hidden hidden sm:block">
        <div className="grid grid-cols-1 sm:grid-cols-2 opacity-90">
          <FrontImage
            src={"/TUERKIS_web.webm"}
            title="En voyage"
            posterSrc="/tuerkis.webp"
          />
          <div className="hidden sm:block">
            <FrontImage
              src={"/BLAU_web.webm"}
              posterSrc="/blau.webp"
              title="Amour"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
