/**
 * Suvidha AI - Main Application Entry
 */

import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import { RootNavigator } from '@navigation/index';
import { colors } from '@theme/colors';

// Ignore specific warnings
LogBox.ignoreLogs([
    'ViewPropTypes will be removed',
    'ColorPropType will be removed',
]);

const App: React.FC = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <SafeAreaProvider>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={colors.neutral.background}
                        translucent={false}
                    />
                    <RootNavigator />
                </SafeAreaProvider>
            </Provider>
        </GestureHandlerRootView>
    );
};

export default App;
