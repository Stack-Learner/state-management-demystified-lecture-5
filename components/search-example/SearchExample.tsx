'use client';

import { Pagination } from './Pagination';
import { Posts } from './Posts';
import { SearchHeader } from './SearchHeader';

/**
 * Search example component
 *
 * Renders a search example
 *
 * @returns {JSX.Element} The search example component
 */

export const SearchExample = () => {
	return (
		<div className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<SearchHeader />
				</div>

				<Posts />

				<div className="mt-8">
					<Pagination />
				</div>
			</div>
		</div>
	);
};

SearchExample.displayName = 'SearchExample';
