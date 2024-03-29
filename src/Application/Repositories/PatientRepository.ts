import { IPatientStatus, IReasonConsult } from 'src/Domine/ModelsDB';
import { IGender, IIDType, IPatient } from 'src/Domine/ModelsDB';
import HttpStatusCodes from 'src/Application/Utilities/HttpStatusCodes';
import {
  GET,
  POST,
  PUT,
  handleResponse,
} from 'src/Infraestructure/Utilities/Request';
import { IRepository } from './Interface';
import {
  GenderResponse,
  IDTypeResponse,
  PatientResponse,
  PatientStatusResponse,
  ReasonConsultResponse,
} from 'src/Domine/Responses';
import { EndPoints } from '../Utilities/EndPoints';
const endpoint = EndPoints.getInstance();
export class PatientRepository
  implements IRepository<IPatient, PatientResponse>
{
  getById(id: number): Promise<PatientResponse | null> {
    throw new Error('Method not implemented.' + { id });
  }

  getAll(): Promise<PatientResponse[] | null> {
    throw new Error('Method not implemented.');
  }

  async create(entity: IPatient): Promise<PatientResponse | null> {
    const url = EndPoints.buildFullUrl(process.env.PATIENT);
    try {
      const response = await POST(url, entity);
      if (!response.ok) return null;
      handleResponse(response);
      const data: PatientResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }

  async update(entity: Partial<IPatient>): Promise<PatientResponse | null> {
    if (entity.id == null) {
      return null;
    }
    try {
      const url = endpoint.updatePatient(entity.id);
      const response = await PUT(url, entity);
      if (!response.ok) return null;
      // handleResponse(response, messages.updateSuccesfully);
      const data: PatientResponse = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name}:${error}`);
    }
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }

  public async findByParameters(
    parameters: object
  ): Promise<Array<PatientResponse>> {
    const urlBase = EndPoints.buildFullUrl(process.env.PATIENT);
    const url = endpoint.urlQueryParameter(urlBase, parameters);
    const response = await GET(url);
    if (response.status == HttpStatusCodes.NO_CONTENT) {
      return [];
    }
    const data: PatientResponse[] = [await response.json()];
    // const data = (await response.parsedBody) as Array<PatientResponse>;
    return data;
  }
}

export class IDTypesRepository implements IRepository<IIDType, IDTypeResponse> {
  getById(id: number): Promise<IDTypeResponse | null> {
    throw new Error('Method not implemented.' + { id });
  }
  async getAll(): Promise<IDTypeResponse[] | null> {
    const url = EndPoints.buildFullUrl(process.env.ID_TYPE);
    try {
      const response = await GET(url);
      if (!response.ok || response.status == HttpStatusCodes.BAD_REQUEST)
        return null;
      const data: IDTypeResponse[] = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  create(entity: IIDType): Promise<IDTypeResponse | null> {
    throw new Error('Method not implemented.' + { entity });
  }
  update(entity: Partial<IIDType>): Promise<IDTypeResponse | null> {
    throw new Error('Method not implemented.' + { entity });
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }
  findByParameters(parameters: object): Promise<IDTypeResponse[]> {
    throw new Error('Method not implemented.' + { parameters });
  }
}

export class GenderRepository implements IRepository<IGender, GenderResponse> {
  getById(id: number): Promise<GenderResponse | null> {
    throw new Error('Method not implemented.' + { id });
  }
  async getAll(): Promise<GenderResponse[] | null> {
    const url = EndPoints.buildFullUrl(process.env.GENDER);
    try {
      const response = await GET(url);
      if (!response.ok || response.status == HttpStatusCodes.BAD_REQUEST)
        return null;
      const data: GenderResponse[] = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  create(entity: IGender): Promise<GenderResponse | null> {
    throw new Error('Method not implemented.' + { entity });
  }
  update(entity: Partial<IGender>): Promise<GenderResponse | null> {
    throw new Error('Method not implemented.' + { entity });
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }
  findByParameters(parameters: object): Promise<GenderResponse[]> {
    throw new Error('Method not implemented.' + { parameters });
  }
}

export class PatientStatusRepository
  implements IRepository<IPatientStatus, PatientStatusResponse>
{
  getById(id: number): Promise<PatientStatusResponse | null> {
    throw new Error('Method not implemented.' + { id });
  }
  async getAll(): Promise<PatientStatusResponse[] | null> {
    const url = EndPoints.buildFullUrl(process.env.PATIENT_STATUS);
    try {
      const response = await GET(url);
      if (!response.ok || response.status == HttpStatusCodes.BAD_REQUEST)
        return null;
      const data: PatientStatusResponse[] = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  create(entity: IPatientStatus): Promise<PatientStatusResponse | null> {
    throw new Error('Method not implemented.' + { entity });
  }
  update(
    entity: Partial<IPatientStatus>
  ): Promise<PatientStatusResponse | null> {
    throw new Error('Method not implemented.' + { entity });
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }
  findByParameters(parameters: object): Promise<PatientStatusResponse[]> {
    throw new Error('Method not implemented.' + { parameters });
  }
}

export class ReasonConsultRepository
  implements IRepository<IReasonConsult, ReasonConsultResponse>
{
  getById(id: number): Promise<ReasonConsultResponse | null> {
    throw new Error('Method not implemented.' + { id });
  }
  async getAll(): Promise<ReasonConsultResponse[] | null> {
    const url = EndPoints.buildFullUrl(process.env.REASON_CONSULT);
    try {
      const response = await GET(url);
      if (!response.ok || response.status == HttpStatusCodes.BAD_REQUEST)
        return null;
      const data: ReasonConsultResponse[] = await response.json();
      return data;
    } catch (error) {
      throw Error(`Error in ${Object.name} : ${error}`);
    }
  }
  create(entity: IReasonConsult): Promise<ReasonConsultResponse | null> {
    throw new Error('Method not implemented.' + { entity });
  }
  update(
    entity: Partial<IReasonConsult>
  ): Promise<ReasonConsultResponse | null> {
    throw new Error('Method not implemented.' + { entity });
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + { id });
  }
  findByParameters(parameters: object): Promise<ReasonConsultResponse[]> {
    throw new Error('Method not implemented.' + { parameters });
  }
}
