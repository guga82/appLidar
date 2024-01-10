import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

export default function TabRoutesLayout () {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ size, color}) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil"}}
            />
        </Tabs>
    )
}