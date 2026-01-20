import { account } from "@/services/appwrite";
import { ID } from "react-native-appwrite";

const authService = {
    // Register a user
    register: async (email?: string, password?: string) => {
        if (!email || !password) return { error: "Email and password are required" };
        try {
            const response = await account.create(ID.unique(), email, password);
            return response;
        } catch (error: any) {
            return { error: error.message || "Registration failed. Please try again." };
        }
    },

    // Login
    login: async (email?: string, password?: string) => {
        if (!email || !password) return { error: "Email and password are required" };
        try {
            const response = await account.createEmailPasswordSession(email, password);
            return response;
        } catch (error: any) {
            return { error: error.message || "Login failed. Please check your credentials." };
        }
    },

    // Get logged in user
    getUser: async () => {
        try {
            return await account.get();
        } catch (error: any) {
            return null
        }
    },

    // Logout user
    logout: async () => {
        try {
            return await account.deleteSession("current");
        } catch (error: any) {
            return { error: error.message || "Logout failed. Please try again." };
        }
    }
}

export default authService;
