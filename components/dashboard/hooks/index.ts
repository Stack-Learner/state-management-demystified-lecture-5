import useSWR from 'swr';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

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
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
	};
};

const fetcher = (url: string) =>
	fetch(`${BASE_URL}${url}`).then((res) => res.json());

export const usePosts = () => useSWR<Post[]>('/posts', fetcher);

export const usePost = (id: number | null) =>
	useSWR<Post>(id ? `/posts/${id}` : null, fetcher);

export const useUsers = () => useSWR<User[]>('/users', fetcher);

export const useUser = (id: number | null) =>
	useSWR<User>(id ? `/users/${id}` : null, fetcher);
