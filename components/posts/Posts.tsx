'use client';

import { usePosts, useUser } from './hooks';

/**
 * Posts component
 *
 * Renders a list of posts
 *
 * @returns {JSX.Element} The posts component
 */

export const Posts = () => {
	const { posts, postsLoading } = usePosts();
	const { users } = useUser();

	if (posts?.length === 0) {
		return <div className="text-center">No posts found</div>;
	}

	if (postsLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="space-y-6">
			{posts?.map((post) => (
				<div key={post.id} className="p-6 border rounded-lg">
					<h2 className="text-xl font-bold mb-2">{post.title}</h2>
					<p className="mb-2">{post.body}</p>
					<p className="text-sm text-gray-500">
						By: {users?.find((u) => u.id === post.userId)?.name}
					</p>
				</div>
			))}
		</div>
	);
};

Posts.displayName = 'Posts';
