import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../services/api'

export default function TestScreen({ route }: any) {
  const navigation = useNavigation()
  const { resultId, tests } = route.params || {}
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const [answers, setAnswers] = useState<{questionId: number, variantId: number}[]>([])
  const [loading, setLoading] = useState(false)

  const currentTest = tests ? tests[currentQuestion] : null

  const handleAnswer = (variantId: number) => {
    setSelectedVariant(variantId)
  }

  const handleNext = async () => {
    if (!selectedVariant || !currentTest) return

    setLoading(true)
    try {
      const response = await api.submitAnswer(resultId, selectedVariant)
      
      setAnswers([...answers, { questionId: currentTest.id, variantId: selectedVariant }])
      
      if (currentQuestion < (tests?.length || 0) - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedVariant(null)
      } else {
        await api.finishTest(resultId)
        Alert.alert(
          'Test tugadi',
          'Natijangizni ko\'ring',
          [{ text: 'OK', onPress: () => navigation.navigate('Result' as never, { resultId }) }]
        )
      }
    } catch (error) {
      Alert.alert('Xatolik', 'Javobni yuborishda xatolik')
    } finally {
      setLoading(false)
    }
  }

  if (!currentTest) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Yuklanmoqda...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Savol {currentQuestion + 1} / {tests?.length || 0}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestion + 1) / (tests?.length || 1)) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentTest.value}</Text>
        {currentTest.image && (
          <Image source={{ uri: currentTest.image }} style={styles.questionImage} />
        )}
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentTest.variants?.map((variant: any) => (
          <TouchableOpacity
            key={variant.id}
            style={[
              styles.optionButton,
              selectedVariant === variant.id && styles.optionSelected
            ]}
            onPress={() => handleAnswer(variant.id)}
          >
            <Text 
              style={[
                styles.optionText,
                selectedVariant === variant.id && styles.optionTextSelected
              ]}
            >
              {variant.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          (!selectedVariant || loading) && styles.nextButtonDisabled
        ]}
        onPress={handleNext}
        disabled={!selectedVariant || loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.nextButtonText}>
            {currentQuestion < (tests?.length || 0) - 1 ? 'Keyingi' : 'Tugatish'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 4,
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  questionText: {
    fontSize: 18,
    color: '#1F2937',
    lineHeight: 26,
  },
  questionImage: {
    width: '100%',
    height: 200,
    marginTop: 16,
    borderRadius: 8,
  },
  optionsContainer: {
    paddingHorizontal: 16,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  optionSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
  },
  optionTextSelected: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  nextButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
