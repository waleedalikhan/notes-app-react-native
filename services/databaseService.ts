import { database } from "@/services/appwrite";
import { Query } from "react-native-appwrite";

const databaseService = {
  // Get all Documents
  getDocuments: async (dbId: string, colId: string, queries: any[] = []) => {
    try {
      const response = await database.listDocuments(dbId, colId, queries);
      return { data: response.documents || [], error: null };
    } catch (error: any) {
      console.error("Error fetching documents", error.message);
      return { error: error.message };
    }
  },

  // Create new Document
  createDocument: async (dbId: string, colId: string, data: any, id: string | null = null) => {
    try {
      return await database.createDocument(dbId, colId, id || "", data);
    } catch (error: any) {
      console.error("Error creating document", error.message);
      return { error: error.message };
    }
  },

  // Update Document
  updateDocument: async (dbId: string, colId: string, id: string, data: any) => {
    try {
      return await database.updateDocument(dbId, colId, id, data);
    } catch (error: any) {
      console.error("Error updating document", error.message);
      return { error: error.message };
    }
  },

  // Remove Document
  removeDocument: async (dbId: string, colId: string, id: string | null) => {
    try {
      await database.deleteDocument(dbId, colId, id || "");
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting document", error.message);
      return { error: error.message };
    }
  }
};

export default databaseService;
