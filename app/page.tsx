import FrontImage from "@/components/FrontImage";
import Product from "@/components/Product";
import { getProducts } from "../utils/shopify";
import PreLoad from "@/components/PreLoad";

export default async function Home() {
  const shopifyProducts = await getProducts();
  const availableProducts = shopifyProducts.products.edges;
  // const variantId = availableProducts[0].node.variants.edges[0].node.id;

  return (
    <main className="flex top-12 flex-col">
      <PreLoad />
      <section className="overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 opacity-90">
          <FrontImage
            src={"/BLAU.webm"}
            title='"Back to work"'
            posterSrc="/temp_poster_blau.png"
          />
          <div className="hidden sm:block">
            <FrontImage
              src={"/SCHWARZ.webm"}
              posterSrc="/temp_poster_schwarz.png"
              title="Le Chiquito noeud"
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
            src={"/SCHWARZ.webm"}
            posterSrc="/temp_poster_schwarz.png"
            title="Le Chiquito noeud"
          />
        </div>
      </section>
    </main>
  );
}
