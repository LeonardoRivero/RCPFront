import { routerInstance } from 'src/boot/globalRouter';
import {
  IDoctor,
  IDXMainCode,
  IPhysicalExam,
  IRelationCode,
  ISpeciality,
  IHealthInsurance,
  IPathologycalHistory,
} from 'src/Domine/ModelsDB';
import { Messages } from 'src/Application/Utilities/Messages';
import { EndPoints } from 'src/Application/Utilities/EndPoints';
import HttpStatusCodes from 'src/Application/Utilities/HttpStatusCodes';
import {
  GET,
  POST,
  PUT,
  handleResponse,
} from 'src/Infraestructure/Utilities/Request';
import { IRepository } from './Interface';
import {
  DXMainCodeResponse,
  DoctorResponse,
  HealthInsuranceResponse,
  PathologicalHistoryResponse,
  PhysicalExamResponse,
  RelationCodeResponse,
  SpecialityResponse,
} from 'src/Domine/Responses';
const endpoint = EndPoints.getInstance();
const messages = Messages.getInstance();

export class PhysicalExamParameterRepository
  implements IRepository<IPhysicalExam, PhysicalExamResponse>
{
  private static instance: PhysicalExamParameterRepository;
  private constructor() {
    return;
  }
  public static getInstance(): PhysicalExamParameterRepository {
    if (!PhysicalExamParameterRepository.instance) {
      PhysicalExamParameterRepository.instance =
        new PhysicalExamParameterRepository();
    }
    return PhysicalExamParameterRepository.instance;
  }
  getById(id: number): Promise<PhysicalExamResponse | null> {
    throw new Error('Method not implemented.' + { id });
  }
  getAll(): Promise<PhysicalExamResponse[] | null> {
    throw new Error('Method not implemented.');
  }
  async create(entity: IPhysicalExam): Promise<PhysicalExamResponse | null> {
    const url = EndPoints.buildFullUrl(process.env.PHYSICAL_EXAM_PARAMETER);
    try {
      const response = await POST(url, entity);
      if (!response.ok) return null;
      handleResponse(response);
      const data: PhysicalExamResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  async update(
    entity: Partial<IPhysicalExam>
  ): Promise<PhysicalExamResponse | null> {
    if (entity.id == null) {
      return null;
    }
    try {
      const url = endpoint.updateOrGetPhysicalExamParameterById(entity.id);
      const response = await PUT(url, entity);
      if (!response.ok) return null;
      handleResponse(response);
      const data: PhysicalExamResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name}:${error}`);
    }
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }
  async findByParameters(parameters: object): Promise<PhysicalExamResponse[]> {
    const urlBase = EndPoints.buildFullUrl(process.env.PHYSICAL_EXAM_PARAMETER);
    const url = endpoint.urlQueryParameter(urlBase, parameters);
    const response = await GET(url);
    if (response.status == HttpStatusCodes.NO_CONTENT) {
      return [];
    }
    const data: PhysicalExamResponse[] = await response.json();
    return data;
  }
}
export class SpecialityRepository
  implements IRepository<ISpeciality, SpecialityResponse>
{
  private static instance: SpecialityRepository;
  private constructor() {
    return;
  }
  findByParameters(parameters: object): Promise<SpecialityResponse[]> {
    throw new Error('Method not implemented.' + { parameters });
  }

  public static getInstance(): SpecialityRepository {
    if (!SpecialityRepository.instance) {
      SpecialityRepository.instance = new SpecialityRepository();
    }
    return SpecialityRepository.instance;
  }

  public async getAll(): Promise<SpecialityResponse[] | null> {
    try {
      const url = EndPoints.buildFullUrl(process.env.SPECIALITY);
      const response = await GET(url);
      if (response.status == HttpStatusCodes.NOT_FOUND) {
        routerInstance.push('/:catchAll');
      }
      if (response.status == HttpStatusCodes.UNAUTHORIZED) {
        return <Array<SpecialityResponse>>[];
      }
      const data: SpecialityResponse[] = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }

  public async create(entity: ISpeciality): Promise<SpecialityResponse | null> {
    const url = EndPoints.buildFullUrl(process.env.SPECIALITY);
    try {
      const response = await POST(url, entity);
      if (!response.ok) return null;
      handleResponse(response);
      const data: SpecialityResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }

  async update(
    entity: Partial<ISpeciality>
  ): Promise<SpecialityResponse | null> {
    if (entity.id == null) {
      return null;
    }
    try {
      const url = endpoint.updateSpeciality(entity.id);
      const response = await PUT(url, entity);
      if (!response.ok) return null;
      handleResponse(response);
      const data: SpecialityResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name}:${error}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }

  async getById(id: number): Promise<SpecialityResponse | null> {
    try {
      // const response = await fetch(`https://randomuser.me/api?id=${id}`);
      // if (!response.ok) throw new Error(response.statusText);

      // const json = await response.json();
      // const data = json as {
      //   results: DataStoreResponseConcrete1[];
      // };
      // const user = Parsers.randomUser(data);

      return null;
    } catch (e) {
      throw Error(`Error in UserRepository calling get with id ${id}: ${e}`);
    }
  }
}

export class InsuranceRepository
  implements IRepository<IHealthInsurance, HealthInsuranceResponse>
{
  private static instance: InsuranceRepository;
  private constructor() {
    return;
  }
  findByParameters(parameters: object): Promise<HealthInsuranceResponse[]> {
    throw new Error('Method not implemented.' + { parameters });
  }
  public static getInstance(): InsuranceRepository {
    if (!InsuranceRepository.instance) {
      InsuranceRepository.instance = new InsuranceRepository();
    }
    return InsuranceRepository.instance;
  }
  async getById(id: number): Promise<HealthInsuranceResponse | null> {
    throw new Error('Method not implemented.' + { id });
  }
  async getAll(): Promise<HealthInsuranceResponse[] | null> {
    const url = EndPoints.buildFullUrl(process.env.INSURANCE);
    try {
      const response = await GET(url);
      if (response.status == HttpStatusCodes.NOT_FOUND) {
        routerInstance.push('/:catchAll');
      }
      const data: HealthInsuranceResponse[] = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  async create(
    entity: IHealthInsurance
  ): Promise<HealthInsuranceResponse | null> {
    try {
      const url = EndPoints.buildFullUrl(process.env.INSURANCE);
      const response = await POST(url, entity);
      if (!response.ok) return null;
      handleResponse(response);
      if (response.status === HttpStatusCodes.BAD_REQUEST) {
        return null;
      }
      const data: HealthInsuranceResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  async update(
    entity: Partial<IHealthInsurance>
  ): Promise<HealthInsuranceResponse | null> {
    if (entity.id == null) {
      return null;
    }
    try {
      const url = endpoint.updateInsurance(entity.id);
      const response = await PUT(url, entity);
      handleResponse(response, messages.updateSuccesfully);
      if (!response.ok) return null;
      if (response.status === HttpStatusCodes.BAD_REQUEST) {
        return null;
      }
      const data: HealthInsuranceResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name}:${error}`);
    }
  }
  async delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }
}

export class DxMainCodeRepository
  implements IRepository<IDXMainCode, DXMainCodeResponse>
{
  private static instance: DxMainCodeRepository;
  private constructor() {
    return;
  }
  public static getInstance(): DxMainCodeRepository {
    if (!DxMainCodeRepository.instance) {
      DxMainCodeRepository.instance = new DxMainCodeRepository();
    }
    return DxMainCodeRepository.instance;
  }
  async findByParameters(
    queryParameters: object
  ): Promise<DXMainCodeResponse[]> {
    const urlBase = EndPoints.buildFullUrl(process.env.DX_MAIN_CODE);
    const url = endpoint.urlQueryParameter(urlBase, queryParameters);
    const response = await GET(url);
    const data: DXMainCodeResponse[] = await response.json();
    return data;
  }
  getById(id: number): Promise<DXMainCodeResponse | null> {
    throw new Error('Method not implemented.' + { id });
  }
  async getAll(): Promise<DXMainCodeResponse[] | null> {
    const url = EndPoints.buildFullUrl(process.env.DX_MAIN_CODE);
    try {
      const response = await GET(url);
      if (response.status == HttpStatusCodes.NOT_FOUND) {
        routerInstance.push('/:catchAll');
        return null;
      }
      const data: DXMainCodeResponse[] = await response.json();
      handleResponse(response);
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  async create(entity: IDXMainCode): Promise<DXMainCodeResponse | null> {
    const url = EndPoints.buildFullUrl(process.env.DX_MAIN_CODE);
    try {
      const response = await POST(url, entity);
      handleResponse(response);
      if (!response.ok || response.status === HttpStatusCodes.BAD_REQUEST) {
        return null;
      }
      const data: DXMainCodeResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  async update(
    entity: Partial<IDXMainCode>
  ): Promise<DXMainCodeResponse | null> {
    if (entity.id == null) {
      return null;
    }
    try {
      const url = endpoint.updateDxMainCode(entity.id);
      const response = await PUT(url, entity);
      handleResponse(response, messages.updateSuccesfully);
      if (!response.ok || response.status === HttpStatusCodes.BAD_REQUEST) {
        return null;
      }
      const data: DXMainCodeResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name}:${error}`);
    }
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }
}

export class RelationCodeRepository
  implements IRepository<IRelationCode, RelationCodeResponse>
{
  private static instance: RelationCodeRepository;
  private constructor() {
    return;
  }
  public static getInstance(): RelationCodeRepository {
    if (!RelationCodeRepository.instance) {
      RelationCodeRepository.instance = new RelationCodeRepository();
    }
    return RelationCodeRepository.instance;
  }
  async getById(id: number): Promise<RelationCodeResponse | null> {
    throw new Error('Method not implemented.' + { id });
  }
  async getAll(): Promise<RelationCodeResponse[] | null> {
    try {
      const url = EndPoints.buildFullUrl(process.env.RELATION_CODE);
      const response = await GET(url);
      if (response.status == HttpStatusCodes.NOT_FOUND) {
        routerInstance.push('/:catchAll');
      }

      if (response.status == HttpStatusCodes.NO_CONTENT) {
        return [];
      }
      const data: RelationCodeResponse[] = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  async create(entity: IRelationCode): Promise<RelationCodeResponse | null> {
    const url = EndPoints.buildFullUrl(process.env.RELATION_CODE);
    try {
      const response = await POST(url, entity);
      handleResponse(response);
      if (!response.ok || response.status == HttpStatusCodes.BAD_REQUEST)
        return null;
      const data: RelationCodeResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  async update(
    entity: Partial<IRelationCode>
  ): Promise<RelationCodeResponse | null> {
    if (entity.id == null) {
      return null;
    }
    try {
      const url = endpoint.updateRelationCode(entity.id);
      const response = await PUT(url, entity);
      if (!response.ok || response.status === HttpStatusCodes.BAD_REQUEST) {
        return null;
      }
      handleResponse(response, messages.updateSuccesfully);
      const data: RelationCodeResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name}:${error}`);
    }
  }
  async delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }
  public async findByParameters(
    parameters: object
  ): Promise<RelationCodeResponse[]> {
    const urlBase = EndPoints.buildFullUrl(process.env.RELATION_CODE);
    const url = endpoint.urlQueryParameter(urlBase, parameters);
    const response = await GET(url);
    const data: RelationCodeResponse[] = await response.json();
    return data;
  }
}

export class DoctorRepository implements IRepository<IDoctor, DoctorResponse> {
  private static instance: DoctorRepository;
  private constructor() {
    return;
  }
  public static getInstance(): DoctorRepository {
    if (!DoctorRepository.instance) {
      DoctorRepository.instance = new DoctorRepository();
    }
    return DoctorRepository.instance;
  }

  public async getById(id: number): Promise<DoctorResponse | null> {
    const url = endpoint.updateOrGetDoctorById(id);
    try {
      const response = await GET(url);
      if (!response.ok) return null;
      if (response.status == HttpStatusCodes.NOT_FOUND) return null;
      if (response.status == HttpStatusCodes.BAD_REQUEST) return null;

      const data: DoctorResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }

  async getAll(): Promise<DoctorResponse[] | null> {
    try {
      const url = EndPoints.buildFullUrl(process.env.DOCTOR);
      const response = await GET(url);
      if (response.status == HttpStatusCodes.NOT_FOUND) {
        routerInstance.push('/:catchAll');
      }
      const data: DoctorResponse[] = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }

  create(entity: IDoctor): Promise<DoctorResponse | null> {
    throw new Error('Method not implemented.' + { entity });
  }

  update(entity: Partial<IDoctor>): Promise<DoctorResponse | null> {
    throw new Error('Method not implemented.' + { entity });
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }
  public async findByParameters(parameters: object): Promise<DoctorResponse[]> {
    try {
      const urlBase = EndPoints.buildFullUrl(process.env.DOCTOR);
      const url = endpoint.urlQueryParameter(urlBase, parameters);
      const response = await GET(url);
      if (response.status == HttpStatusCodes.NOT_FOUND) {
        routerInstance.push('/:catchAll');
      }
      if (response.status == HttpStatusCodes.INTERNAL_SERVER_ERROR) {
        return [];
      }
      const data: DoctorResponse[] = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
}

export class PathologicalHistoryRepository
  implements IRepository<IPathologycalHistory, PathologicalHistoryResponse>
{
  getById(id: number): Promise<IPathologycalHistory | null> {
    throw new Error('Method not implemented.' + { id });
  }
  public async getAll(): Promise<PathologicalHistoryResponse[] | null> {
    try {
      const url = EndPoints.buildFullUrl(process.env.PATHOLOGY_HISTORY);
      const response = await GET(url);
      if (response.status == HttpStatusCodes.NOT_FOUND) {
        routerInstance.push('/:catchAll');
      }
      const data: PathologicalHistoryResponse[] = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  async create(
    entity: IPathologycalHistory
  ): Promise<PathologicalHistoryResponse | null> {
    const url = EndPoints.buildFullUrl(process.env.PATHOLOGY_HISTORY);
    try {
      const response = await POST(url, entity);
      handleResponse(response);
      if (!response.ok || response.status === HttpStatusCodes.BAD_REQUEST) {
        return null;
      }
      const data: PathologicalHistoryResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  async update(
    entity: Partial<PathologicalHistoryResponse>
  ): Promise<IPathologycalHistory | null> {
    if (entity.id == null) {
      return null;
    }
    try {
      const url = endpoint.updateOrGetPathologyById(entity.id);
      const response = await PUT(url, entity);
      if (!response.ok || response.status === HttpStatusCodes.BAD_REQUEST) {
        return null;
      }
      handleResponse(response, messages.updateSuccesfully);
      const data: PathologicalHistoryResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name}:${error}`);
    }
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }
  findByParameters(parameters: object): Promise<IPathologycalHistory[]> {
    throw new Error('Method not implemented.' + { parameters });
  }
}
