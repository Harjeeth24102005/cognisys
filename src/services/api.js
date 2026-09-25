import { CORE_SERVICES, getServiceBySlug } from '../data/servicesData';
import { BLOG_POSTS, getBlogPostBySlug } from '../data/blogData';
import { COMPLETED_PROJECTS } from '../data/projectsData';
import { smtpService } from './smtpService';
export const api = {
  // Authentication (Disabled for pure static website)
  async register(data) {
    return {
      access_token: 'static_session_token',
      user: {
        id: 1,
        full_name: data.full_name || 'Client',
        email: data.email || 'client@cognisys.ai',
        role: 'client'
      }
    };
  },

  async login(data) {
    return {
      access_token: 'static_session_token',
      user: {
        id: 1,
        full_name: data.email ? data.email.split('@')[0] : 'Client',
        email: data.email,
        role: 'client'
      }
    };
  },

  async getMe() {
    return {
      id: 1,
      full_name: 'Client',
      email: 'contact.cognisys@gmail.com',
      role: 'client'
    };
  },

  async getGoogleAuthStatus() {
    return { configured: false };
  },

  getGoogleLoginUrl() {
    return '#';
  },

  async verifySignupOtp(email, otp) {
    return { message: 'Verified' };
  },

  async resendSignupOtp(email) {
    return { message: 'Sent' };
  },

  // Services (Static First)
  async getServices() {
    return CORE_SERVICES;
  },

  async getServiceBySlug(slug) {
    const found = getServiceBySlug(slug);
    if (found) return found;
    return CORE_SERVICES[0];
  },

  // Orders & Specifications (Dispatches via SMTP directly from frontend!)
  async createOrder(data) {
    const result = await smtpService.sendOrderSpecifications(data);
    return result.order;
  },

  async getOrders() {
    try {
      return JSON.parse(localStorage.getItem('cognisys_orders') || '[]');
    } catch {
      return [];
    }
  },

  async getOrderById(id) {
    const orders = await this.getOrders();
    return orders.find(o => String(o.id) === String(id) || String(o.order_number) === String(id)) || null;
  },

  async updateOrderStatus(id, statusData) {
    const orders = await this.getOrders();
    const updated = orders.map(o => (String(o.id) === String(id) ? { ...o, ...statusData } : o));
    localStorage.setItem('cognisys_orders', JSON.stringify(updated));
    return { success: true };
  },

  async deleteOrder(id) {
    const orders = await this.getOrders();
    const updated = orders.filter(o => String(o.id) !== String(id));
    localStorage.setItem('cognisys_orders', JSON.stringify(updated));
    return { success: true };
  },

  // Quotations
  async getQuotations() {
    try {
      return JSON.parse(localStorage.getItem('cognisys_quotations') || '[]');
    } catch {
      return [];
    }
  },

  async createQuotation(data) {
    const quotes = await this.getQuotations();
    const newQuote = {
      id: Date.now(),
      quotation_number: `QUO-${Date.now().toString(36).toUpperCase()}`,
      status: 'PENDING',
      created_at: new Date().toISOString(),
      ...data
    };
    quotes.unshift(newQuote);
    localStorage.setItem('cognisys_quotations', JSON.stringify(quotes));
    return newQuote;
  },

  async respondToQuotation(quotationId, action) {
    const quotes = await this.getQuotations();
    const updated = quotes.map(q => String(q.id) === String(quotationId) ? { ...q, status: action.toUpperCase() } : q);
    localStorage.setItem('cognisys_quotations', JSON.stringify(updated));
    return { success: true };
  },

  // Payments
  async makePayment(data) {
    const payment = {
      id: Date.now(),
      status: 'VERIFIED',
      created_at: new Date().toISOString(),
      ...data
    };
    const payments = JSON.parse(localStorage.getItem('cognisys_payments') || '[]');
    payments.unshift(payment);
    localStorage.setItem('cognisys_payments', JSON.stringify(payments));
    return payment;
  },

  async getPayments() {
    return JSON.parse(localStorage.getItem('cognisys_payments') || '[]');
  },

  // Projects
  async getPublicProjects() {
    return COMPLETED_PROJECTS;
  },

  async getPublicProjectDetail(id) {
    return COMPLETED_PROJECTS.find(p => String(p.id) === String(id)) || COMPLETED_PROJECTS[0];
  },

  async getMyProjects() {
    return COMPLETED_PROJECTS;
  },

  async updateProject(id, data) {
    return { id, ...data };
  },

  async addProjectFile(projectId, fileData) {
    return { success: true, ...fileData };
  },

  // Messages
  async getMessages() {
    return JSON.parse(localStorage.getItem('cognisys_messages') || '[]');
  },

  async sendMessage(data) {
    const messages = await this.getMessages();
    const newMsg = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...data
    };
    messages.push(newMsg);
    localStorage.setItem('cognisys_messages', JSON.stringify(messages));
    return newMsg;
  },

  // Notifications
  async getNotifications() {
    return [
      {
        id: 1,
        title: 'Cognisys Architecture Online',
        message: 'Static frontend engine initialized with client-side SMTP dispatch enabled.',
        created_at: new Date().toISOString(),
        is_read: false
      }
    ];
  },

  async markNotificationRead() {
    return { success: true };
  },

  async markAllNotificationsRead() {
    return { success: true };
  },

  // Blog
  async getBlogPosts(category = 'all') {
    if (!category || category === 'all') {
      return BLOG_POSTS;
    }
    return BLOG_POSTS.filter(b => b.category.toLowerCase() === category.toLowerCase());
  },

  async getBlogPostBySlug(slug) {
    const found = getBlogPostBySlug(slug);
    if (found) return found;
    return BLOG_POSTS[0];
  },

  async createBlogPost(data) {
    const newPost = {
      id: Date.now(),
      slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      published_at: new Date().toISOString(),
      ...data
    };
    BLOG_POSTS.unshift(newPost);
    return newPost;
  },

  async deleteBlogPost(id) {
    return { success: true };
  },

  // Admin stats
  async getAdminStats() {
    const orders = await this.getOrders();
    return {
      total_orders: orders.length,
      total_services: CORE_SERVICES.length,
      total_projects: COMPLETED_PROJECTS.length,
      total_blog_posts: BLOG_POSTS.length
    };
  },

  async getAdminUsers() {
    return [];
  },

  async getAuthLogs() {
    return [];
  },

  async updateUserRole() {
    return { success: true };
  }
};
