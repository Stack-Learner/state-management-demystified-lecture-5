import { createContext, useEffect, useState } from 'react';
import CartEventBus, { CartEventPayloads, CartEvents } from './CartEventBus';

export type CartItem = CartEventPayloads[CartEvents.ADD_TO_CART]['product'] & {
	quantity: number;
};

export type CartContextType = {
	cart: Map<number, CartItem>;
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number) => void;
	updateQuantity: (id: number, quantity: number) => void;
	total: number;
};

export const CartContext = createContext<CartContextType | undefined>(
	undefined
);

// This is a hook that listens for the ADD_TO_CART event and adds the item to the cart
// It is used to update the cart when the user adds an item to the cart
const useCartEventListener = (addToCart: (item: CartItem) => void) => {
	useEffect(() => {
		const handleEvent = (
			payload: CartEventPayloads[CartEvents.ADD_TO_CART]
		) => {
			addToCart({ ...payload.product, quantity: 1 });
		};

		CartEventBus.on(CartEvents.ADD_TO_CART, handleEvent);
		return () => {
			CartEventBus.off(CartEvents.ADD_TO_CART, handleEvent);
		};
	}, [addToCart]);
};

// This is a provider that provides the cart context to the app
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [cart, setCart] = useState<Map<number, CartItem>>(new Map());

	const addToCart = (item: CartItem) => {
		setCart((prev) => {
			const newCart = new Map(prev);
			const existingItem = newCart.get(item.id);
			if (existingItem) {
				newCart.set(item.id, {
					...existingItem,
					quantity: existingItem.quantity + 1,
				});
			} else {
				newCart.set(item.id, item);
			}
			return newCart;
		});
	};

	const removeFromCart = (id: number) => {
		setCart((prev) => {
			const newCart = new Map(prev);
			newCart.delete(id);
			return newCart;
		});
	};

	const updateQuantity = (id: number, quantity: number) => {
		if (quantity < 1) return;
		setCart((prev) => {
			const newCart = new Map(prev);
			const item = newCart.get(id);
			if (item) {
				newCart.set(id, { ...item, quantity });
			}
			return newCart;
		});
	};

	const total = Array.from(cart.values()).reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	useCartEventListener(addToCart);

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, updateQuantity, total }}
		>
			{children}
		</CartContext.Provider>
	);
};
