import NoteItem from "@/components/NoteItem";
import { FlatList, Text, View } from "react-native";
import styles from "@/assets/styles/notes";

type Props = {
  notes?: any[];
  deleteNote?: (id: string) => void;
  editNote?: (id: string, text: string) => void;
};

const NoteList: React.FC<Props> = ({ notes, deleteNote, editNote }) => {
  return (
    <>
      {notes && notes.length > 0 ? (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <NoteItem note={item as any} deleteNote={deleteNote} editNote={editNote} />}
        />
      ) : (
        <View>
          <Text style={styles.emptyText}>You have no notes</Text>
        </View>
      )}
    </>
  );
};

export default NoteList;
