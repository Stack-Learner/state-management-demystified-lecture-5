import { Pagination } from '@/components/posts/Pagination';
import { Posts } from '@/components/posts/Posts';
import { SearchHeader } from '@/components/posts/SearchHeader';

const PostsPage = () => {
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

export default PostsPage;
