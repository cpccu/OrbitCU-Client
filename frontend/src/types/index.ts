export type UserRole = 'STUDENT' | 'CLUB_ADMIN' | 'UNIVERSITY_ADMIN';
export type Department = 'CSE' | 'EEE' | 'BBA' | 'English' | 'Law' | 'Civil' | 'Pharmacy';

export interface User {
  _id: string;
  name: string;
  universityId: string;
  email: string;
  department: Department;
  role: UserRole;
  clubMemberships: string[];  // Clubs this student belongs to
  adminOfClub?: string | null; // Specific club this user manages if CLUB_ADMIN
}

export interface EventItem {
  _id: string;
  title: string;
  clubName: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Debate' | 'Academic' | 'Career';
  description: string;
  bannerUrl?: string;
  venue: string;
  eventDate: string;
  registrationDeadline: string;
  maxCapacity: number;
  registeredCount: number;
  isInterUniversity: boolean;
  createdBy: string;
}

export interface RSVPPass {
  _id: string;
  eventId: EventItem;
  studentId: string;
  studentUniversityId: string;
  ticketHash: string;
  registrationDate: string;
}

export interface ResourceItem {
  _id: string;
  title: string;
  courseCode: string;
  courseTitle: string;
  department: Department;
  semesterTerm: 'Mid-Term' | 'Final-Term' | 'Quiz' | 'Lab Manual' | 'Lecture Note';
  academicSession: string;
  fileUrl?: string; // Restricted: present only for authenticated queries
  fileFormat: 'PDF' | 'DOCX' | 'ZIP' | 'IMAGE';
  uploadedBy?: { _id: string; name: string };
  upvotes: number;
  createdAt: string;
}

export interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category: 'Accounts & Waivers' | 'Examinations & Grading' | 'Registrar & Admission' | 'Library & Labs' | 'General';
  isPinned: boolean;
  referenceUrl?: string;
}

export interface LostFoundItem {
  _id: string;
  type: 'LOST' | 'FOUND';
  title: string;
  category: 'ID Card' | 'Calculator' | 'Electronics' | 'Documents/Books' | 'Wallets/Bags' | 'Personal Accessories';
  locationFoundOrLost: string;
  dateOfIncident: string;
  description: string;
  imageUrl?: string;
  status: 'OPEN' | 'RESOLVED';
  contactNumberOrEmail: string;
  reporterId: { _id: string; name: string };
}

export interface ComplaintItem {
  _id: string;
  ticketId: string;
  title: string;
  category: 'Classroom Infrastructure' | 'Lab Equipment' | 'Sanitation & Hygiene' | 'Proctorial/Security' | 'Administrative Office';
  description: string;
  locationRoom: string;
  isAnonymous: boolean;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'ACTION_TAKEN' | 'RESOLVED';
  adminRemarks?: string;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}
