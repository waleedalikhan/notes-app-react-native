import styles from "@/assets/styles/notes";
import { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  note: any;
  deleteNote?: (id: string) => void;
  editNote?: (id: string, text: string) => void;
};

const NoteItem: React.FC<Props> = ({ note, deleteNote, editNote }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedNote, setEditedNote] = useState<string>(note.text);
  const inputRef = useRef<TextInput | null>(null);

  const handleSave = () => {
    if (editedNote.trim() === "") return;
    editNote?.(note.$id, editedNote);
    setIsEditing(false);
  }

  return (
    <View style={styles.noteItem}>
      {isEditing ? (
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={editedNote}
          onChangeText={setEditedNote}
          autoFocus
          onSubmitEditing={handleSave}
          returnKeyType="done"
        />
      ) : (
        <Text style={styles.noteText}>{note.text}</Text>
      )}
      <View style={styles.noteItemActions}>
        {isEditing ? (
          <TouchableOpacity onPress={() => {
            handleSave?.();
            inputRef.current?.blur();
          }}>
            <Text style={styles.edit}>💾</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.edit}>✏️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteNote?.(note.$id)}>
          <Text style={styles.delete}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteItem;
