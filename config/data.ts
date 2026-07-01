export interface Campus {
  name: string;
  location: string;
  officeAddress: string;
  pageUrl: string;
  coordinates: [number, number];
  displayName: string;
  status: "Publish" | "Draft";
}

export interface Alumni {
  name: string;
  role: string;
  company: string;
  year: string;
  imageUrl?: string;
}

export interface Testimonial {
  name: string;
  quote: string;
  role: string;
  wing: string;
  year: string;
  campus: string;
}

export const campuses: Campus[] = [
  {
    name: "Central Campus",
    location: "Bangalore",
    officeAddress: "CAPS Office, Room 910 & Room 1006, Floor 9 & 10, Central Block",
    pageUrl: "https://caps.christuniversity.in/bcc/home",
    coordinates: [12.934269, 77.605644],
    displayName: "Bangalore Central",
    status: "Publish"
  },
  {
    name: "Bannerghatta Road Campus",
    location: "Bangalore",
    officeAddress: "CAPS Office, Room 101, Floor 1, Academic Block",
    pageUrl: "https://caps.christuniversity.in/brc/home",
    coordinates: [12.877836794869678, 77.59586742924213],
    displayName: "Bangalore BRC",
    status: "Draft"
  },
  {
    name: "Kengeri Campus",
    location: "Bangalore",
    officeAddress: "CAPS Office, #79, Block 3 - 2nd Floor",
    pageUrl: "https://caps.christuniversity.in/bkc/home",
    coordinates: [12.862493226706718, 77.43879597284378],
    displayName: "Bangalore Kengeri",
    status: "Draft"
  },
  {
    name: "Yeshwanthpur Campus",
    location: "Bangalore",
    officeAddress: "CAPS Office, Room 409, Block A, Floor 4",
    pageUrl: "https://sites.google.com/christuniversity.in/caps-site-byc/home",
    coordinates: [13.035992, 77.505516],
    displayName: "Bangalore BYC",
    status: "Publish"
  },
  {
    name: "Pune Lavasa",
    location: "Pune",
    officeAddress: "CHRIST Pune Lavasa Campus",
    pageUrl: "https://lavasa.christuniversity.in/center/C/CAPS2",
    coordinates: [18.411698436703016, 73.5073153346072],
    displayName: "Pune Lavasa",
    status: "Draft"
  },
  {
    name: "Delhi NCR",
    location: "Delhi NCR",
    officeAddress: "CHRIST DELHI NCR Campus",
    pageUrl: "https://caps.christuniversity.in/ncr/home",
    coordinates: [28.68366113458173, 77.41056398968146],
    displayName: "Delhi NCR",
    status: "Draft"
  }
];

export const alumniList: Alumni[] = [
  { name: "Pooja Rajkumari", role: "CEWS member", company: "Benzinga", year: "2019 - 2020" },
  { name: "Piyush Ranjan", role: "Masters of Counselling", company: "Monash University", year: "2020 - 2020" },
  { name: "Shreya Kar", role: "HR Operations Intern", company: "MiQ Digital India", year: "2023 - 2025" },
  { name: "Haran RP", role: "Mentor", company: "CAPS", year: "2021 - 2022" },
  { name: "Joel Mathew Jose", role: "PhD in Psychology", company: "University", year: "2021 - 2022" },
  { name: "Kaushik Amrit Raj", role: "Analyst", company: "Marsh India Insurance Brokers", year: "2017 - 2019" },
  { name: "Prithul Chaturvedi", role: "Statistical Analyst", company: "Eli Lilly & Co.", year: "2018 - 2020" },
  { name: "Sushant Prasad", role: "Analyst", company: "Accenture", year: "2020 - 2023" }
];

export const testimonialsList: Testimonial[] = [
  {
    name: "Al Sakib Hami",
    quote: "CAPS has been more than just a centre to me—it has been a space where I’ve grown, learned, and built meaningful connections. Being part of the Operations Committee of CAPS has given me a better understanding of the behind the scene works.",
    role: "Team Lead",
    wing: "Operations Committee",
    year: "2025 - 2026",
    campus: "Central Campus"
  },
  {
    name: "Gowri Ananth",
    quote: "From a curious volunteer to being spoken about as, 'There walks a Capsite', CAPS has moulded me into a confident, efficient trainer. I'm thankful to the unwavering mentorship and heartfelt support.",
    role: "Level 1 Volunteer",
    wing: "Group Peer Training",
    year: "2024 - 2025",
    campus: "Central Campus"
  },
  {
    name: "Yashica Mhatre",
    quote: "I’ve grown under the guidance of incredible mentors, learning from both my successes and failures. Stepping out of my comfort zone, I learned to lead with confidence and take charge of projects.",
    role: "Team Lead",
    wing: "Psychometric Assessment",
    year: "2024 - 2025",
    campus: "Central Campus"
  }
];
