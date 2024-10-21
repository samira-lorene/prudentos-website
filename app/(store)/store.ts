// Your store is a hook! You can put anything in it: primitives, objects, functions. The set function merges state.

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      headerHeight: 0,
      setHeaderHeight: (newHeight: number) => {
        set({ headerHeight: newHeight });
      },

      openCartModalStatus: false,
      setOpenCartModal: () => {
        set((state: { openCartModalStatus: boolean }) => {
          return {
            ...state,
            openCartModalStatus: !state.openCartModalStatus,
          };
        });
      },

      numberOfCartItems: 0,
      setNumberOfCartItems: (newNumberCartItems: number) => {
        set({ numberOfCartItems: newNumberCartItems });
      },


      favorites: [],
      addFavorite: (params: any) => {
        const { newItem } = params;
        set((state: any) => {
          const newFavorites = [...state.favorites, newItem];
          return { ...state, favorites: newFavorites };
        });
      },
      removeFavorite: (id: string) => {
        set((state: any) => {
          const newFavorites = state.favorites.filter((favorite: any) => {
            return favorite.id !== id;
          });
          return {
            ...state,
            favorites: newFavorites,
          };
        });
      },

      openFavoritesModalStatus: false,
      setOpenFavoritesModal: () => {
        set((state: { openFavoritesModalStatus: boolean }) => {
          return {
            ...state,
            openFavoritesModalStatus: !state.openFavoritesModalStatus,
          };
        });
      },
    }),
    {
      name: "prudentos-storage", // name of the item in the storage (must be unique)
    }
  )
);

export default useStore;
