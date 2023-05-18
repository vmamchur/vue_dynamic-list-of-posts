import type { IUser } from "@/types/IUser";

export const saveAuthData = (user: IUser) => localStorage.setItem('user', JSON.stringify(user));
export const getAuthData = () => localStorage.getItem('user') || '{}';
export const clearAuthData = () => localStorage.removeItem('user');
export const hasAuthData = () => !!localStorage.getItem('user');
