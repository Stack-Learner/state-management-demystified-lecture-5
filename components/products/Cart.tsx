'use client';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingCartIcon } from 'lucide-react';
import { CartItem } from './CartItem';
import { CartProvider } from './CartProvider';
import { useCart } from './hooks';

/**
 * Cart component
 * @returns Cart component
 */

export const Cart = () => {
	return (
		<CartProvider>
			<CartContent />
		</CartProvider>
	);
};

Cart.displayName = 'Cart';

/**
 * CartContent component
 * @returns CartContent component
 */

const CartContent = () => {
	const { cart, total } = useCart();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="secondary" size="sm">
					<ShoppingCartIcon className="w-4 h-4 mr-2" />
					Cart
					<span className="ml-2 text-sm font-medium">{cart.size}</span>
				</Button>
			</SheetTrigger>
			<SheetContent className="flex flex-col w-[95vw] sm:w-[640px] max-w-[95vw] sm:max-w-[640px] h-full">
				<SheetHeader>
					<SheetTitle>Shopping Cart</SheetTitle>
				</SheetHeader>
				<div className="flex-1 overflow-y-auto">
					{cart.size === 0 ? (
						<p className="text-center text-muted-foreground py-8">
							Your cart is empty
						</p>
					) : (
						<div className="space-y-4">
							{Array.from(cart.values()).map((item) => (
								<CartItem key={item.id} item={item} />
							))}
						</div>
					)}
				</div>
				{cart.size > 0 && (
					<SheetFooter className="mt-auto">
						<div className="w-full space-y-4">
							<div className="flex items-center justify-between">
								<span className="font-medium">Total</span>
								<span className="font-bold">${total.toFixed(2)}</span>
							</div>
							<Button className="w-full" size="lg">
								Checkout
							</Button>
						</div>
					</SheetFooter>
				)}
			</SheetContent>
		</Sheet>
	);
};

CartContent.displayName = 'CartContent';
