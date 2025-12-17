import Company from '#models/company'

export default class CompanyRepository {
  async createCompany(data: Partial<Company>) {
    const company = await Company.create(data)

    return {
      success: true,
      message: 'Company created successfully',
      data: company,
    }
  }

  async getByName(companyName: string) {
    const company = await Company.findBy('name', companyName)
    if (!company) {
      return {
        success: false,
        message: 'Company not found.',
      }
    }

    return {
      success: true,
      message: 'Company retrieved.',
      data: company,
    }
  }

  async getCompany(id: number) {
    const company = await Company.query().where('id', id).preload('users').first()

    if (!company) {
      return {
        success: false,
        message: 'Company not found.',
      }
    }

    return {
      success: true,
      message: 'Company retrieved.',
      data: company,
    }
  }

  async updateCompany(data: Partial<Company>, id: number) {
    const company = await Company.find(id)

    if (!company) {
      return {
        success: false,
        message: 'Company not found.',
      }
    }

    company.merge({
      name: data.name ?? company.name,
    })

    await company.save()

    return {
      success: true,
      message: 'Company updated successfully.',
      data: company,
    }
  }

  async getCompanyList() {
    const list = await Company.all()

    return {
      success: true,
      data: list,
    }
  }

  async deleteCompany(id: number) {
    const company = await Company.find(id)

    if (!company) {
      return {
        success: false,
        message: 'Company not found.',
      }
    }

    await company.delete()

    return {
      success: true,
      message: 'Company deleted successfully.',
    }
  }
}
