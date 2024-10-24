import FrontImage from "@/components/FrontImage";
import Product from "@/components/Product";
import { getProducts } from "../utils/shopify";
import PreLoad from "@/components/PreLoad";

export default async function Home() {
  const shopifyProducts = await getProducts();
  const availableProducts = shopifyProducts.products.edges;
  // const variantId = availableProducts[0].node.variants.edges[0].node.id;

  // TODO: fix cart after checkout
  // TODO: and make sure that it says: "No more items available" if 0 are actually in stock of an item.

  return (
    <main className="flex top-12 flex-col">
      <PreLoad />
      <section className="overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 opacity-90">
          <FrontImage
            src={"/GRÜN.webm"}
            title="Enfant Sauvage"
            posterSrc="/temp_poster_blau.png"
          />
          <div className="hidden sm:block">
            <FrontImage
              src={"/SCHWARZ.webm"}
              posterSrc="/temp_poster_schwarz.png"
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
            src={"/TÜRKIS.webm"}
            posterSrc="/temp_poster_schwarz.png"
            title="En voyage"
          />
        </div>
      </section>
      <section className="overflow-hidden hidden sm:block">
        <div className="grid grid-cols-1 sm:grid-cols-2 opacity-90">
          <FrontImage
            src={"/TÜRKIS.webm"}
            title="En voyage"
            posterSrc="/temp_poster_blau.png"
          />
          <div className="hidden sm:block">
            <FrontImage
              src={"/BLAU.webm"}
              posterSrc="/temp_poster_schwarz.png"
              title="Amour"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
