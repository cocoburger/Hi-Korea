import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useOAuth } from "@/hooks/useOAuth";
import { SocialLoginButtons } from "@/components/SocialLoginButtons";

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { handleGoogleLogin, handleAppleLogin } = useOAuth();

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 15000,
            useNativeDriver: true,
          }),
        ])
    ).start();
  }, []);

  const handleLogin = async () => {
    try {
      const success = await login(email, password);
      if (success) {
        router.replace('/(tabs)');
      } else {
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  const spin = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
      <LinearGradient
          colors={['#52BEB5', '#73B2D9', '#FFE5E5']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
        <Animated.View
            style={[
              styles.backgroundPattern,
              {
                transform: [{ rotate: spin }],
              },
            ]}
        />
        <ThemedView style={styles.formContainer}>
          <ThemedText style={styles.title}>Hi Korea</ThemedText>
          <ThemedText style={styles.subtitle}>Your Special Trip to Korea</ThemedText>
          <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
          />

          <TextInput
              style={styles.input}
              placeholder="password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
          />

          {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <ThemedText style={styles.buttonText}>로그인</ThemedText>
          </TouchableOpacity>
          <SocialLoginButtons
              onGoogleLogin={handleGoogleLogin}
              onAppleLogin={handleAppleLogin}
          />
        </ThemedView>
      </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backgroundPattern: {
    position: 'absolute',
    width: width * 2,
    height: width * 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: width,
    top: -width,
    left: -width / 2,
  },
  formContainer: {
    // 비색과 옥색을 활용한 그라데이션 효과
    backgroundColor: 'rgba(116, 192, 177, 0.25)',
    borderRadius: 20,
    padding: 30,
    margin: 20,
    // 글래스모피즘 효과를 위한 backdrop-filter 스타일
    backdropFilter: 'blur(8px)',
    // 입체감을 위한 테두리 추가
    borderWidth: 1,
    borderColor: 'rgba(140, 212, 212, 0.3)',
    // 그림자 효과 수정
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    // 내부 컨테이너에 추가적인 반투명 효과
    overflow: 'hidden',
  },
  innerContainer: {
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    // 적자색 유지
    color: '#C1718A',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    // 청벽색 유지
    color: '#748EBC',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    // 천청색을 활용한 테두리
    borderColor: 'rgba(115, 178, 217, 0.5)',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#D94C9E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#F1F1F1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#CE4537',
    marginBottom: 10,
    textAlign: 'center',
  },
});