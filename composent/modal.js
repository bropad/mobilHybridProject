import React from 'react';
import { View, Text, Button } from 'react-native';

const modal = ({ props }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Bienvenu dans l'app de la drogue</Text>
        <Button
            onPress={() => navigation.navigate('DrawerToggle')}
            title="Go to details"
        />
    </View>
);

export default modal;