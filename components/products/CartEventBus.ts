import EventEmitter from 'events';
const eventBus = new EventEmitter();
export default eventBus;

export enum CartEvents {
	ADD_TO_CART = 'add_to_cart',
}

export type CartEventPayloads = {
	[CartEvents.ADD_TO_CART]: {
		product: {
			id: number;
			title: string;
			price: number;
			image: string;
		};
	};
};
