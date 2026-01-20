import { useAuth } from "@/contexts/AuthContext";
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const LogoutBtn: React.FC = () => {
    const { logout, user } = useAuth();


    if (!user) return null;
    return (
        <TouchableOpacity style={styles.logout} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    logout: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ff3b30',
        borderRadius: 8
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default LogoutBtn;
