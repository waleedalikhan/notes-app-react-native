import databaseService from "@/services/databaseService";
import { ID, Query } from "react-native-appwrite";

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  // Get Notes
  getNotes: async (userId: string) => {
    if (!userId) {
      console.error('Error: User ID is required')
      return { data: [], error: 'User ID is required' }
    };

    try {
      const response = await databaseService.getDocuments(dbId!, colId!, [Query.equal('user_id', userId)]);
      return response;
    } catch (error: any) {
      console.error('Error fetching notes', error.message)
      return { data: [], error: error.message }
    }
  },

  // Add Note
  addNote: async (user_id: string, text: string) => {
    if (!text || !text.trim()) return { error: "Note text is required" };

    const data: any = {
      text,
      createdAt: new Date().toISOString(),
      user_id,
    }

    const response = await databaseService.createDocument(dbId!, colId!, data, ID.unique());
    if (response?.error) return { error: response.error };
    return { data: response as any };
  },

  // Update Note
  updateNote: async (id: string, text: string) => {
    if (!text || !text.trim()) return { error: "Note text is required" };
    const data: any = {
      text,
    }
    const response = await databaseService.updateDocument(dbId!, colId!, id, data);
    if (response?.error) return { error: response.error };
    return { data: response as any };
  },

  // delete Note
  deleteNote: async (id: string) => {
    const response = await databaseService.removeDocument(dbId!, colId!, id);
    if (response?.error) return { error: response.error };
    return { success: true };
  }
};

export default noteService;
