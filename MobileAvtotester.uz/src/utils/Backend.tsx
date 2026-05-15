import axios from 'axios'

export interface LoginResponse {
  message: string
  data: {
    token: string
    user: {
      id: number
      username: string
      full_name: string
      role: string
    }
  }
}

export interface TestResponse {
  message: string
  data: {
    result: any
    tests: any[]
  }
}

export interface ApiResponse<T> {
  message: string
  data: T
}

class ServerConnection {
  baseUrl: string
  auth: { token: string }

  constructor(baseUrl: string = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api') {
    this.baseUrl = baseUrl
    this.auth = { token: '' }
    this.loadToken()
  }

  private loadToken() {
    const token = localStorage.getItem('token')
    if (token) {
      this.auth.token = token
    }
  }

  checkAuth(): boolean {
    return !!this.auth.token && !!localStorage.getItem('user')
  }

  async login(username: string, password: string, forceLogin: boolean = false): Promise<LoginResponse> {
    const response = await axios.post(`${this.baseUrl}/auth/login/`, {
      username,
      password,
      force_login: forceLogin
    })

    const data: LoginResponse = response.data
    this.auth.token = data.data.token
    localStorage.setItem('token', data.data.token)
    localStorage.setItem('user', JSON.stringify(data.data.user))
    localStorage.setItem('role', data.data.user.role)

    return data
  }

  async logout(): Promise<void> {
    await axios.post(`${this.baseUrl}/auth/logout/`, {}, {
      headers: this.getHeaders()
    })

    this.auth.token = ''
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
  }

  async getProfile(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/profile/`, {
      headers: this.getHeaders()
    })
    return response.data.data
  }

  async getThemes(): Promise<any[]> {
    const response = await axios.get(`${this.baseUrl}/themes/`, {
      headers: this.getHeaders()
    })
    return response.data.data || []
  }

  async getTickets(): Promise<any[]> {
    const response = await axios.get(`${this.baseUrl}/tickets/`, {
      headers: this.getHeaders()
    })
    return response.data.data || []
  }

  async getStatistics(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/statistics/`, {
      headers: this.getHeaders()
    })
    return response.data.data
  }

  async getResults(): Promise<any[]> {
    const response = await axios.get(`${this.baseUrl}/results/`, {
      headers: this.getHeaders()
    })
    return response.data.data || []
  }

  async getHistory(): Promise<any[]> {
    const response = await axios.get(`${this.baseUrl}/history/`, {
      headers: this.getHeaders()
    })
    return response.data.data || []
  }

  async startTheme(themeId: number): Promise<TestResponse> {
    const response = await axios.post(
      `${this.baseUrl}/start_tests/start_theme/`,
      { theme_id: themeId },
      { headers: this.getHeaders() }
    )
    return response.data
  }

  async startTicket(ticketId: number): Promise<TestResponse> {
    const response = await axios.post(
      `${this.baseUrl}/start_tests/start_ticket/`,
      { ticket_id: ticketId },
      { headers: this.getHeaders() }
    )
    return response.data
  }

  async startSettest(count: number): Promise<TestResponse> {
    const response = await axios.post(
      `${this.baseUrl}/start_tests/start_settest/`,
      { count },
      { headers: this.getHeaders() }
    )
    return response.data
  }

  async startExam(count: number): Promise<TestResponse> {
    const response = await axios.post(
      `${this.baseUrl}/start_tests/start_exam/`,
      { count },
      { headers: this.getHeaders() }
    )
    return response.data
  }

  async submitAnswer(sheetId: number, variantId: number): Promise<any> {
    const response = await axios.post(
      `${this.baseUrl}/solve_tests/${sheetId}/answer/`,
      { variant_id: variantId },
      { headers: this.getHeaders() }
    )
    return response.data
  }

  async finishTest(resultId: number): Promise<any> {
    const response = await axios.post(
      `${this.baseUrl}/solve_tests/${resultId}/finish/`,
      {},
      { headers: this.getHeaders() }
    )
    return response.data
  }

  async getResultTests(resultId: number): Promise<any[]> {
    const response = await axios.get(
      `${this.baseUrl}/result/${resultId}/tests/`,
      { headers: this.getHeaders() }
    )
    return response.data.data || []
  }

  async getResultStatistics(resultId: number): Promise<any> {
    const response = await axios.get(
      `${this.baseUrl}/result/${resultId}/statistics/`,
      { headers: this.getHeaders() }
    )
    return response.data.data
  }

  private getHeaders() {
    return {
      'Authorization': this.auth.token,
      'Content-Type': 'application/json'
    }
  }
}

const server = new ServerConnection()
export default server
