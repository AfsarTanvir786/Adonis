import { inject } from '@adonisjs/core'
import Company from '#models/company'
import CompanyRepository from './company_query.js'

@inject()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async createCompany(data: Partial<Company>) {
    return this.companyRepository.createCompany(data)
  }

  async getByName(companyName: string) {
    return await this.companyRepository.getByName(companyName);
  }

  async getCompany(id: number) {
    return this.companyRepository.getCompany(id)
  }

  async updateCompany(Company: Partial<Company>, companyId: number) {
    return this.companyRepository.updateCompany(Company, companyId)
  }

  async getCompanyList() {
    return this.companyRepository.getCompanyList()
  }

  async deleteCompany(id: number) {

    return this.companyRepository.deleteCompany(id)
  }
}
