'use client';

import { PostDetails } from '@/components/dashboard/PostDetails';
import { PostList } from '@/components/dashboard/PostList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
	const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

	return (
		<div className="dashboard p-8 h-screen">
			<div className="flex items-center gap-2 mb-8">
				<LayoutDashboard className="w-8 h-8 text-primary" />
				<h1 className="text-3xl font-bold">Admin Dashboard</h1>
			</div>
			<Separator className="mb-8 opacity-50" />

			<div className="layout flex gap-8 h-[calc(100vh-160px)]">
				<div className="w-1/3 min-w-[320px] border border-border/40 rounded-lg bg-muted/30">
					<ScrollArea className="h-[calc(100%-60px)]">
						<div className="p-4">
							<PostList
								onSelectPost={setSelectedPostId}
								selectedPostId={selectedPostId}
							/>
						</div>
					</ScrollArea>
				</div>

				<div className="w-2/3 border border-border/40 rounded-lg bg-muted/30">
					{selectedPostId ? (
						<PostDetails postId={selectedPostId} />
					) : (
						<div className="h-full flex items-center justify-center p-6">
							<div className="text-center space-y-2">
								<FileText className="w-12 h-12 text-muted-foreground/40 mx-auto" />
								<p className="text-muted-foreground">
									Select a post from the list to view details
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
