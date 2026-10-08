const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function seed() {
  console.log('--- Starting CampusOS Real Database Seed ---');

  // 1. Register Users
  const usersToSeed = [
    {
      name: 'Tanvir Ahmed',
      universityId: '2021-1-60-001',
      email: 'student@city.edu',
      password: 'password123',
      department: 'CSE',
      role: 'STUDENT',
    },
    {
      name: 'CU Computer Club Admin',
      universityId: '2020-2-50-012',
      email: 'club@city.edu',
      password: 'password123',
      department: 'BBA',
      role: 'CLUB_ADMIN',
    },
    {
      name: 'System Administrator',
      universityId: 'ADMIN-001',
      email: 'admin@city.edu',
      password: 'admin123',
      department: 'CSE',
      role: 'UNIVERSITY_ADMIN',
    },
  ];

  const tokens = {};

  for (const user of usersToSeed) {
    try {
      console.log(`Registering/Logging in: ${user.email} (${user.role})...`);
      // Try login first in case already exists
      try {
        const loginRes = await axios.post(`${API_BASE}/auth/login`, {
          email: user.email,
          password: user.password,
        });
        tokens[user.role] = loginRes.data?.data?.token || loginRes.data?.token;
        console.log(`  -> Logged in existing user: ${user.email}`);
      } catch (err) {
        // Register if not found
        const regRes = await axios.post(`${API_BASE}/auth/register`, user);
        tokens[user.role] = regRes.data?.data?.token || regRes.data?.token;
        console.log(`  -> Registered new user: ${user.email}`);
      }
    } catch (e) {
      console.error(`  Error for user ${user.email}:`, e.response?.data || e.message);
    }
  }

  const studentHeaders = { Authorization: `Bearer ${tokens.STUDENT}` };
  const clubHeaders = { Authorization: `Bearer ${tokens.CLUB_ADMIN || tokens.UNIVERSITY_ADMIN}` };
  const adminHeaders = { Authorization: `Bearer ${tokens.UNIVERSITY_ADMIN}` };

  // 2. Seed Events (using CLUB_ADMIN or UNIVERSITY_ADMIN)
  console.log('\nSeeding Events...');
  const eventsToSeed = [
    {
      title: 'CU Intra-University Programming Contest 2026',
      clubName: 'CU Computer Club',
      category: 'Technical',
      description: 'Annual flagship competitive programming contest open to all undergraduate batches.',
      bannerUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      venue: 'Lab 4 & 5, Academic Building 2',
      eventDate: new Date(Date.now() + 86400000 * 10).toISOString(),
      registrationDeadline: new Date(Date.now() + 86400000 * 7).toISOString(),
      maxCapacity: 120,
      isInterUniversity: false,
    },
    {
      title: 'Inter-University Parliamentary Debate Championship 2026',
      clubName: 'CU Debating Club',
      category: 'Debate',
      description: '32 premier varsity teams debating on geopolitics, technology ethics, and economics.',
      bannerUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
      venue: 'Auditorium 1 & Seminar Halls',
      eventDate: new Date(Date.now() + 86400000 * 14).toISOString(),
      registrationDeadline: new Date(Date.now() + 86400000 * 11).toISOString(),
      maxCapacity: 80,
      isInterUniversity: true,
    },
    {
      title: 'City University Spring Cultural Evening & Band Night',
      clubName: 'City Cultural Club',
      category: 'Cultural',
      description: 'Featuring student folk orchestra and celebrated guest headline performance.',
      bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      venue: 'Main Campus Grounds',
      eventDate: new Date(Date.now() + 86400000 * 20).toISOString(),
      registrationDeadline: new Date(Date.now() + 86400000 * 18).toISOString(),
      maxCapacity: 450,
      isInterUniversity: false,
    },
  ];

  const createdEvents = [];
  for (const evt of eventsToSeed) {
    try {
      const res = await axios.post(`${API_BASE}/events`, evt, { headers: clubHeaders });
      const created = res.data?.data || res.data;
      createdEvents.push(created);
      console.log(`  -> Event created: ${created.title}`);
    } catch (e) {
      console.error(`  Error creating event ${evt.title}:`, e.response?.data || e.message);
    }
  }

  // 3. Student RSVP to the first event
  if (createdEvents.length > 0 && tokens.STUDENT) {
    console.log('\nCreating student RSVP Pass...');
    try {
      const rsvpRes = await axios.post(
        `${API_BASE}/events/${createdEvents[0]._id}/rsvp`,
        {},
        { headers: studentHeaders }
      );
      console.log(`  -> RSVP Successful! Ticket hash:`, rsvpRes.data?.data?.ticketHash || rsvpRes.data?.ticketHash);
    } catch (e) {
      console.log(`  -> RSVP notice:`, e.response?.data?.message || e.message);
    }
  }

  // 4. Seed Academic Resources
  console.log('\nSeeding Academic Resources...');
  const resourcesToSeed = [
    {
      title: 'CSE-221 Algorithms Mid-Term Question Paper (Fall 2024)',
      courseCode: 'CSE-221',
      courseTitle: 'Algorithms & Complexity Analysis',
      department: 'CSE',
      semesterTerm: 'Mid-Term',
      academicSession: 'Fall 2024',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileFormat: 'PDF',
    },
    {
      title: 'CSE-311 Database Systems SQL Queries & ER Diagram Solution Guide',
      courseCode: 'CSE-311',
      courseTitle: 'Database Management Systems',
      department: 'CSE',
      semesterTerm: 'Final-Term',
      academicSession: 'Spring 2024',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileFormat: 'PDF',
    },
    {
      title: 'EEE-212 AC Circuits Phasor Diagram and Resonance Lab Manual',
      courseCode: 'EEE-212',
      courseTitle: 'Electrical Circuits II',
      department: 'EEE',
      semesterTerm: 'Lab Manual',
      academicSession: 'Fall 2024',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileFormat: 'DOCX',
    },
    {
      title: 'BBA-104 Principles of Accounting Ledger and Journal Handnotes',
      courseCode: 'BBA-104',
      courseTitle: 'Principles of Accounting',
      department: 'BBA',
      semesterTerm: 'Lecture Note',
      academicSession: 'Fall 2024',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileFormat: 'PDF',
    },
  ];

  for (const res of resourcesToSeed) {
    try {
      const resp = await axios.post(`${API_BASE}/resources`, res, { headers: studentHeaders });
      console.log(`  -> Resource deposited: ${res.title}`);
    } catch (e) {
      console.error(`  Error uploading resource ${res.title}:`, e.response?.data || e.message);
    }
  }

  // 5. Seed Helpdesk FAQs (using UNIVERSITY_ADMIN)
  console.log('\nSeeding Helpdesk FAQs...');
  const faqsToSeed = [
    {
      question: 'What is the policy and GPA cutoff for tuition waiver renewal?',
      answer: 'Students must maintain a minimum SGPA of 3.80 with at least 15 completed credit hours per semester. Application forms must be submitted to Room 102 within the first 14 working days of the semester.',
      category: 'Accounts & Waivers',
      isPinned: true,
      referenceUrl: 'https://city.edu/waivers',
    },
    {
      question: 'When are Mid-Term Examination Admit Cards issued to students?',
      answer: 'Admit cards are accessible digitally exactly 5 days prior to exams, provided at least 60% term fees have been cleared with the Accounts Office. Students must carry physical printed admit cards into examination rooms.',
      category: 'Examinations & Grading',
      isPinned: true,
      referenceUrl: 'https://city.edu/exams',
    },
    {
      question: 'What is the UGC grading scale conversion used across all departments?',
      answer: '80% and above is A+ (4.00), 75-79% is A (3.75), 70-74% is A- (3.50), 65-69% is B+ (3.25), 60-64% is B (3.00), 55-59% is B- (2.75), 50-54% is C+ (2.50), 45-49% is C (2.25), 40-44% is D (2.00), and below 40% is F (0.00).',
      category: 'Examinations & Grading',
      isPinned: false,
    },
    {
      question: 'How do I apply for an official transcript or English Medium of Instruction certificate?',
      answer: 'Submit an application through the Registrar portal or at the administrative counter. Standard processing takes 7 working days upon accounts and library clearance.',
      category: 'Registrar & Admission',
      isPinned: false,
    },
  ];

  for (const faq of faqsToSeed) {
    try {
      await axios.post(`${API_BASE}/helpdesk`, faq, { headers: adminHeaders });
      console.log(`  -> FAQ added: ${faq.question.slice(0, 45)}...`);
    } catch (e) {
      console.error(`  Error creating FAQ:`, e.response?.data || e.message);
    }
  }

  // 6. Seed Lost & Found Items
  console.log('\nSeeding Lost & Found...');
  const lostFoundToSeed = [
    {
      type: 'LOST',
      title: 'Casio FX-991EX ClassWiz Calculator',
      category: 'Calculator',
      locationFoundOrLost: 'Room 402, Academic Building 1',
      dateOfIncident: new Date(Date.now() - 86400000 * 2).toISOString(),
      description: 'Left on desk in 4th row during exam. Has a small cat sticker on back.',
      imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80',
      contactNumberOrEmail: '+8801700112233',
    },
    {
      type: 'FOUND',
      title: 'City University Student ID Card (2021-1-60-045)',
      category: 'ID Card',
      locationFoundOrLost: 'Ground Floor Cafeteria counter near water cooler',
      dateOfIncident: new Date(Date.now() - 86400000).toISOString(),
      description: 'Found near cafeteria register. Belong to CSE Department student.',
      imageUrl: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=600&q=80',
      contactNumberOrEmail: 'student@city.edu',
    },
  ];

  for (const item of lostFoundToSeed) {
    try {
      await axios.post(`${API_BASE}/lost-found`, item, { headers: studentHeaders });
      console.log(`  -> Item logged: [${item.type}] ${item.title}`);
    } catch (e) {
      console.error(`  Error logging lost item:`, e.response?.data || e.message);
    }
  }

  // 7. Seed Complaints
  console.log('\nSeeding Grievance Complaints...');
  const complaintsToSeed = [
    {
      title: 'Projector bulb flickering in CSE Lab 402',
      category: 'Lab Equipment',
      description: 'The ceiling projector intermittently blacks out every 3 minutes, disrupting lab sessions.',
      locationRoom: 'Lab 402, Academic Building 2',
      isAnonymous: false,
    },
    {
      title: 'Broken flush handle in 3rd Floor Canteen Washroom',
      category: 'Sanitation & Hygiene',
      description: 'Flush valve handle broken, causing water wastage and sanitation concerns.',
      locationRoom: '3rd Floor South Wing Restroom',
      isAnonymous: true,
    },
  ];

  for (const comp of complaintsToSeed) {
    try {
      const compRes = await axios.post(`${API_BASE}/complaints`, comp, { headers: studentHeaders });
      const created = compRes.data?.data || compRes.data;
      console.log(`  -> Grievance lodged: Ticket ID: ${created.ticketId} - ${created.title}`);

      // If we have admin, set one to ACTION_TAKEN
      if (created.ticketId && tokens.UNIVERSITY_ADMIN) {
        try {
          await axios.patch(
            `${API_BASE}/complaints/${created._id}/status`,
            {
              status: 'ACTION_TAKEN',
              adminRemarks: 'Work order dispatched to campus engineering. Parts replacement in progress.',
            },
            { headers: adminHeaders }
          );
          console.log(`     (Advanced status of ${created.ticketId} to ACTION_TAKEN)`);
        } catch {
          // ignore status advance if endpoint signature differs
        }
      }
    } catch (e) {
      console.error(`  Error logging complaint:`, e.response?.data || e.message);
    }
  }

  console.log('\n=== REAL DATABASE SEED COMPLETED SUCCESSFULLY ===');
}

seed();
