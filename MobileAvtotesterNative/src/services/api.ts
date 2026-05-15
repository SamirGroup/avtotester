import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_BASE_URL = 'https://api.avtotester.uz/api'

class ApiService {
  private api: AxiosInstance
  private token: string = ''

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.api.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = this.token
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await this.clearAuth()
        }
        return Promise.reject(error)
      }
    )

    this.loadToken()
  }

  private async loadToken() {
    try {
      const token = await AsyncStorage.getItem('@auth_token')
      if (token) {
        this.token = token
      }
    } catch (error) {
      console.error('Load token error:', error)
    }
  }

  setToken(token: string) {
    this.token = token
  }

  async clearAuth() {
    this.token = ''
    await AsyncStorage.removeItem('@auth_token')
    await AsyncStorage.removeItem('@user_data')
  }

  // Auth
  async login(username: string, password: string): Promise<AxiosResponse> {
    return this.api.post('/auth/login/', { username, password })
  }

  async logout(): Promise<AxiosResponse> {
    return this.api.post('/auth/logout/')
  }

  async getProfile(): Promise<AxiosResponse> {
    return this.api.get('/profile/')
  }

  // Themes & Tickets
  async getThemes(): Promise<AxiosResponse> {
    return this.api.get('/themes/')
  }

  async getTickets(): Promise<AxiosResponse> {
    return this.api.get('/tickets/')
  }

  // Tests
  async startTheme(themeId: number): Promise<AxiosResponse> {
    return this.api.post('/start_tests/start_theme/', { theme_id: themeId })
  }

  async startTicket(ticketId: number): Promise<AxiosResponse> {
    return this.api.post('/start_tests/start_ticket/', { ticket_id: ticketId })
  }

  async startSettest(count: number): Promise<AxiosResponse> {
    return this.api.post('/start_tests/start_settest/', { count })
  }

  async startExam(count: number): Promise<AxiosResponse> {
    return this.api.post('/start_tests/start_exam/', { count })
  }

  // Test solving
  async submitAnswer(sheetId: number, variantId: number): Promise<AxiosResponse> {
    return this.api.post(`/solve_tests/${sheetId}/answer/`, { variant_id: variantId })
  }

  async finishTest(resultId: number): Promise<AxiosResponse> {
    return this.api.post(`/solve_tests/${resultId}/finish/`)
  }

  async getResultTests(resultId: number): Promise<AxiosResponse> {
    return this.api.get(`/result/${resultId}/tests/`)
  }

  // Statistics
  async getStatistics(): Promise<AxiosResponse> {
    return this.api.get('/statistics/')
  }

  async getHistory(): Promise<AxiosResponse> {
    return this.api.get('/results/')
  }

  // Payment
  async createPayment(amount: number, method: string): Promise<AxiosResponse> {
    return this.api.post('/payment/create/', {
      amount,
      payment_method: method,
      subscription_days: 30,
      return_url: 'avtotester://payment/success',
    })
  }

  async verifyPayment(transactionId: string, paymentId: number): Promise<AxiosResponse> {
    return this.api.post('/payment/verify/', { transaction_id: transactionId, payment_id: paymentId })
  }

  async getUserPayments(): Promise<AxiosResponse> {
    return this.api.get('/payment/user/')
  }
}

const api = new ApiService()
export default api
