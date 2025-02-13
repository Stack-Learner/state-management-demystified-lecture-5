import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, FileText } from 'lucide-react';
import { Post, usePosts } from './hooks';

type PostListItemProps = {
	post: Post;
	isSelected: boolean;
	onSelect: (id: number) => void;
};

/**
 * PostListItem component.
 *
 * @param {Post} post - The post object.
 * @param {boolean} isSelected - The selected state.
 * @param {Function} onSelect - The onSelect function.
 *
 * @returns {ReactNode} PostListItem component.
 */

const PostListItem = ({ post, isSelected, onSelect }: PostListItemProps) => {
	return (
		<div
			onClick={() => onSelect(post.id)}
			className={`
				group flex items-center gap-3 p-3 cursor-pointer rounded-md transition-colors
				hover:bg-muted/80
				${isSelected ? 'bg-muted' : ''}
			`}
		>
			<FileText
				className={`w-4 h-4 ${
					isSelected ? 'text-primary' : 'text-muted-foreground'
				}`}
			/>
			<p
				className={`text-sm line-clamp-1 ${
					isSelected ? 'font-medium text-primary' : ''
				}`}
			>
				{post.title}
			</p>
		</div>
	);
};

PostListItem.displayName = 'PostListItem';

/**
 * PostListSkeleton component.
 *
 * @returns {ReactNode} PostListSkeleton component.
 */

const PostListSkeleton = () => {
	return (
		<div className="space-y-2">
			{Array.from({ length: 5 }).map((_, i) => (
				<div key={i} className="flex items-center gap-3 p-3">
					<Skeleton className="w-4 h-4" />
					<Skeleton className="h-4 w-[80%]" />
				</div>
			))}
		</div>
	);
};

PostListSkeleton.displayName = 'PostListSkeleton';

/**
 * PostList component.
 *
 * @param {Function} onSelectPost - The onSelectPost function.
 * @param {number | null} selectedPostId - The selected post ID.
 *
 * @returns {ReactNode} PostList component.
 */

export const PostList: React.FC<{
	onSelectPost: (id: number) => void;
	selectedPostId?: number | null;
}> = ({ onSelectPost, selectedPostId }) => {
	const { data: posts, error } = usePosts();

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					Failed to load posts. Please try again later.
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<Card className="border-none shadow-none bg-transparent">
			<CardHeader className="px-2">
				<CardTitle className="text-xl font-semibold flex items-center gap-2">
					<FileText className="w-5 h-5" />
					Posts
				</CardTitle>
			</CardHeader>
			<CardContent className="px-2">
				{!posts ? (
					<PostListSkeleton />
				) : (
					<div className="space-y-1">
						{posts.map((post: Post) => (
							<PostListItem
								key={post.id}
								post={post}
								isSelected={post.id === selectedPostId}
								onSelect={onSelectPost}
							/>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

PostList.displayName = 'PostList';
