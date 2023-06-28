import { IColumnsDataTable } from './ICommons';
import {
  EventSchedule,
  IAppointment,
  IDXMainCode,
  IDoctor,
  IHealthInsurance,
  IPathologycalHistory,
  IPatient,
  IPatientStatus,
  IPhysicalExam,
  IReasonConsult,
  IRelationCode,
  ISpeciality,
  IUser,
} from './ModelsDB';
import {
  DXMainCodeResponse,
  DoctorResponse,
  GenderResponse,
  HealthInsuranceResponse,
  IDTypeResponse,
  PathologicalHistoryResponse,
  PatientResponse,
  PatientStatusResponse,
  PaymentOptionsResponse,
  PhysicalExamResponse,
  ReasonConsultResponse,
  RelationCodeResponse,
  SpecialityResponse,
} from './Responses';
import FullCalendar from '@fullcalendar/vue3/dist/FullCalendar';

export interface InfoPatientState {
  identificationPatient: string;
  age: number;
  currentPatient: PatientResponse | null;
  iconAvatar: string;
}
export interface PreliminaryDataState {
  allPathologies: Array<PathologicalHistoryResponse>;
  items: Array<unknown>;
  reasonConsultation: string;
  descriptionConsultation: string;
  pathology: PathologicalHistoryResponse | null;
}

export interface PathologicalHistoryState {
  currentPathology: IPathologycalHistory;
  pathology: PathologicalHistoryResponse | null;
  expanded: boolean;
  allPathologies: Array<PathologicalHistoryResponse>;
}

export interface SpecialityFormState {
  currentSpeciality: ISpeciality | null;
  expanded: boolean;
  speciality: ISpeciality | null;
  allSpecialities: Array<SpecialityResponse>;
}

export interface MedicalProcedureState {
  items: Array<unknown>;
}

export interface DxMainCodeState {
  allDxMainCodes: Array<DXMainCodeResponse>;
  currentDxMainCode: IDXMainCode | null;
  expanded: boolean;
  dxMainCode: DXMainCodeResponse | null;
  error: boolean;
}

export interface RelationCodeState {
  allRelationCodes: Array<RelationCodeResponse>;
  currentRelationCode: IRelationCode | null;
  expanded: boolean;
  relationCode: RelationCodeResponse | null;
  errorDxMainCode: boolean;
  errorSpeciality: boolean;
}

export interface InsuranceState {
  allInsurance: Array<HealthInsuranceResponse>;
  currentInsurance: IHealthInsurance;
  expanded: boolean;
  insurance: HealthInsuranceResponse | null;
  error: boolean;
}

export interface PhysicalExamParameterState {
  currentPhysicalExamParameter: IPhysicalExam;
  allPhysicalMedicalParameter: Array<PhysicalExamResponse>;
  allSpecialities: Array<ISpeciality>;
  disable: boolean;
  userCanEdit: boolean;
}

export interface DataTableState {
  title: string;
  columns: Array<IColumnsDataTable>;
  data: object;
  listOptions: Array<unknown>;
  option: unknown | null;
  selected: Array<unknown>;
}

export interface PatientState {
  currentPatient: IPatient;
  allIDTypes: Array<IDTypeResponse>;
  allGenders: Array<GenderResponse>;
  allInsurance: Array<HealthInsuranceResponse>;
  identificationPatient: string;
  idType: IDTypeResponse | null;
  gender: GenderResponse | null;
  insurance: HealthInsuranceResponse | null;
  disable: boolean;
  error: boolean;
  currentInsurance: IHealthInsurance;
}

export interface UserState {
  IdType: number | null;
  identification: number | null;
  phoneNumber: number | null;
  groups: Array<number>;
  isActive: boolean;
  user: IUser;
}

export interface ScheduleState {
  lastConsult: IAppointment;
  isReadonly: boolean;
  currentAppointment: IAppointment;
  currentPatient: PatientResponse;
  currentSchedule: EventSchedule;
  currentDoctor: IDoctor | null;
  allDoctors: Array<DoctorResponse>;
  speciality: SpecialityResponse | null;
  allSpecialities: Array<SpecialityResponse>;
  identificationPatient: string;
  allowToUpdate: boolean;
  allowToDelete: boolean;
  card: boolean;
  calendar: InstanceType<typeof FullCalendar>;
}

export interface AppointmentState {
  identificationPatient: string;
  currentPatientStatus: IPatientStatus | null;
  currentHealthInsurance: HealthInsuranceResponse | null;
  reasonConsult: IReasonConsult | null;
  speciality: ISpeciality;
  currentDoctor: DoctorResponse;
  currentAppointment: IAppointment;
  currentPatient: PatientResponse;
  currentPaymentOption: PaymentOptionsResponse | null;
  allPaymentOptions: Array<PaymentOptionsResponse>;
  allReasonConsult: Array<ReasonConsultResponse>;
  allPatientStatus: Array<PatientStatusResponse>;
}

export interface ChangePasswordState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  visible: boolean;
}
