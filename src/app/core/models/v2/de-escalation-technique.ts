export class DeEscalationTechnique {
  index?: number;
  description: string;
  constructor(data: Partial<DeEscalationTechnique>) {
    Object.assign(this, data);
  }
  static getDefault(): DeEscalationTechnique {
    return {
      description: '',
    };
  }
  static getDefaults(): DeEscalationTechnique[] {
    return [
      {
        description:
          'Be aware and identify the precursors of maladaptive behaviors that might escalate to crisis',
      },
      {
        description: 'Never appear aggressive.',
      },
      {
        description: 'Focus on returning the situation to a calm state',
      },
      {
        description: 'Focus on the essence of the current crisis/behavior.',
      },
      {
        description:
          'Be aware and identify the precursors of maladaptive behaviors that might escalate to crisis',
      },
      {
        description:
          'Do NOT use threats and do NOT belittle or make behavior seem unimportant.',
      },
      {
        description: 'Instruct others to leave the area',
      },
      {
        description: 'Provide space and refrain from touching the individual',
      },
      {
        description: 'Use simple language and give short, clear directions',
      },
      {
        description:
          'Project calm through your movements- keep them slow and predictable.',
      },
      {
        description:
          'Remove distracting/dangerous elements (any object which can be dangerous if thrown or mishandled)',
      },
      {
        description: 'Go to a less stressful place',
      },
      {
        description:
          'Redirect to a calming object or activity (go to park, give calming toy, play calming music, play a game)',
      },
    ];
  }
}
