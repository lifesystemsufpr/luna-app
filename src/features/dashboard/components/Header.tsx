import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../styles/theme';

interface HeaderProps {
  onSettingsPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={styles.avatarPlaceholder}>
          <MaterialCommunityIcons name="face-woman" size={24} color={LunaTheme.colors.primary} />
        </View>
        <Text style={styles.appName}>Luna</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LunaTheme.spacing.l,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: LunaTheme.radii.round,
    backgroundColor: LunaTheme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: LunaTheme.spacing.s,
    overflow: 'hidden',
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: LunaTheme.colors.primary,
  },
  iconButton: {
    padding: LunaTheme.spacing.xs,
  }
});
