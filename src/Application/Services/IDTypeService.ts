import { IDTypeResponse } from 'src/Domine/Responses';
import HttpStatusCodes from '../Utilities/HttpStatusCodes';
import { HTTPClient, IToRead } from 'src/Domine/IPatterns';
import container from 'src/inversify.config';

export class IDTypesService implements IToRead<IDTypeResponse> {
  httpClient: HTTPClient;
  urlList: string;
  urlBase: string;
  constructor() {
    const urlAPI = process.env.ID_TYPE ? process.env.ID_TYPE : '';
    this.urlBase = `${process.env.RCP}${urlAPI}`;
    this.urlList = `${this.urlBase}list/`;
    this.httpClient = container.get<HTTPClient>('HTTPClient');
  }

  async getAll(): Promise<IDTypeResponse[]> {
    const response = await this.httpClient.GET(this.urlList);
    if (!response.ok || response.status == HttpStatusCodes.NO_CONTENT)
      return [];
    const data: IDTypeResponse[] = await response.json();
    return data;
  }
  async getById(id: number): Promise<IDTypeResponse | null> {
    throw new Error('Method not implemented.');
  }
  async findByParameters(parameters: object): Promise<IDTypeResponse[]> {
    throw new Error('Method not implemented.' + { parameters });
  }
}
