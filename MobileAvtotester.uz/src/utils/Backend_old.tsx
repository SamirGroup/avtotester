const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api';

export interface User {
  id: number;
  username: string;
  full_name: string;
  role: 'STUDENT' | 'ADMIN';
  ruxsat: boolean;
  photo_url: string | null;
  is_active: boolean;
  days_remaining: number;
  is_subscription_expired: boolean;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface LoginResponse {
  token: string;
  user: User;
}

class ServerConnection {
  baseUrl: string;
  auth: { token: string | null };
  user: User | null;

  constructor() {
    this.baseUrl = BACKEND_URL;
    this.auth = { token: null };
    this.user = null;

    // Tokenni localStorage dan olish
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.auth.token = savedToken;
    }
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    headers: Record<string, string> = {}
  ): Promise<T> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include',
    };

    if (this.auth.token) {
      (options.headers as any)['Authorization'] = this.auth.token;
    }

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${this.baseUrl}${url}`, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.detail || 'Xatolik yuz berdi');
    }

    return json;
  }

  // Auth
  checkAuth(): boolean {
    return !!this.auth.token;
  }

  async login(
    username: string,
    password: string,
    forceLogin: boolean = false
  ): Promise<LoginResponse> {
    const response = await this.request<{ message: string; data: LoginResponse }>(
      'POST',
      '/auth/login/',
      {
        username,
        password,
        force_login: forceLogin,
        device_info: navigator.userAgent,
      }
    );

    this.auth.token = response.data.token;
    this.user = response.data.user;
    localStorage.setItem('token', response.data.token);

    return response.data;
  }

  async logout(): Promise<void> {
    await this.request('POST', '/auth/logout/');
    this.auth.token = null;
    this.user = null;
    localStorage.removeItem('token');
  }

  // Profile
  async getProfile(): Promise<User> {
    const response = await this.request<ApiResponse<User>>('/profile/');
    this.user = response.data;
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await this.request<ApiResponse<User>>('/profile/', data, 'PUT');
    this.user = response.data;
    return response.data;
  }

  // Themes
  async getThemes(): Promise<any[]> {
    const response = await this.request<ApiResponse<any[]>>('/themes/');
    return response.data;
  }

  // Tickets
  async getTickets(): Promise<any[]> {
    const response = await this.request<ApiResponse<any[]>>('/tickets/');
    return response.data;
  }

  // Statistics
  async getStatistics(): Promise<any> {
    const response = await this.request<ApiResponse<any>>('/statistics/');
    return response.data;
  }

  // Results
  async getResults(limit: number = 20): Promise<any[]> {
    const response = await this.request<ApiResponse<any[]>>(`/results/?limit=${limit}`);
    return response.data;
  }

  // History
  async getHistory(limit: number = 100): Promise<any[]> {
    const response = await this.request<ApiResponse<any[]>>(`/history/?limit=${limit}`);
    return response.data;
  }

  // Start Tests
  async startTheme(themeId: number): Promise<any> {
    const response = await this.request<ApiResponse<any>>('/start_tests/start_theme/', { theme_id: themeId });
    return response.data;
  }

  async startTicket(ticketId: number): Promise<any> {
    const response = await this.request<ApiResponse<any>>('/start_tests/start_ticket/', { ticket_id: ticketId });
    return response.data;
  }

  async startSettest(count: number): Promise<any> {
    const response = await this.request<ApiResponse<any>>('/start_tests/start_settest/', { count });
    return response.data;
  }

  async startExam(count: number = 20): Promise<any> {
    const response = await this.request<ApiResponse<any>>('/start_tests/start_exam/', { count });
    return response.data;
  }

  // Solve Tests
  async answer(sheetId: number, variantId: number): Promise<any> {
    const response = await this.request<ApiResponse<any>>(
      `/solve_tests/${sheetId}/answer/`,
      { variant_id: variantId }
    );
    return response.data;
  }

  async finish(resultId: number): Promise<any> {
    const response = await this.request<ApiResponse<any>>(
      `/solve_tests/${resultId}/finish/`,
      {}
    );
    return response.data;
  }
}

export const server = new ServerConnection();
export default server;
