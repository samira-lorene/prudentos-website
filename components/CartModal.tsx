"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  retrieveCart,
  getCheckoutUrl,
  updateCartItemQuantity,
  removeCartItem,
} from "@/utils/shopify";
import { useEffect, useState } from "react";
import useStore from "@/app/(store)/store";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { toast } from "sonner";

function extractColor(str: string) {
  let match = str.match(/Color:\s*([a-zA-Z0-9-]+)/);
  let color = match ? match[1].trim().replace(/-/g, " ") : null;
  return color;
}

export default function CartModal({
  openModal,
  closeModal,
}: {
  openModal: any;
  closeModal: any;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState<any>(null);

  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [cartItems, setCartItems] = useState([]);

  // const addFavorite = useStore((state: any) => state.addFavorite);
  // const removeFavorite = useStore((state: any) => state.removeFavorite);
  // const favorites = useStore((state: any) => state.favorites);
  const openCartModalStatus = useStore(
    (state: any) => state.openCartModalStatus
  );

  const setOpenCartModal = useStore((state: any) => state.setOpenCartModal);

  const fetchProduct = async () => {
    try {
      const cartId = sessionStorage.getItem("cartId") || "";
      const cart = await retrieveCart(cartId);
      setCart(cart);
      setCartItems(cart.lines.edges);

      const data = await getCheckoutUrl(cartId);
      const { checkoutUrl } = data.cart;
      setCheckoutUrl(checkoutUrl);
      // setProduct(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (openCartModalStatus === false) return;
    fetchProduct();
  }, [openCartModalStatus]);

  const handleUpdateQuantity = async (
    nodeId: string,
    newQuantity: number,
    useableId: string,
    availableItems: number
  ) => {
    if (newQuantity < 1) return;

    if (newQuantity > availableItems) {
      toast.warning("Sorry, no further items are available.");
      return;
    }

    setLoading(true);
    let cartId = sessionStorage.getItem("cartId") || "";
    console.log("cartId", cartId);
    if (cartId) {
      await updateCartItemQuantity(cartId, nodeId, newQuantity);
    }
    fetchProduct();
    setLoading(false);
  };

  const handleRemoveItem = async (nodeId: string) => {
    let cartId = sessionStorage.getItem("cartId") || "";
    if (cartId) {
      await removeCartItem(cartId, nodeId);
    }
    fetchProduct();
  };

  const handleCheckout = () => {
    setOpenCartModal();
    window.open(checkoutUrl, "_blank");
    window.location.replace("/");
  };

  // TODO: fix height of modals on mobile screens
  // for some reason its completetly broken
  // i think its somehting to do with: setHeaderHeight() (from cart)

  // TODO: make sure videos (autoPlay of videos) work on iPhone

  // TODO: use dynamic height or inset-0 for the modals
  // and for the product page on mobile screeens

  return (
    <div
      className={`fixed top-0 flex flex-col px-10 py-6 right-0 w-screen md:w-5/12 bg-white h-screen shadow-sm md:border-l transition-transform transform duration-700 ${
        openModal ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ zIndex: openModal ? 1000 : 50 }} // Increase z-index when sidebar is open
    >
      <div className="flex items-center justify-between py-2">
        <h1 className="font-light text-xs normal-case">Cart</h1>
        <button
          className="fixed right-6 transform transition-transform duration-200 hover:rotate-90 cursor-pointer"
          onClick={closeModal}
        >
          <Cross1Icon />
        </button>
      </div>

      {/* <div className="flex flex-col p-4 gap-4 flex-1"> */}
      {cartItems.length === 0 ? (
        <div className="text-center normal-case text-xs opacity-50 translate-y-1/3">
          Your cart is empty
        </div>
      ) : (
        <ul className="h-[90%] overflow-y-auto">
          {cartItems.map((item: any, index: number) => (
            <li key={index} className="flex gap-4 mb-2">
              <div className="w-32">
                <img
                  className="object-fit h-auto w-full"
                  src={item.node.merchandise.product.featuredImage.url}
                  alt={item.node.merchandise.product.featuredImage.altText}
                ></img>
              </div>
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between">
                  <div className="flex flex-col normal-case">
                    <span className="text-xs mb-4 font-light">
                      {item.node.merchandise.product.title}
                    </span>
                    <div className="flex flex-col gap-2">
                      <span
                        style={{
                          fontWeight: "300",
                          fontSize: "0.6rem",
                          marginBlockEnd: "0.1rem",
                        }}
                      >
                        {extractColor(
                          item.node.merchandise.product.description
                        )}
                      </span>
                      {/* <span
                        style={{
                          fontWeight: "300",
                          fontSize: "0.6rem",
                          marginBlockEnd: "0.1rem",
                        }}
                      >
                        One Size
                      </span> */}
                      <div
                        style={{
                          fontWeight: "300",
                          fontSize: "0.6rem",
                          marginBlockEnd: "0.1rem",
                        }}
                        className="flex gap-2"
                      >
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.node.id,
                              item.node.quantity - 1,
                              item.node.merchandise.id,
                              item.node.merchandise.quantityAvailable
                            )
                          }
                        >
                          -
                        </button>
                        <div className="flex items-center gap-1">
                          Qty{" "}
                          {loading ? (
                            <div>
                              <LoadingSpinner />
                            </div>
                          ) : (
                            <span>{item.node.quantity} </span>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.node.id,
                              item.node.quantity + 1,
                              item.node.merchandise.id,
                              item.node.merchandise.quantityAvailable
                            )
                          }
                          // disabled={
                          //   item.node.quantity + 1 >
                          //   item.node.merchandise.quantityAvailable
                          // }
                          // className={`${
                          //   item.node.quantity + 1 >
                          //   item.node.merchandise.quantityAvailable && "opacity-0"
                          // }`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span
                      style={{ fontSize: "0.6rem" }}
                      className="tracking-widest font-light"
                    >
                      {parseInt(
                        item.node.merchandise.product.priceRange.minVariantPrice
                          .amount
                      )}{" "}
                      EUR
                    </span>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  {/* <button
                    style={{ fontSize: "0.6rem" }}
                    className="tracking-widest headerLink font-light"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteClick(item.node.id);
                    }}
                  >
                    Add to Favorites
                  </button> */}
                  <button
                    style={{ fontSize: "0.6rem" }}
                    className="uppercase tracking-widest headerLink font-light"
                    onClick={() => handleRemoveItem(item.node.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="">
          <div className="flex justify-between pb-0">
            <p className="uppercase tracking-widest font-light text-sm">
              Total
            </p>
            <p className="">
              {parseInt(cart?.estimatedCost.totalAmount.amount)}
              <span className="pl-1">EUR</span>
            </p>
          </div>
          <button className={`checkoutButton`} onClick={handleCheckout}>
            <div
              className={``}
              style={{
                letterSpacing: "0.1em",
                display: "flex",
                left: "0",
                right: "0",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div className="flex text-xs w-full items-center justify-center uppercase">
                <span>Checkout</span>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
