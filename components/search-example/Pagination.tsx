import { useQueryParams } from '@/hooks/use-query-params';
import { Button } from '../ui/button';
import { usePosts, useSearch } from './hooks';

/**
 * Pagination component
 *
 * Renders a list of page numbers that can be clicked to navigate to a different page
 *
 * @returns {JSX.Element} The pagination component
 */

export const Pagination = () => {
	const { totalPages } = usePosts();
	const { updateQuery } = useQueryParams();
	const { currentPage } = useSearch();

	return (
		<div className="flex justify-center gap-2">
			{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
				<Button
					key={pageNum}
					onClick={() => updateQuery({ page: pageNum.toString() })}
					className={`px-4 py-2 border rounded ${
						pageNum === currentPage
							? 'bg-blue-500 text-white'
							: 'hover:bg-gray-100'
					}`}
				>
					{pageNum}
				</Button>
			))}
		</div>
	);
};

Pagination.displayName = 'Pagination';
