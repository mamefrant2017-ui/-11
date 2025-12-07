import { Notice, Event, FacultyMember, ClassInfo } from './types';
import { 
  GraduationCap, Users, Calendar, BookOpen, 
  Trophy, Activity, Phone, Mail, MapPin 
} from 'lucide-react';

export const SCHOOL_NAME = "Excellence Academy";
export const CONTACT_INFO = {
  phone: "+1 (555) 123-4567",
  email: "admissions@excellence-academy.edu",
  address: "123 Education Lane, Knowledge City, ST 90210"
};

export const NOTICES: Notice[] = [
  { id: 1, title: "Mid-Term Examination Schedule", date: "2023-10-15", category: "Academic", content: "The mid-term exams will commence from November 1st. Please check the student portal for the full timetable." },
  { id: 2, title: "Annual Sports Day Registration", date: "2023-10-12", category: "Event", content: "Registration for track and field events is now open. Contact the PE department." },
  { id: 3, title: "Winter Uniform Policy", date: "2023-10-10", category: "Administrative", content: "Students are required to wear the full winter uniform starting November 15th." },
];

export const EVENTS: Event[] = [
  { id: 1, title: "Science Fair 2023", date: "Nov 05, 2023", time: "09:00 AM", location: "Main Auditorium", description: "Showcasing innovative projects from our talented students.", image: "https://picsum.photos/400/250?random=1" },
  { id: 2, title: "Alumni Meetup", date: "Nov 20, 2023", time: "05:00 PM", location: "School Grounds", description: "A evening of networking and nostalgia for our graduated batches.", image: "https://picsum.photos/400/250?random=2" },
  { id: 3, title: "Annual Debate Competition", date: "Dec 02, 2023", time: "10:00 AM", location: "Lecture Hall B", description: "Inter-school debate championship finals.", image: "https://picsum.photos/400/250?random=3" },
];

export const FACULTY: FacultyMember[] = [
  { id: 1, name: "Dr. Sarah Johnson", role: "Principal", qualification: "PhD in Education Management", department: "Administration", image: "https://picsum.photos/150/150?random=10" },
  { id: 2, name: "Mr. Robert Chen", role: "Senior Mathematics Teacher", qualification: "M.Sc. Mathematics", department: "Science & Math", image: "https://picsum.photos/150/150?random=11" },
  { id: 3, name: "Ms. Emily Davis", role: "Head of Arts", qualification: "M.F.A.", department: "Arts & Humanities", image: "https://picsum.photos/150/150?random=12" },
  { id: 4, name: "Mr. James Wilson", role: "Sports Director", qualification: "B.P.Ed", department: "Physical Education", image: "https://picsum.photos/150/150?random=13" },
];

export const CLASSES: ClassInfo[] = [
  { grade: "Kindergarten", subjects: ["Basic Math", "Language Arts", "Art & Craft", "Physical Play"], teacher: "Mrs. Thompson", description: "Foundational learning through play and structured activities." },
  { grade: "Primary (1-5)", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Basics"], teacher: "Various", description: "Building core competencies and critical thinking skills." },
  { grade: "Middle (6-8)", subjects: ["Advanced Math", "Physics", "Chemistry", "History", "Geography", "Coding"], teacher: "Departmental Heads", description: "Preparing students for specialized streams and higher education." },
  { grade: "Senior (9-12)", subjects: ["Calculus", "Biology", "Economics", "Computer Science", "Literature"], teacher: "Subject Specialists", description: "Rigorous academic preparation for university entrance." },
];

export const GALLERY_IMAGES = [
  { src: "https://picsum.photos/800/600?random=20", category: "Campus" },
  { src: "https://picsum.photos/800/600?random=21", category: "Sports" },
  { src: "https://picsum.photos/800/600?random=22", category: "Events" },
  { src: "https://picsum.photos/800/600?random=23", category: "Classroom" },
  { src: "https://picsum.photos/800/600?random=24", category: "Arts" },
  { src: "https://picsum.photos/800/600?random=25", category: "Campus" },
];
