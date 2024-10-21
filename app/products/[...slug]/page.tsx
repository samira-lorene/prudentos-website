import { getProduct } from "@/utils/shopify";
import ProductPageContent from "./contents";

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = searchParams.id;
  const product = await getProduct(id);

  return (
    <>
      <ProductPageContent product={product} id={id} />
    </>
  );
}
