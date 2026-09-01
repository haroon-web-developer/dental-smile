import { ClinicSettings, ServiceItem, FAQItem, ReviewItem, DoctorProfile, BeforeAfterCase, SymptomItem } from '../types';

export const INITIAL_CLINIC_SETTINGS: ClinicSettings = {
  id: 'default-settings',
  clinic_name: 'Dental Smile',
  phone: '0318 5446951',
  whatsapp: '923185446951',
  address: 'Executive Arcade, Main Boulevard, Islamabad, Pakistan',
  opening_hours: 'Open until 10:00 PM',
  hero_title: 'Confident Smiles Start With Better Dental Care',
  hero_description: 'Providing dedicated, professional dental care in Islamabad. From routine check-ups and restorative fillings to crowns, implants, and orthodontic braces, our clinic focuses on gentle treatment and patient comfort.',
  google_rating: 4.9,
  google_review_count: 174,
  google_maps_url: 'https://maps.google.com/?q=Dental+Smile+Executive+Arcade+Islamabad+Pakistan',
  google_maps_embed_url: 'https://maps.google.com/maps?q=Executive+Arcade+Islamabad+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed',
  updated_at: new Date().toISOString()
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'teeth-whitening',
    name: 'Teeth Whitening',
    slug: 'teeth-whitening',
    short_description: 'Professional in-clinic whitening treatments designed to safely lighten surface stains and brighten your natural smile.',
    description: 'Our professional teeth whitening service uses tested, enamel-safe formulations under clinical supervision. Whether your teeth have darkened from coffee, tea, smoking, or natural aging, in-clinic whitening offers a controlled, predictable way to brighten your teeth without damaging tooth enamel.',
    icon: 'Sparkles',
    badge: 'Same-Day Brightness',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    active: true,
    indications: [
      'Discoloration from coffee, tea, smoking, or dietary stains',
      'Age-related darkening of natural teeth',
      'Preparation for special events or smile refreshment'
    ],
    procedure_overview: [
      'Comprehensive dental examination to verify oral health',
      'Gentle isolation of gums and soft tissues',
      'Application of dental-grade whitening gel under clinical oversight',
      'Post-treatment care guidelines to preserve your brighter shade'
    ],
    benefits: [
      'Administered under direct dental supervision',
      'Customized application tailored to your tooth sensitivity',
      'Noticeable improvement in natural shade'
    ]
  },
  {
    id: 'root-canal-treatment',
    name: 'Root Canal Treatment',
    slug: 'root-canal-treatment',
    short_description: 'Gentle endodontic treatment to relieve tooth pain, remove deep infection, and save your natural tooth.',
    description: 'When tooth decay reaches the inner dental pulp or an injury causes infection inside the tooth, root canal treatment is the standard procedure to relieve discomfort and save the natural tooth from extraction. The infected tissue is carefully removed, the canals are cleaned and disinfected, and then sealed with biocompatible material.',
    icon: 'ShieldAlert',
    badge: 'Immediate Pain Relief',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
    active: true,
    indications: [
      'Severe or persistent toothache, especially when chewing',
      'Prolonged sensitivity to hot or cold temperatures',
      'Swelling or tenderness in the nearby gums',
      'Darkening or discoloration of an injured tooth'
    ],
    procedure_overview: [
      'Local anesthesia to ensure patient comfort throughout',
      'Precise opening to access and gently clear infected pulp tissue',
      'Thorough disinfection and shaping of root canals',
      'Sealing with gutta-percha followed by permanent restoration or crown recommendation'
    ],
    benefits: [
      'Relieves pain caused by infected nerve tissue',
      'Preserves natural tooth structure and chewing function',
      'Prevents infection from spreading to adjacent teeth and bone'
    ]
  },
  {
    id: 'tooth-extraction',
    name: 'Tooth Extraction',
    slug: 'tooth-extraction',
    short_description: 'Safe and careful extraction of damaged, severely decayed, or impacted teeth with a focus on patient comfort.',
    description: 'While saving natural teeth is always our priority, severe decay, extensive fracture, advanced periodontal condition, or problematic wisdom teeth may make an extraction the healthiest option. We prioritize gentle technique, complete local anesthesia, and clear aftercare guidance.',
    icon: 'Activity',
    badge: 'Gentle Technique',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    active: true,
    indications: [
      'Severely broken or decayed teeth beyond repair',
      'Impacted or misaligned wisdom teeth causing pain',
      'Severe gum disease with loose teeth',
      'Orthodontic requirements to relieve overcrowding'
    ],
    procedure_overview: [
      'Detailed clinical evaluation and local anesthesia administration',
      'Gentle luxation and removal with minimal disruption to surrounding bone',
      'Hemostasis management and sterile gauze placement',
      'Step-by-step written and verbal aftercare instructions'
    ],
    benefits: [
      'Eliminates active sources of dental pain and recurrent infection',
      'Relieves pressure caused by crowded or impacted teeth',
      'Prepares your jaw for dental implants or restorative options'
    ]
  },
  {
    id: 'tooth-filling',
    name: 'Tooth Filling',
    slug: 'tooth-filling',
    short_description: 'Tooth-colored composite restorations that treat cavities, repair minor chips, and blend with your natural teeth.',
    description: 'Dental composite fillings restore teeth damaged by minor to moderate cavities, wear, or minor chipping. Using modern composite resins that match the natural shade of your enamel, fillings stop the progression of decay while restoring full chewing function and aesthetics.',
    icon: 'Layers',
    badge: 'Invisible & Natural',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    active: true,
    indications: [
      'Cavities and early-to-moderate dental decay',
      'Chipped, cracked, or worn tooth edges',
      'Replacing old or defective amalgam fillings',
      'Closing small gaps or fixing minor irregularities'
    ],
    procedure_overview: [
      'Removal of decayed tooth structure and thorough cleansing',
      'Application of dental adhesive and bonding agent',
      'Layering of shade-matched composite resin',
      'Light-curing and precision polishing to match natural bite'
    ],
    benefits: [
      'Shade-matched to look completely natural',
      'Bonds directly to tooth structure for durable support',
      'Protects tooth against future bacterial infiltration'
    ]
  },
  {
    id: 'zirconia-crown',
    name: 'Zirconia Crown',
    slug: 'zirconia-crown',
    short_description: 'High-strength, metal-free aesthetic crowns known for exceptional durability, biocompatibility, and natural translucency.',
    description: 'Zirconia crowns represent modern restorative dentistry at its finest. Made from solid or layered zirconium dioxide, they provide exceptional fracture resistance and a translucent, natural appearance with no dark metal margins. Ideal for both front and back teeth where strength and aesthetics are needed.',
    icon: 'Crown',
    badge: 'Premium Aesthetics',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    active: true,
    indications: [
      'Heavily restored or root canal-treated teeth needing protection',
      'Cracked, fractured, or severely worn teeth',
      'Patients seeking metal-free aesthetic restorations',
      'High-stress posterior teeth requiring maximum durability'
    ],
    procedure_overview: [
      'Tooth preparation and shaping with precise margins',
      'Accurate dental impressions or digital scanning',
      'Placement of temporary crown while custom zirconia crown is fabricated',
      'Final try-in, bite verification, and permanent cementation'
    ],
    benefits: [
      'Extremely strong and resistant to chipping or cracking',
      'Biocompatible with zero dark metal lines at the gumline',
      'Natural light transmission mimicking real tooth enamel'
    ]
  },
  {
    id: 'pfm-crown',
    name: 'PFM Crown (Porcelain-Fused-to-Metal)',
    slug: 'pfm-crown',
    short_description: 'Time-tested crowns combining a strong cast-metal substructure with a natural-looking porcelain exterior.',
    description: 'Porcelain-Fused-to-Metal (PFM) crowns have served as a reliable dental standard for decades. They feature a robust metal coping inside for structural integrity, overlaid with aesthetic dental porcelain. PFM crowns are commonly selected for posterior molars and bridges where bite forces are high.',
    icon: 'Shield',
    badge: 'Proven Durability',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    active: true,
    indications: [
      'Posterior teeth undergoing substantial masticatory pressure',
      'Support crowns for dental bridges',
      'Restoration of weakened teeth post root canal therapy',
      'Proven and cost-effective restorative option'
    ],
    procedure_overview: [
      'Tooth preparation under local anesthesia',
      'Precision dental impressions sent to specialized dental laboratory',
      'Custom fitting and shade matching with surrounding teeth',
      'Permanent clinical cementation and occlusion adjustment'
    ],
    benefits: [
      'Decades of proven clinical track record and durability',
      'High mechanical strength from internal metal framework',
      'Aesthetic tooth-colored outer porcelain finish'
    ]
  },
  {
    id: 'dental-implant',
    name: 'Dental Implant',
    slug: 'dental-implant',
    short_description: 'Long-term titanium root replacements designed to restore missing teeth with natural stability and function.',
    description: 'Dental implants are the gold standard for replacing missing teeth. A biocompatible titanium post is placed into the jawbone where it integrates naturally with the bone structure, serving as a permanent root anchor for a custom crown, bridge, or denture without needing to file down adjacent teeth.',
    icon: 'Anchor',
    badge: 'Permanent Solution',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    active: true,
    indications: [
      'One or more missing natural teeth',
      'Difficulty chewing or speaking due to tooth loss',
      'Desire to avoid removable dentures or adjacent tooth reduction for bridges',
      'Preserving facial structure and jawbone density'
    ],
    procedure_overview: [
      'Comprehensive clinical and radiographic bone assessment',
      'Precise surgical placement of the titanium implant post',
      'Osseointegration healing period for secure bone bonding',
      'Attachment of abutment and custom-crafted dental crown'
    ],
    benefits: [
      'Feels, looks, and functions like a natural tooth',
      'Preserves neighboring natural teeth without cutting them',
      'Stimulates and maintains healthy jawbone density'
    ]
  },
  {
    id: 'braces',
    name: 'Braces (Orthodontics)',
    slug: 'braces',
    short_description: 'Orthodontic treatments to correct misaligned teeth, crowded smiles, and bite irregularities for teens and adults.',
    description: 'Orthodontic braces gradually guide teeth into proper alignment using gentle, controlled pressure over time. Beyond enhancing smile aesthetics, correcting misalignments improves chewing efficiency, simplifies daily brushing and flossing, and prevents uneven tooth wear.',
    icon: 'Smile',
    badge: 'Straight Teeth',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    active: true,
    indications: [
      'Crooked, overlapping, or crowded teeth',
      'Gaps and spaces between teeth',
      'Overbite, underbite, crossbite, or open bite',
      'Jaw alignment and chewing discomfort'
    ],
    procedure_overview: [
      'Orthodontic consultation, photos, and dental study models',
      'Placement of precision brackets and archwires',
      'Regular periodic adjustments to maintain guided tooth movement',
      'Post-treatment retention plan to keep teeth in their ideal positions'
    ],
    benefits: [
      'Proper alignment facilitates effective oral hygiene',
      'Corrects bite balance and reduces abnormal enamel wear',
      'Creates a harmonious, confident smile'
    ]
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'review-1',
    author: 'Bilal Riaz',
    rating: 5,
    date_text: 'Verified Google Review',
    text: 'Best place for dentistry check-ups, quite a beautiful and brilliantly made. Genuine ways to control cross-infections, and sterilization. Strongly recommend to all people...',
    source: 'Google Reviews',
    verified: true
  },
  {
    id: 'review-2',
    author: 'Abdullah Ahmad',
    rating: 5,
    date_text: 'Verified Google Review',
    text: 'Their approach is patient centered. They listened to all my concerns and gave honest advice. 10/10 service!...',
    source: 'Google Reviews',
    verified: true
  },
  {
    id: 'review-3',
    author: 'Zainab Zafar',
    rating: 5,
    date_text: 'Verified Google Review',
    text: 'Best experience highly recommend',
    source: 'Google Reviews',
    verified: true
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I book a dental appointment at Dental Smile?',
    answer: 'You can easily request an appointment online through our booking form on this website, call us directly at 0318 5446951, or send us a message on WhatsApp. We will confirm your preferred date and time promptly.',
    category: 'Appointments',
    active: true
  },
  {
    id: 'faq-2',
    question: 'Where is Dental Smile located?',
    answer: 'We are located at Executive Arcade, Main Boulevard, Islamabad, Pakistan. Dedicated parking and accessible ground-floor entry are available.',
    category: 'Location',
    active: true
  },
  {
    id: 'faq-3',
    question: 'What are the clinic opening hours?',
    answer: 'Dental Smile is open until 10:00 PM. For specific scheduling or evening appointments, please contact us via phone or WhatsApp at 0318 5446951.',
    category: 'General',
    active: true
  },
  {
    id: 'faq-4',
    question: 'What dental services are available at Dental Smile?',
    answer: 'Our services include Teeth Whitening, Root Canal Treatment, Tooth Extraction, Tooth Filling, Zirconia Crowns, PFM Crowns, Dental Implants, and Orthodontic Braces.',
    category: 'Services',
    active: true
  },
  {
    id: 'faq-5',
    question: 'Does the clinic provide root canal treatment?',
    answer: 'Yes. We provide root canal treatments designed to relieve tooth pain, treat deep dental infections, and save your natural tooth with gentle care and local anesthesia.',
    category: 'Services',
    active: true
  },
  {
    id: 'faq-6',
    question: 'Does the clinic offer dental implants?',
    answer: 'Yes. We offer dental implants as a permanent, durable replacement for missing teeth, restoring both natural biting function and aesthetics.',
    category: 'Services',
    active: true
  },
  {
    id: 'faq-7',
    question: 'Does the clinic provide braces and orthodontic care?',
    answer: 'Yes. We provide orthodontic braces for teeth alignment, fixing crowded or spaced teeth, and correcting bite irregularities for both adolescents and adults.',
    category: 'Services',
    active: true
  },
  {
    id: 'faq-8',
    question: 'Does the clinic offer teeth whitening?',
    answer: 'Yes. We provide professional in-clinic teeth whitening under dental supervision to safely brighten your teeth and reduce surface stains.',
    category: 'Services',
    active: true
  },
  {
    id: 'faq-9',
    question: 'How can I reach the clinic quickly on WhatsApp?',
    answer: 'You can click any of the WhatsApp buttons on our website or message directly at +92 318 5446951 for fast appointment inquiries and clinic directions.',
    category: 'General',
    active: true
  }
];

export const CLINICAL_DOCTORS: DoctorProfile[] = [
  {
    id: 'dr-usman-tariq',
    name: 'Dr. Usman Tariq',
    title: 'Senior Dental Surgeon & Implantologist',
    role: 'Clinical Director & Restorative Specialist',
    qualifications: ['BDS (Dental Surgery)', 'RDS (Registered Dental Surgeon)', 'Certified Implantologist (ICOI)'],
    experience: '12+ Years Clinical Experience',
    specialties: ['Dental Implants', 'Zirconia Aesthetic Crowns', 'Surgical Extractions', 'Full Mouth Rehabilitation'],
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    pmdc_reg: 'PMDC / PMC Verified Practitioner',
    availability: 'Monday – Saturday: 11:00 AM – 10:00 PM',
    bio: 'Dedicated to painless dentistry and high-precision restorative prosthetics. Dr. Usman brings extensive experience in complex dental rehabilitations, implant placements, and aesthetic smile designs with an emphasis on gentle patient handling.'
  },
  {
    id: 'dr-ayesha-malik',
    name: 'Dr. Ayesha Malik',
    title: 'Consultant Orthodontist & Smile Designer',
    role: 'Specialist in Teeth Alignment & Aesthetics',
    qualifications: ['BDS', 'FCPS (Orthodontics)', 'Certified Clear Aligner Provider'],
    experience: '9+ Years Specialist Practice',
    specialties: ['Orthodontic Braces', 'Clear Aligners', 'Teeth Whitening', 'Bite Correction & Overbites'],
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    pmdc_reg: 'PMDC / PMC Verified Specialist',
    availability: 'Tuesday, Thursday, Saturday: 3:00 PM – 9:30 PM',
    bio: 'Dr. Ayesha specializes in orthodontic smile transformations for children, teenagers, and working adults. She creates custom biomechanical alignment plans that preserve facial harmony while delivering naturally aligned, radiant smiles.'
  },
  {
    id: 'dr-hamza-bilal',
    name: 'Dr. Hamza Bilal',
    title: 'Endodontist & Conservative Dental Surgeon',
    role: 'Root Canal & Restorative Specialist',
    qualifications: ['BDS', 'RDS', 'Fellowship in Advanced Rotary Endodontics'],
    experience: '8+ Years Endodontic Focus',
    specialties: ['Painless Root Canal Therapy', 'Composite Aesthetic Restorations', 'Tooth Preservation', 'Emergency Pain Relief'],
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    pmdc_reg: 'PMDC / PMC Verified Practitioner',
    availability: 'Daily: 12:00 PM – 10:00 PM',
    bio: 'Focusing on single-visit and multi-visit microscope-guided root canal therapies. Dr. Hamza is renowned for his reassuring chairside manner, making severe tooth pain management gentle and stress-free for anxious patients.'
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'case-whitening',
    title: 'In-Office Enamel-Safe Teeth Whitening',
    category: 'Cosmetic Dentistry',
    description: 'Patient presented with severe coffee and tea surface discoloration. Achieved 6 shades lighter within a single 50-minute clinical session with zero post-op sensitivity.',
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    duration: '50 Minutes',
    visits: '1 Visit',
    procedureSlug: 'teeth-whitening'
  },
  {
    id: 'case-zirconia-crown',
    title: 'Anterior Zirconia Aesthetic Crowns',
    category: 'Restorative Care',
    description: 'Restoration of heavily fractured and discolored upper central incisors with high-translucency, metal-free Zirconia crowns matching natural enamel gradations.',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    duration: '5 Days Lab Fabrication',
    visits: '2 Visits',
    procedureSlug: 'zirconia-crown'
  },
  {
    id: 'case-braces',
    title: 'Orthodontic Alignment for Crowded Teeth',
    category: 'Orthodontics',
    description: 'Correction of severe upper and lower crowding with aesthetic ceramic orthodontic brackets, establishing proper bite symmetry and lip support.',
    beforeImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    duration: '14 Months',
    visits: 'Monthly Adjustments',
    procedureSlug: 'braces'
  },
  {
    id: 'case-implant',
    title: 'Titanium Dental Implant & Natural Crown',
    category: 'Implantology',
    description: 'Permanent single-tooth replacement for a missing posterior molar, restoring full chewing power and preventing adjacent teeth from shifting.',
    beforeImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
    duration: '3 Months Osseointegration',
    visits: '3 Visits',
    procedureSlug: 'dental-implant'
  }
];

export const DENTAL_SYMPTOMS: SymptomItem[] = [
  {
    id: 'sym-severe-pain',
    symptom: 'Severe / Throbbing Toothache',
    emoji: '⚡',
    category: 'Emergency & Pain Relief',
    description: 'Sharp or pulsating pain, especially at night or when chewing, indicating deep decay or inflamed nerve pulp.',
    recommendedService: 'Root Canal Treatment',
    procedureSlug: 'root-canal-treatment',
    urgency: 'Immediate',
    typicalVisits: '1–2 Visits'
  },
  {
    id: 'sym-stained-teeth',
    symptom: 'Yellowing or Stained Enamel',
    emoji: '✨',
    category: 'Aesthetic Refresh',
    description: 'Surface discoloration caused by coffee, tea, smoking, or natural aging requiring safe clinical brightening.',
    recommendedService: 'Teeth Whitening',
    procedureSlug: 'teeth-whitening',
    urgency: 'Elective',
    typicalVisits: '1 Visit (50 mins)'
  },
  {
    id: 'sym-broken-tooth',
    symptom: 'Chipped, Broken, or Cavity Hole',
    emoji: '🦷',
    category: 'Restorative Care',
    description: 'Visible hole, sensitive chip, or rough sharp edge that catches food and compromises tooth strength.',
    recommendedService: 'Tooth Filling or Zirconia Crown',
    procedureSlug: 'tooth-filling',
    urgency: 'Moderate',
    typicalVisits: '1–2 Visits'
  },
  {
    id: 'sym-missing-tooth',
    symptom: 'Missing Tooth / Chewing Gap',
    emoji: '🔲',
    category: 'Tooth Replacement',
    description: 'Empty gap left by an extracted tooth causing adjacent teeth to tilt and reducing chewing efficiency.',
    recommendedService: 'Dental Implant or Crown Bridge',
    procedureSlug: 'dental-implant',
    urgency: 'Moderate',
    typicalVisits: '2–3 Visits'
  },
  {
    id: 'sym-crooked-teeth',
    symptom: 'Crooked, Overlapping, or Spaced Teeth',
    emoji: '📐',
    category: 'Orthodontics',
    description: 'Misaligned bite, crowded front teeth, or noticeable gaps affecting smile confidence and oral hygiene.',
    recommendedService: 'Orthodontic Braces',
    procedureSlug: 'braces',
    urgency: 'Elective',
    typicalVisits: 'Monthly Monitoring'
  },
  {
    id: 'sym-wisdom-pain',
    symptom: 'Wisdom Tooth Swelling / Jaw Pain',
    emoji: '💢',
    category: 'Oral Surgery',
    description: 'Pain, swelling, or difficulty opening jaw at the back of mouth caused by an impacted or partially erupted molar.',
    recommendedService: 'Tooth Extraction',
    procedureSlug: 'tooth-extraction',
    urgency: 'Immediate',
    typicalVisits: '1 Visit'
  }
];

export const STERILIZATION_STEPS = [
  {
    step: '01',
    title: 'Ultrasonic Cleansing & Decontamination',
    description: 'Instruments undergo enzymatic ultrasonic bath to remove micro-debris and neutralize biological contaminants before sterilization.'
  },
  {
    step: '02',
    title: 'Individual Medical Pouching',
    description: 'Each instrument set is sealed in medical-grade sterilization pouches with integrated chemical sterility indicator strips.'
  },
  {
    step: '03',
    title: 'Class-B Hospital-Grade Autoclaving',
    description: 'High-pressure vacuum steam sterilization at 134°C kills 100% of bacterial spores, viruses, and pathogens conforming to international standards.'
  },
  {
    step: '04',
    title: 'Opened In Front Of You',
    description: 'Every sealed instrument pouch is unwrapped directly at your dental chair right before your procedure starts for total peace of mind.'
  }
];

export const CLINIC_TECHNOLOGY = [
  {
    name: 'Digital RVG Low-Radiation X-Rays',
    desc: 'Instant high-resolution imaging with up to 90% less radiation exposure than conventional film X-rays.',
    badge: 'Safe & Instant'
  },
  {
    name: 'Micro-Rotary Endodontic System',
    desc: 'Precision electronic apex locators and flexible nickel-titanium files for gentle, whisper-quiet root canal therapy.',
    badge: 'Pain-Relief Tech'
  },
  {
    name: 'Intraoral HD Diagnostic Camera',
    desc: 'See exactly what the dentist sees on our high-definition chairside display for 100% transparent diagnosis.',
    badge: '100% Transparency'
  },
  {
    name: 'Piezo Ultrasonic Scalers',
    desc: 'Gentle vibration technology removes stubborn calculus and tartar without scratching tooth enamel.',
    badge: 'Enamel-Safe'
  }
];

export const TREATMENT_PRICING_GUIDE = [
  {
    service: 'Dental Consultation & Oral Examination',
    duration: '20–30 Mins',
    estimate: 'Nominal In-Clinic Fee',
    includes: ['Comprehensive visual exam', 'Clinical treatment plan', 'Immediate hygiene advice'],
    slug: 'contact'
  },
  {
    service: 'Teeth Whitening (In-Clinic)',
    duration: '50 Mins',
    estimate: 'Starting from Rs. 15,000',
    includes: ['Full mouth shade assessment', 'Enamel-safe whitening gel', 'Post-treatment polish'],
    slug: 'teeth-whitening'
  },
  {
    service: 'Root Canal Treatment (Per Canal)',
    duration: '1–2 Sessions',
    estimate: 'Starting from Rs. 8,000',
    includes: ['Digital X-ray assessment', 'Painless canal cleaning', 'Biocompatible canal obturation'],
    slug: 'root-canal-treatment'
  },
  {
    service: 'Tooth-Colored Composite Filling',
    duration: '30 Mins',
    estimate: 'Starting from Rs. 3,500',
    includes: ['Decay removal', 'Direct composite bonding', 'Bite adjustment & high-gloss polish'],
    slug: 'tooth-filling'
  },
  {
    service: 'Zirconia Aesthetic Crown',
    duration: '2 Visits',
    estimate: 'Starting from Rs. 18,000',
    includes: ['Precision tooth preparation', 'Custom shade matching', 'Permanent cementation & warranty'],
    slug: 'zirconia-crown'
  },
  {
    service: 'Dental Implant (Titanium Fixture + Crown)',
    duration: 'Multi-Phase',
    estimate: 'Customized Consultation Plan',
    includes: ['Surgical fixture placement', 'Osseointegration check', 'Custom abutment & crown'],
    slug: 'dental-implant'
  },
  {
    service: 'Orthodontic Braces (Full Arch Treatment)',
    duration: '12–18 Months',
    estimate: 'Easy Monthly Installments Available',
    includes: ['Cephalometric analysis', 'Bracket bonding', 'Monthly progress adjustments'],
    slug: 'braces'
  }
];

