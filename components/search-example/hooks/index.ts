import { useDebounce } from '@/hooks/use-debounce';
import { useQueryParams } from '@/hooks/use-query-params';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export type Post = {
	id: number;
	title: string;
	body: string;
	userId: number;
};

export type User = {
	id: number;
	name: string;
	username: string;
	email: string;
};

const ITEMS_PER_PAGE = 10;

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const fetcher = (url: string) =>
	fetch(`${BASE_URL}${url}`).then((res) => res.json());

/**
 * Fetches posts from the API based on the current page and search query
 *
 * @returns {Object} posts - The posts data
 * @returns {boolean} postsLoading - Whether the posts are loading
 * @returns {number} totalPages - The total number of pages
 */

export const usePosts = () => {
	const searchParams = useSearchParams();
	const page = Number(searchParams.get('page')) || 1;
	const search = searchParams.get('search') || '';
	const userId = searchParams.get('uid');

	// Construct the API URL with query parameters
	const queryParams = new URLSearchParams({
		_page: page.toString(),
		_limit: ITEMS_PER_PAGE.toString(),
		...(search && { title_like: search }),
		...(userId && { userId: userId }),
	});

	const { data, isLoading } = useSWR<{
		data: Post[];
		totalCount: number;
	}>(`/posts?${queryParams}`, async (url: string) => {
		const response = await fetch(`${BASE_URL}${url}`);
		const total = response.headers.get('x-total-count');
		const data = await response.json();
		return {
			data,
			totalCount: Number(total),
		};
	});

	const totalPages = Math.ceil((data?.totalCount || 0) / ITEMS_PER_PAGE);

	return {
		posts: data?.data,
		postsLoading: isLoading,
		totalPages,
	};
};

/**
 * Fetches users from the API
 *
 * @returns {Object} users - The users data
 * @returns {boolean} userLoading - Whether the users are loading
 */

export const useUser = () => {
	const { data: users, isLoading } = useSWR<User[]>('/users', fetcher);

	return { users, userLoading: isLoading };
};

/**
 * useSearch hook
 * Handles the search input and updates the query parameters
 *
 * @returns {number} currentPage - The current page
 * @returns {string} currentSearch - The current search query
 * @returns {string} currentUserId - The current user id
 * @returns {string} searchInput - The search input value
 * @returns {Function} setSearchInput - The function to set the search input value
 */

export function useSearch() {
	const { getParam, updateQuery } = useQueryParams({
		defaultValues: {
			page: '1',
			search: '',
		},
		resetValues: {
			search: '',
			uid: 'All',
			page: '1',
		},
	});

	const currentPage = Number(getParam('page'));
	const currentSearch = getParam('search');
	const currentUserId = getParam('uid');

	const [searchInput, setSearchInput] = useState(currentSearch);
	const debouncedSearch = useDebounce(searchInput, 300);

	useEffect(() => {
		if (debouncedSearch !== currentSearch) {
			updateQuery({ search: debouncedSearch, page: '1' });
		}
	}, [debouncedSearch]);

	return {
		currentPage,
		currentSearch,
		currentUserId,
		searchInput,
		setSearchInput,
	};
}
