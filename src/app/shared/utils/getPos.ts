export const getPos = (posCode: string) => {
    switch (posCode) {
      case '02':
        return 'Telehealth';
      case '03':
        return 'School';
      case '11':
        return 'Office';
      case '12':
        return 'Home';
      case '99':
        return 'Other';
      default:
        return 'Unknown';
    }
  }

  export const posCodes = [
    { code: '02', name: 'Telehealth' },
    { code: '03', name: 'School' },
    { code: '11', name: 'Office' },
    { code: '12', name: 'Home' },
    { code: '99', name: 'Other' },
  ];
