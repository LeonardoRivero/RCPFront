import { defineStore } from 'pinia';
import {
  IColumnsDataTable,
  ITableOptions,
  SelectionType,
  TableOptions,
  TableSelect,
} from 'src/models/ICommons';
import { Observer, Subject } from 'src/patterns/Observer/Observer';

interface IDataTable {
  title: string;
  columns: Array<IColumnsDataTable>;
  data: object;
  listOptions: Array<unknown>;
  option: unknown | null;
  selected: Array<unknown>;
  tableOptions: ITableOptions;
}

export const useStoreDataTable = defineStore({
  id: 'storeDataTable',
  state: () =>
    ({
      title: '',
      visible: false,
      columns: [] as Array<IColumnsDataTable>,
      data: [],
      listOptions: [],
      option: null,
      selected: [] as Array<unknown>,
      tableOptions: {
        virtualScroll: false,
        title: '',
        columns: [] as Array<IColumnsDataTable>,
        data: [] as Array<unknown>,
        enableSearch: false,
        enableSelect: false,
        selectionRow: 'none',
        select: new TableSelect(),
        textCite: '',
      } as ITableOptions,
    } as IDataTable),
});
export class DataTableService implements Subject {
  public store = useStoreDataTable();
  private observers: Observer[] = [];
  private static instance: DataTableService;

  private constructor() {
    return;
  }

  public static getInstance(): DataTableService {
    if (!DataTableService.instance) {
      DataTableService.instance = new DataTableService();
    }
    DataTableService;
    return DataTableService.instance;
  }

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }
    console.log('Subject: Attached an observer.');
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Subject: Detached an observer.');
  }

  public notify(data: object): void {
    for (const observer of this.observers) {
      observer.handleNotification(this, data);
    }
  }

  public getBuilder(): BuilderTables {
    return new BuilderTables();
  }

  public updateData(column: Array<IColumnsDataTable>, data: unknown) {
    this.store.tableOptions.columns = column;
    this.store.tableOptions.data = data;
  }

  // public selectChanged(data: object) {
  //   console.log(data);
  //   for (const observer of this.observers) {
  //     observer.update(this,data);
  //   }
  // }

  // public withSelect(optionValue: string, optionLabel: string): void {
  //   this.store.optionLabel = optionValue;
  //   this.store.optionValue = optionLabel;
  // }

  // public test(type: string) {
  //   if (type === 'simple') {
  //     this.store.isSimple = true;
  //     return;
  //   }
  //   if (type === 'withSelect') {
  //     this.store.withSelect = true;
  //     return;
  //   }
  // }
  // public setData(columns: Array<IColumnsDataTable>, data: object) {
  //   this.store.columns = columns;
  //   this.store.data = data;
  // }

  // public titleTable = computed({
  //   get: () => {
  //     return this.store.title;
  //   },
  //   set: (value) => {
  //     this.store.title = value;
  //   },
  // });
}
// const store = useStoreModal();
// export function serviceDataTable() {
//   const { title, columnsTable, dataToShow } = storeToRefs(store);

//   function setData(columns: Array<IColumnsDataTable>, data: unknown) {
//     columnsTable.value = columns;
//     dataToShow.value = data;
//   }
//   const titleTable = computed({
//     get: () => {
//       return title.value;
//     },
//     set: (value) => {
//       title.value = value;
//     },
//   });

//   return {
//     //! Properties
//     columnsTable,
//     dataToShow,
//     //! Metodos
//     setData,
//     titleTable,
//   };
// }
class BuilderTables {
  private table: TableOptions = new TableOptions();
  public store = useStoreDataTable();

  public setData(
    column: Array<IColumnsDataTable>,
    data: unknown,
    title: string
  ): void {
    this.table.columns = column;
    this.table.data = data;

    this.store.tableOptions.title = title;
    this.store.tableOptions.data = data;
    this.store.tableOptions.columns = column;
  }

  // public setSelect(optionsSelect: TableSelect): void {
  //   this.table.select = optionsSelect;
  // }

  public hasSelect(optionsSelect?: TableSelect) {
    if (optionsSelect == undefined) {
      throw Error();
    }

    this.table.enableSelect = true;
    this.table.select = optionsSelect;
  }

  public setSelectionRow(selection: SelectionType) {
    this.table.selectionRow = selection;
    this.store.tableOptions.selectionRow = selection;
  }
  public hasSearchField(arg: boolean) {
    this.table.enableSearch = arg;
    this.store.tableOptions.enableSearch = arg;
  }

  public getResult(): ITableOptions {
    return this.store.tableOptions;
  }
}
