import { View, StyleSheet } from 'react-native';
import { Droplets, Waves } from 'lucide-react-native';

interface WaterLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'white' | 'minimal';
}

export default function WaterLogo({ size = 'medium', variant = 'primary' }: WaterLogoProps) {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { container: 40, droplet: 24, waves: 16 };
      case 'large':
        return { container: 80, droplet: 48, waves: 32 };
      default:
        return { container: 60, droplet: 36, waves: 24 };
    }
  };

  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          background: 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.3)',
          droplet: '#FFFFFF',
          waves: 'rgba(255, 255, 255, 0.6)'
        };
      case 'minimal':
        return {
          background: 'transparent',
          border: 'transparent',
          droplet: '#0EA5E9',
          waves: 'rgba(14, 165, 233, 0.6)'
        };
      default:
        return {
          background: 'rgba(14, 165, 233, 0.1)',
          border: 'rgba(14, 165, 233, 0.2)',
          droplet: '#0EA5E9',
          waves: 'rgba(14, 165, 233, 0.6)'
        };
    }
  };

  const sizes = getSize();
  const colors = getColors();

  return (
    <View style={[
      styles.container,
      {
        width: sizes.container,
        height: sizes.container,
        borderRadius: sizes.container / 2,
        backgroundColor: colors.background,
        borderWidth: variant === 'minimal' ? 0 : 2,
        borderColor: colors.border,
      }
    ]}>
      <View style={styles.dropletContainer}>
        <Droplets 
          size={sizes.droplet} 
          color={colors.droplet} 
          strokeWidth={1.5} 
        />
      </View>
      <View style={[
        styles.wavesContainer,
        { bottom: -sizes.waves / 4 }
      ]}>
        <Waves 
          size={sizes.waves} 
          color={colors.waves} 
          strokeWidth={1} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dropletContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wavesContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});