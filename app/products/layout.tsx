import { Cart } from '@/components/products/Cart';
import Link from 'next/link';

export default function ProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<nav className="fixed top-0 left-0 right-0 w-full bg-zinc-900 text-white z-50">
				<div className="h-14 container mx-auto flex items-center justify-between">
					<Link href="/demo/products">
						<h1 className="text-xl font-semibold">Demo App</h1>
					</Link>
					<div className="flex items-center gap-4">
						<Cart />
					</div>
				</div>
			</nav>
			{/* main content */}
			<main className="container mx-auto pt-16">{children}</main>
		</div>
	);
}
