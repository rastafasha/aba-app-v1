export const getPos = (posCode: string) => {
    return posCodes.find((pos) => pos.code === posCode)?.name;
  }

  export const posCodes = [
    { code: '02', name: 'Telehealth' },
    { code: '03', name: 'School' },
    { code: '10', name: 'Telehealth in Patient Home' },
    { code: '11', name: 'Office' },
    { code: '12', name: 'Home' },
    { code: '99', name: 'Other' },
  ];
