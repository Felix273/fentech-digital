export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  image: string;
  rating: number;
  featured: boolean;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Jonathan Rivera",
    role: "CTO",
    company: "Global Logistics Group",
    text: "FenTech Digital didn't just migrate our data; they re-engineered our entire workflow. The $750k monthly savings was just the beginning of the value they added.",
    image: "https://i.pravatar.cc/150?u=jon",
    rating: 5,
    featured: true
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Ops Director",
    company: "MedTech",
    text: "Their healthcare security protocols are world-class. A true partner in digital safety.",
    image: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
    featured: false
  },
  {
    id: "3",
    name: "Marcus Thorne",
    role: "Founder",
    company: "Peak Fintech",
    text: "Reliable, innovative, and fast. Delivered our AI app ahead of schedule.",
    image: "https://i.pravatar.cc/150?u=marcus",
    rating: 5,
    featured: false
  }
];
