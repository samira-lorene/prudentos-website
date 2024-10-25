import { getProduct } from "@/utils/shopify";
import ProductPageContent from "./contents";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // https://nextjs.org/docs/app/api-reference/file-conventions/page
  const id = (await searchParams).id;

  // const id = searchParams.id;
  const product = await getProduct(id);

  return (
    <>
      <ProductPageContent product={product} id={id} />
    </>
  );
}
