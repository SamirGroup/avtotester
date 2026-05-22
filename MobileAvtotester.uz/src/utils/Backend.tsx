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

  // ========================================================================
  // SUPERADMIN APIs
  // ========================================================================
  async superadminDashboard(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/superadmin/dashboard/`, {
      headers: this.getHeaders()
    })
    return response.data.data
  }

  async getOrganizations(status?: string): Promise<any[]> {
    const url = status
      ? `${this.baseUrl}/superadmin/organization/?status=${status}`
      : `${this.baseUrl}/superadmin/organization/`
    const response = await axios.get(url, { headers: this.getHeaders() })
    return response.data.data || []
  }

  async createOrganization(data: any): Promise<any> {
    const response = await axios.post(
      `${this.baseUrl}/superadmin/organization/`,
      data,
      { headers: this.getHeaders() }
    )
    return response.data.data
  }

  async getOrganizationDetail(orgId: number): Promise<any> {
    const response = await axios.get(
      `${this.baseUrl}/superadmin/organization/${orgId}/`,
      { headers: this.getHeaders() }
    )
    return response.data.data
  }

  async updateOrganization(orgId: number, data: any): Promise<any> {
    const response = await axios.put(
      `${this.baseUrl}/superadmin/organization/${orgId}/`,
      data,
      { headers: this.getHeaders() }
    )
    return response.data.data
  }

  async deleteOrganization(orgId: number): Promise<any> {
    const response = await axios.delete(
      `${this.baseUrl}/superadmin/organization/${orgId}/`,
      { headers: this.getHeaders() }
    )
    return response.data
  }

  async getOrganizationStatistics(orgId: number): Promise<any> {
    const response = await axios.get(
      `${this.baseUrl}/superadmin/organization/${orgId}/statistics/`,
      { headers: this.getHeaders() }
    )
    return response.data.data
  }

  async getOrganizationStudents(orgId: number): Promise<any[]> {
    const response = await axios.get(
      `${this.baseUrl}/superadmin/organization/${orgId}/students/`,
      { headers: this.getHeaders() }
    )
    return response.data.data || []
  }

  async getOrganizationPayments(orgId: number): Promise<any[]> {
    const response = await axios.get(
      `${this.baseUrl}/superadmin/organization/${orgId}/payments/`,
      { headers: this.getHeaders() }
    )
    return response.data.data || []
  }

  async getContracts(): Promise<any[]> {
    const response = await axios.get(
      `${this.baseUrl}/superadmin/contract/`,
      { headers: this.getHeaders() }
    )
    return response.data.data || []
  }

  async createContract(data: any): Promise<any> {
    const response = await axios.post(
      `${this.baseUrl}/superadmin/contract/`,
      data,
      { headers: this.getHeaders() }
    )
    return response.data.data
  }

  async getTenantPayments(year?: number, month?: string): Promise<any[]> {
    let url = `${this.baseUrl}/superadmin/tenant_payments/?`
    if (year) url += `year=${year}&`
    if (month) url += `month=${month}&`
    const response = await axios.get(url, { headers: this.getHeaders() })
    return response.data.data || []
  }

  async generateMonthlyReport(year: number, month: number): Promise<any> {
    const response = await axios.post(
      `${this.baseUrl}/superadmin/generate_monthly_report/`,
      { year, month },
      { headers: this.getHeaders() }
    )
    return response.data.data
  }

  // ========================================================================
  // PAYMENTS
  // ========================================================================
  async createPayment(data: any): Promise<any> {
    const response = await axios.post(
      `${this.baseUrl}/payments/create/`,
      data,
      { headers: this.getHeaders() }
    )
    return response.data
  }

  async getUserPayments(): Promise<any[]> {
    const response = await axios.get(
      `${this.baseUrl}/payments/history/`,
      { headers: this.getHeaders() }
    )
    return response.data.data || []
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
