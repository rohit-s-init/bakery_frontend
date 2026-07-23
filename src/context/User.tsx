// contexts/LoaderContext.tsx
import { getMe } from '@/api/user';
import User, { UserContentType } from '@/types/user.interface';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLoader } from './UniversalContext';


const UserContext = createContext<UserContentType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
    // const { setIsLoaderVisible } = useLoader();

    useEffect(() => {
        (async () => {
            const fetchedUser = await getMe();
            if (!fetchedUser.success) {
                console.error(fetchedUser.message);
            }
            else {
                setUser(fetchedUser.user);
            }
            setIsUserLoading(false);
            // setIsLoaderVisible(false);
        })();
    }, [])

    async function reloadUser() {
        (async () => {
            const fetchedUser = await getMe();
            if (!fetchedUser.success) {
                console.error(fetchedUser.message);
                setUser(undefined);
            }
            else {
                setUser(fetchedUser.user);
            }
            setIsUserLoading(false);
            // setIsLoaderVisible(false);
        })();
    }

    return (
        <UserContext.Provider value={{
            user, setUser, isUserLoading, reloadUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
}

// Alternative: You can keep your original useLoader but make it use the context
// export function useLoader() {
//   const context = useContext(LoaderContext);
//   if (context === undefined) {
//     throw new Error('useLoader must be used within a LoaderProvider');
//   }
//   return {
//     isLoaderVisible: context.isLoaderVisible,
//     setIsLoaderVisible: context.setIsLoaderVisible
//   };
// }