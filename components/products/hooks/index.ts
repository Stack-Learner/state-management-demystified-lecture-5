import { useContext } from 'react';
import { CartContext } from '../CartProvider';

/**
 * Custom hook to access the cart context
 *
 * @returns {CartContextType} The cart context
 */

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
