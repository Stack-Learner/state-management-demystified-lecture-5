import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, FileText } from 'lucide-react';
import { usePost } from './hooks';
import { UserDetails } from './UserDetails';

/**
 * PostDetails component.
 *
 * @param {number | null} postId - The post ID.
 * @returns {ReactNode} PostDetails component.
 */
export const PostDetails: React.FC<{ postId: number | null }> = ({
	postId,
}) => {
	const { data: post, error, isLoading } = usePost(postId);

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					Failed to load post details. Please try again later.
				</AlertDescription>
			</Alert>
		);
	}

	if (!post || isLoading) {
		return (
			<Card className="border-none shadow-none bg-transparent">
				<CardHeader className="px-6">
					<CardTitle className="text-xl font-semibold flex items-center gap-2">
						<FileText className="w-5 h-5" />
						Post Details
					</CardTitle>
				</CardHeader>
				<CardContent className="px-6 space-y-4">
					<Skeleton className="h-6 w-3/4" />
					<Skeleton className="h-24 w-full" />
					<Skeleton className="h-32 w-full" />
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="border-none shadow-none bg-transparent">
			<CardHeader className="px-6">
				<CardTitle className="text-xl font-semibold flex items-center gap-2">
					<FileText className="w-5 h-5" />
					Post Details
				</CardTitle>
			</CardHeader>
			<CardContent className="px-6">
				<h3 className="text-lg font-medium mb-3">{post.title}</h3>
				<p className="text-muted-foreground mb-6 leading-relaxed">
					{post.body}
				</p>
				<Separator className="my-6 opacity-50" />
				<UserDetails userId={post.userId} />
			</CardContent>
		</Card>
	);
};

PostDetails.displayName = 'PostDetails';
