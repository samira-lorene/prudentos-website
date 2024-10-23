"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import useStore from "@/app/(store)/store";
import { addToCart, updateCart } from "@/utils/shopify";

export default function FavoritesModal({
  openModal,
  closeModal,
}: {
  openModal: any;
  closeModal: any;
}) {
  const favorites = useStore((state: any) => state.favorites);
  const removeFavorite = useStore((state: any) => state.removeFavorite);

  const handleAddToCart = async (favoriteId: string) => {
    console.log("add to cart");
    console.log(favoriteId);

    let cartId = sessionStorage.getItem("cartId") || "";
    console.log("cartId", cartId);
    if (cartId) {
      console.log("updating cart");
      await updateCart(cartId, favoriteId, 1);
    } else {
      let data = await addToCart(favoriteId, 1);
      cartId = data.cartCreate.cart.id;
      sessionStorage.setItem("cartId", cartId);
    }
    closeModal();
  };

  return (
    <div
      className={`fixed top-0 flex flex-col px-8 py-6 right-0 w-screen md:w-5/12 bg-white h-screen shadow-sm md:border-l transition-transform transform duration-700 ${
        openModal ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ zIndex: openModal ? 1000 : 50 }} // Increase z-index when sidebar is open
    >
      <div className="flex items-center justify-between py-2">
        <h1 className="font-light text-xs normal-case">Favorites</h1>
        <button
          className="fixed right-6 transform transition-transform duration-200 hover:rotate-90 cursor-pointer"
          onClick={closeModal}
        >
          <Cross1Icon />
        </button>
      </div>
      {favorites.length > 0 ? (
        <ul className="h-[80%] overflow-y-auto">
          {favorites.map((favorite: any, index: number) => (
            <li key={index} className="flex gap-4 mb-2">
              <div className="w-32">
                <img
                  className="object-fit h-auto w-full"
                  src={favorite.featuredImage.url}
                  alt="product_thumbnail"
                ></img>
              </div>
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs mb-4 normal-case font-light">
                      {favorite.title}
                    </span>
                    <span
                      className="normal-case font-light"
                      style={{ fontSize: "0.6rem", marginBlockEnd: "0.1rem" }}
                    >
                      {favorite.color}
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span
                      style={{ fontSize: "0.6rem" }}
                      className="tracking-widest font-light"
                    >
                      {parseInt(favorite.priceRange.minVariantPrice.amount)} EUR
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    style={{ fontSize: "0.6rem" }}
                    className="tracking-widest headerLink"
                    onClick={() => handleAddToCart(favorite.variantId)}
                  >
                    Add to Cart
                  </button>
                  <button
                    style={{ fontSize: "0.6rem" }}
                    className="uppercase tracking-widest headerLink"
                    onClick={() => removeFavorite(favorite.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col p-4 gap-4 flex-1">
          <div className="text-center text-xs opacity-50 translate-y-1/3 normal-case">
            Your favorites list is empty
          </div>
        </div>
      )}
    </div>
  );
}
