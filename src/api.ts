interface ITask {
  id: string;
  name: string;
  color: string;
  members: string[];
  labels: string[];
  description: string;
}

const getHeaders = (): string[] => ['BackLog', 'ToDo', 'Doing', 'Done'];
const getTasks = (): ITask[][] => [
  [
    {
      id: 'mykanban1',
      name: 'lulw',
      color: 'yellow',
      members: ['admin'],
      labels: [''],
      description: '',
    },
  ],
  [],
  [],
  [],
];
export type { ITask };
export { getHeaders, getTasks };
