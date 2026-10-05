export interface TimelineEvent {
  id: string;
  year: string;
  period: string;
  milestoneType: 'ACADEMIC' | 'EXPERIENCE' | 'HACKATHON' | 'CAPSTONE' | 'VISION';
  title: string;
  subtitle: string;
  institutionOrContext: string;
  description: string;
  skillsAcquired: string[];
  keyDeliverables: string[];
  icon: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PROJECTED';
  telemetryCode: string;
}
