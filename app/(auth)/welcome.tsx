import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Droplets, Shield, Zap, Star, Waves, Clock, Recycle } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const features = [
    {
      icon: <Droplets size={24} color="#0EA5E9" />,
      title: 'Pure Quality',
      description: 'Certified water suppliers with guaranteed purity'
    },
    {
      icon: <Zap size={24} color="#0EA5E9" />,
      title: 'Lightning Fast',
      description: '10-minute express delivery with live tracking'
    },
    {
      icon: <Shield size={24} color="#0EA5E9" />,
      title: 'Trusted Network',
      description: 'Verified suppliers with transparent reviews'
    },
    {
      icon: <Recycle size={24} color="#0EA5E9" />,
      title: 'Eco Rewards',
      description: 'Earn points for returning empty containers'
    }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0EA5E9', '#2563EB']}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <View style={styles.waterDropContainer}>
            <View style={styles.waterDrop}>
              <Droplets size={50} color="#FFFFFF" strokeWidth={1.5} />
            </View>
            <View style={styles.waterWaves}>
              <Waves size={30} color="rgba(255, 255, 255, 0.6)" strokeWidth={1} />
            </View>
          </View>
        </View>
        <Text style={styles.title}>Welcome to AquaLink</Text>
        <Text style={styles.subtitle}>Your trusted water delivery partner</Text>
        
        {/* Water-themed decorative elements */}
        <View style={styles.decorativeElements}>
          <View style={[styles.bubble, styles.bubble1]} />
          <View style={[styles.bubble, styles.bubble2]} />
          <View style={[styles.bubble, styles.bubble3]} />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                {feature.icon}
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Trust indicators */}
        <View style={styles.trustIndicators}>
          <View style={styles.trustItem}>
            <Clock size={16} color="#059669" />
            <Text style={styles.trustText}>10-min delivery</Text>
          </View>
          <View style={styles.trustItem}>
            <Shield size={16} color="#059669" />
            <Text style={styles.trustText}>Quality assured</Text>
          </View>
          <View style={styles.trustItem}>
            <Star size={16} color="#F59E0B" />
            <Text style={styles.trustText}>4.8★ rated</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/(auth)/signup')}
          >
            <LinearGradient
              colors={['#0EA5E9', '#2563EB']}
              style={styles.primaryButtonGradient}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.secondaryButtonText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  waterDropContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterDrop: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  waterWaves: {
    position: 'absolute',
    bottom: -15,
    opacity: 0.7,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
  },
  bubble1: {
    width: 20,
    height: 20,
    top: 80,
    right: 30,
  },
  bubble2: {
    width: 12,
    height: 12,
    top: 120,
    left: 40,
  },
  bubble3: {
    width: 16,
    height: 16,
    bottom: 60,
    right: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  featuresContainer: {
    flex: 1,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  trustIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 4,
  },
  buttonContainer: {
    paddingBottom: 32,
  },
  primaryButton: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonGradient: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#0EA5E9',
    fontSize: 16,
    fontWeight: '500',
  },
});