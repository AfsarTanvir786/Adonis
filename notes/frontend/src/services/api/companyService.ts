import type { Company, User } from '@/types/type';
import { api } from './api';

type CompanyDetails = {
  success: boolean;
  message: any;
  data?: Company & { users: User[] };
};

export const companyService = {
  async getCompanyDetails(companyId: number): Promise<CompanyDetails> {
    try {
      const response = await api.get(`/companies/${companyId}`);
      return response.data;
    } catch (error: any) {
      console.error('Get company error:', error.response?.data);
      throw error;
    }
  },
};
