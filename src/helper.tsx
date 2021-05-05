const simpleHash = (name: string): number => {
  switch (name) {
    case 'BackLog':
      return 0;
      break;
    case 'ToDo':
      return 1;
      break;
    case 'Doing':
      return 2;
      break;
    case 'Done':
      return 3;
      break;
    default:
      return 0;
      break;
  }
};

export default simpleHash;
