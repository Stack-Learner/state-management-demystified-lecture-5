'use client';

import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { useSearch, useUser } from './hooks';

/**
 * Search header component
 *
 * Renders a search header
 *
 * @returns {JSX.Element} The search header component
 */

export const SearchHeader = () => {
	const { users } = useUser();
	const { searchInput, setSearchInput, currentUserId, updateQuery } =
		useSearch();

	return (
		<div className="flex gap-4">
			<Input
				type="text"
				placeholder="Search posts..."
				className="px-4 py-2 border rounded-lg flex-1"
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
			/>
			<Select
				value={currentUserId || 'All'}
				onValueChange={(value) =>
					updateQuery({ uid: value === 'All' ? null : value })
				}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select User" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="All">All Users</SelectItem>
						{users?.map((user) => (
							<SelectItem key={user.id} value={user.id.toString()}>
								{user.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

SearchHeader.displayName = 'SearchHeader';
