import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, User } from 'lucide-react';
import { useUser } from './hooks';

/**
 * UserDetails component.
 *
 * @param {number | null} userId - The user ID.
 * @returns {ReactNode} UserDetails component.
 */

export const UserDetails: React.FC<{ userId: number | null }> = ({
	userId,
}) => {
	const { data: user, error, isLoading } = useUser(userId);

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>
					Failed to load author details. Please try again later.
				</AlertDescription>
			</Alert>
		);
	}

	if (!user || isLoading) {
		return (
			<Card className="border-none shadow-none bg-transparent">
				<CardHeader className="p-0">
					<CardTitle className="text-lg font-semibold flex items-center gap-2">
						<User className="w-5 h-5" />
						Author Details
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0 mt-4 space-y-3">
					<Skeleton className="h-5 w-1/2" />
					<Skeleton className="h-5 w-1/3" />
					<Skeleton className="h-5 w-1/4" />
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="border-none shadow-none bg-transparent">
			<CardHeader className="p-0">
				<CardTitle className="text-lg font-semibold flex items-center gap-2">
					<User className="w-5 h-5" />
					Author Details
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0 mt-4 space-y-3">
				<p className="text-sm text-muted-foreground flex items-center gap-2">
					<span className="font-medium text-foreground">{user.name}</span>
					<span>({user.username})</span>
				</p>
				<p className="text-sm text-muted-foreground">{user.email}</p>
				<p className="text-sm text-muted-foreground">
					{user.address.street}, {user.address.city}
				</p>
			</CardContent>
		</Card>
	);
};

UserDetails.displayName = 'UserDetails';
