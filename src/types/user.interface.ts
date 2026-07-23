export default interface User{
    id: number;
    email: string;
    name: string;
    password: string;
    verified: boolean;
}

export interface UserContentType {
    user: User | undefined;
    setUser: (user: User | undefined) => void;
    isUserLoading: boolean;
    reloadUser: () => Promise<void>;
}