import { useRouter, useSearchParams } from 'next/navigation';

type QueryConfig = {
	defaultValues?: Record<string, string>;
	resetValues?: Record<string, string>;
};

/**
 * Hook to manage query parameters
 *
 * @param {QueryConfig} config - The query configuration
 * @returns {Object} The query parameters
 */

export function useQueryParams(config?: QueryConfig) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const getParam = (key: string) => {
		const value = searchParams.get(key);
		return value || config?.defaultValues?.[key] || '';
	};

	const updateQuery = (updates: Record<string, string | null>) => {
		const params = new URLSearchParams(searchParams.toString());

		Object.entries(updates).forEach(([key, value]) => {
			const resetValue = config?.resetValues?.[key];
			if (value === null || value === resetValue) {
				params.delete(key);
			} else {
				params.set(key, value);
			}
		});

		const queryString = params.toString();
		router.push(queryString ? `/?${queryString}` : '/');
	};

	return {
		getParam,
		updateQuery,
	};
}
