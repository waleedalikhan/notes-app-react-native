import styles from "@/assets/styles/notes";
import NoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import { useAuth } from "@/contexts/AuthContext";
import noteService from "@/services/noteService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";

const NoteScreen: React.FC = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [notes, setNotes] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes(user?.$id as string);
    if (response.error) {
      setError((response as any).error);
      Alert.alert("Error", (response as any).error);
    } else {
      setNotes(response.data as any[]);
    }
    setLoading(false);
  };

  const addNote = async () => {
    if (newNote.trim() === "") return;
    const response = await noteService.addNote(user?.$id as string, newNote);
    if (response.error) Alert.alert("Error", response.error);
    else setNotes([...notes, response.data as any]);
    setNewNote("");
    setModalVisible(false);
  };

  const editNote = async (id: string, newText: string) => {
    if (newText.trim() === "") return Alert.alert("Error", "Note text is required");
    const response = await noteService.updateNote(id, newText);
    if (response.error) Alert.alert("Error", response.error);
    else setNotes((prevNotes: any[]) => prevNotes.map((note) => note.$id === id ? response.data as any : note));
  };

  const deleteNote = async (id: string) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          const response = await noteService.deleteNote(id);
          if (response.error) Alert.alert("Error", response.error);
          else setNotes(notes.filter((note) => note.$id !== id));
        }
      }
    ])
  };

  useEffect(() => {
    if (!authLoading && !user) router.replace("/auth");
    else if (!authLoading && user) fetchNotes();
  }, [user, authLoading]);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size='large' color='#007bff' /> : (
        <>
          {error ? <Text style={styles.errorText}>{error}</Text> : <NoteList notes={notes} deleteNote={deleteNote} editNote={editNote} />}
        </>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
      {/* Modal */}
      <NoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
};

export default NoteScreen;
