import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { CartItem as CartItemType } from './CartProvider';
import { useCart } from './hooks';

/**
 * CartItem component
 * @param item Cart item
 * @returns CartItem component
 */

export const CartItem = ({ item }: { item: CartItemType }) => {
	const { updateQuantity, removeFromCart } = useCart();

	return (
		<div className="flex gap-4 py-4 border-b">
			<div className="relative w-20 h-20 flex-shrink-0">
				<Image
					src={item.image}
					alt={item.title}
					fill
					className="object-contain"
				/>
			</div>
			<div className="flex-1">
				<div className="flex justify-between items-start">
					<h3 className="font-medium line-clamp-2 flex-1 mr-2">{item.title}</h3>
					<Button
						size="icon"
						variant="ghost"
						className="h-8 w-8 text-destructive hover:bg-destructive/10"
						onClick={() => removeFromCart(item.id)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>

				<div className="mt-3 flex items-center justify-between">
					<p className="text-lg font-semibold text-primary">
						${(item.price * item.quantity).toFixed(2)}
					</p>
					<div className="flex items-center gap-2 ml-4">
						<Button
							size="icon"
							variant="outline"
							className="h-8 w-8"
							onClick={() => updateQuantity(item.id, item.quantity - 1)}
						>
							<Minus className="h-4 w-4" />
						</Button>
						<span className="w-8 text-center font-medium">{item.quantity}</span>
						<Button
							size="icon"
							variant="outline"
							className="h-8 w-8"
							onClick={() => updateQuantity(item.id, item.quantity + 1)}
						>
							<Plus className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

CartItem.displayName = 'CartItem';
