import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: '#6366F1' },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: { fontWeight: 'bold' },
                tabBarActiveTintColor: '#6366F1',
                tabBarInactiveTintColor: '#94A3B8',
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    backgroundColor: '#FFFFFF',
                },
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName

                    if(route.name === 'Dashboard') {
                        iconName = focused ? 'grid' : 'grid-outline'
                    } else if (route.name === 'Histórico') {
                        iconName = focused ? 'list' : 'list-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
            })}
            >

                <Tab.Screen 
                name='Dashboard'
                component={DashboardScreen}
                options={{ title: 'Visão Geral' }}
                />
                <Tab.Screen 
                name='Histórico'
                component={HistoryScreen}
                options={{ title: 'Minhas Transações' }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}