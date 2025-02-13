'use client';

import CartEventBus, { CartEvents } from '@/components/products/CartEventBus';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import useSWR from 'swr';

type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: { rate: number; count: number };
};

const fetcher = (url: string) =>
	fetch(`https://fakestoreapi.com${url}`).then((res) => res.json());

export default function Products() {
	const { data, isLoading, error } = useSWR<Product[]>('/products', fetcher);

	if (error) {
		return (
			<div className="py-8 text-center">
				<h2 className="text-2xl font-bold text-red-600">
					Error loading products
				</h2>
				<p className="mt-2 text-gray-600">Please try again later</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="py-8">
				<h1 className="text-3xl font-bold mb-8">Products</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{[...Array(8)].map((_, i) => (
						<div key={i} className="border rounded-lg p-4 h-[400px]">
							<div className="h-48 bg-gray-200 animate-pulse rounded-md" />
							<div className="mt-4 h-6 bg-gray-200 animate-pulse rounded" />
							<div className="mt-2 h-16 bg-gray-200 animate-pulse rounded" />
							<div className="mt-4 flex justify-between">
								<div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
								<div className="w-24 h-8 bg-gray-200 animate-pulse rounded" />
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="py-8">
			<h1 className="text-3xl font-bold mb-8">Products</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{data?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
			<CardHeader className="relative h-48 p-0">
				<Image
					src={product.image}
					alt={product.title}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="object-contain p-4 transition-transform duration-300 hover:scale-105"
					loading="lazy"
					placeholder="blur"
					blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwSkNOPTYwPjUwRkpaTUJHV09IXl9gY2JkZWRISVFRXnF5emdqZ2n/2wBDARUXFx4aHR4eHWlXSVdpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
				/>
			</CardHeader>
			<CardContent className="p-6">
				<div className="flex items-center gap-2 mb-2">
					<Badge
						variant="secondary"
						className="transition-colors hover:bg-primary hover:text-primary-foreground"
					>
						{product.category}
					</Badge>
					<div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
						<Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
						<span>{product.rating.rate}</span>
						<span>({product.rating.count})</span>
					</div>
				</div>
				<h3 className="font-semibold text-lg truncate hover:text-primary transition-colors">
					{product.title}
				</h3>
				<p className="text-sm text-muted-foreground mt-2 line-clamp-2">
					{product.description}
				</p>
				<div className="mt-4 flex items-center justify-between">
					<p className="text-lg font-semibold hover:text-primary transition-colors">
						${product.price}
					</p>
					<Button
						size="sm"
						className="transition-all duration-300 hover:scale-105"
						onClick={() => {
							CartEventBus.emit(CartEvents.ADD_TO_CART, {
								product: {
									id: product.id,
									title: product.title,
									price: product.price,
									image: product.image,
								},
							});
						}}
					>
						<ShoppingCart className="w-4 h-4 mr-2" />
						Add to Cart
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
