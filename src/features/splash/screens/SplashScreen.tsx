import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LunaTheme } from '../../dashboard/styles/theme';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* CENTRAL CONTENT */}
      <View style={styles.centerContent}>
        
        {/* LOGO IMAGE */}
        <Image 
          source={require('../../../../assets/images/icon.png')} 
          style={styles.logoImage} 
          resizeMode="contain"
        />

        <Text style={styles.title}>Luna</Text>
        <Text style={styles.subtitle}>Conheça seu ciclo, cuide de você.</Text>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.divider} />
        <Text style={styles.footerText}>SAÚDE FEMININA</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBFD', // Rosa ultra claro da paleta
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoImage: {
    width: 140,
    height: 140,
    marginBottom: LunaTheme.spacing.l,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: LunaTheme.colors.primary,
    marginBottom: LunaTheme.spacing.s,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  divider: {
    width: 32,
    height: 2,
    backgroundColor: LunaTheme.colors.primary,
    marginBottom: LunaTheme.spacing.m,
  },
  footerText: {
    fontSize: 10,
    color: '#BDBDBD',
    letterSpacing: 2,
    fontWeight: '600',
  }
});
