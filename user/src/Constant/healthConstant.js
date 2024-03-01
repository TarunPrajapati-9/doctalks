// healthConstants.js

const health = [
    "health", "doctor", "medical", "medicine", "hospital", "wellness",
    "disease", "illness", "virus", "infection", "pandemic", "epidemic",
    "symptoms", "treatment", "therapy", "vaccination", "immunization",
    "cancer", "diabetes", "heart disease", "hypertension", "stroke",
    "asthma", "allergy", "flu", "cold", "COVID-19", "coronavirus",
    "HIV", "AIDS", "tuberculosis", "malaria", "ebola", "zika",
    // Specific diseases
    "Alzheimer's", "Parkinson's", "multiple sclerosis", "arthritis",
    "osteoporosis", "fibromyalgia", "chronic fatigue syndrome", "Lyme disease",
    "Crohn's disease", "ulcerative colitis", "irritable bowel syndrome",
    "chronic obstructive pulmonary disease (COPD)", "emphysema",
    "pneumonia", "bronchitis", "sinusitis", "tinnitus", "hearing loss",
    "glaucoma", "cataracts", "macular degeneration", "retinal detachment",
    "conjunctivitis", "iritis", "glaucoma", "conjunctivitis", "iritis",
    "endometriosis", "polycystic ovary syndrome (PCOS)", "fibroids", "PID",
    "cervical cancer", "ovarian cancer", "endometrial cancer", "breast cancer",
    "prostate cancer", "testicular cancer", "colon cancer", "melanoma",
    // Symptoms and body parts
    "headache", "migraine", "back pain", "neck pain", "joint pain", "muscle pain",
    "stomach ache", "abdominal pain", "chest pain", "shortness of breath",
    "fatigue", "weakness", "dizziness", "nausea", "vomiting", "diarrhea",
    "constipation", "fever", "chills", "sore throat", "cough", "runny nose",
    "congestion", "sneezing", "itchy eyes", "rash", "swelling", "bruising",
    "numbness", "tingling", "burning sensation", "difficulty swallowing",
    "difficulty breathing", "rapid heartbeat", "palpitations",
    "visual disturbances", "hearing disturbances", "balance problems",
    "memory loss", "confusion", "mood swings", "depression", "anxiety",
    // Add more symptoms and body parts here
    "Abdominal aortic aneurysm",
    "Acne",
    "Acute cholecystitis",
    "Acute lymphoblastic leukaemia",
    "Acute lymphoblastic leukaemia: Children",
    "Acute lymphoblastic leukaemia: Teenagers and young adults",
    "Acute myeloid leukaemia",
    "Acute myeloid leukaemia: Children",
    "Acute myeloid leukaemia: Teenagers and young adults",
    "Acute pancreatitis",
    "Adenomyosis",
    "Addison’s disease",
    "Alcohol-related liver disease",
    "Allergic rhinitis",
    "Allergies",
    "Alzheimer’s disease",
    "Anal cancer",
    "Anaphylaxis",
    "Angina",
    "Angioedema",
    "Ankylosing spondylitis",
    "Anorexia nervosa",
    "Anxiety",
    "Anxiety disorders in children",
    "Appendicitis",
    "Arterial thrombosis",
    "Arthritis",
    "Asbestosis",
    "Asthma",
    "Atopic eczema",
    "Atrial fibrillation",
    "Attention deficit hyperactivity disorder (ADHD)",
    "Autistic spectrum disorder (ASD)",
    "Bacterial vaginosis",
    "Benign prostate enlargement",
    "Bile duct cancer (cholangiocarcinoma)",
    "Binge eating",
    "Bipolar disorder",
    "Bladder cancer",
    "Blood poisoning (sepsis)",
    "Bone cancer",
    "Bone cancer: Teenagers and young adults",
    "Bowel cancer",
    "Bowel incontinence",
    "Bowel polyps",
    "Brain stem death",
    "Brain tumours",
    "Brain tumours: Children",
    "Brain tumours: Teenagers and young adults",
    "Breast cancer (female)",
    "Breast cancer (male)",
    "Bronchiectasis",
    "Bronchitis",
    "Bulimia",
    "Bunion",
    "Carcinoid syndrome and carcinoid tumours",
    "Catarrh",
    "Cellulitis",
    "Cerebral palsy",
    "Cervical cancer",
    "Chest infection",
    "Chest pain",
    "Chickenpox",
    "Chilblains",
    "Chlamydia",
    "Chronic fatigue syndrome",
    "Chronic kidney disease",
    "Chronic lymphocytic leukaemia",
    "Chronic myeloid leukaemia",
    "Chronic obstructive pulmonary disease",
    "Chronic pain",
    "Chronic pancreatitis",
    "Cirrhosis",
    "Clostridium difficile",
    "Coeliac disease",
    "Cold sore",
    "Coma",
    "Common cold",
    "Common heart conditions",
    "Congenital heart disease",
    "Conjunctivitis",
    "Constipation",
    "Coronavirus (COVID-19)",
    "Cough",
    "Crohn’s disease",
    "Croup",
    "Cystic fibrosis",
    "Cystitis",
    "Deafblindness",
    "Deep vein thrombosis",
    "Dehydration",
    "Dementia",
    "Dementia with Lewy bodies",
    "Dental abscess",
    "Depression",
    "Dermatitis herpetiformis",
    "Diabetes",
    "Diarrhoea",
    "Discoid eczema",
    "Diverticular disease and diverticulitis",
    "Dizziness (Lightheadedness)",
    "Down’s syndrome",
    "Dry mouth",
    "Dysphagia (swallowing problems)",
    "Dystonia",
    "Earache",
    "Earwax build-up",
    "Ebola virus disease",
    "Ectopic pregnancy",
    "Edwards’ syndrome",
    "Endometriosis",
    "Epilepsy",
    "Erectile dysfunction (impotence)",
    "Escherichia coli (E. coli) O157",
    "Ewing sarcoma",
    "Ewing sarcoma: Children",
    "Eye cancer",
    "Febrile seizures",
    "Feeling of something in your throat (Globus)",
    "Fever in adults",
    "Fever in children",
    "Fibroids",
    "Fibromyalgia",
    "Farting",
    "Flu",
    "Foetal alcohol syndrome",
    "Food poisoning",
    "Functional neurological disorder (FND)",
    "Fungal nail infection",
    "Gallbladder cancer",
    "Gallstones",
    "Ganglion cyst",
    "Gastroenteritis",
    "Gastro-oesophageal reflux disease (GORD)",
    "Genital herpes",
    "Genital symptoms",
    "Genital warts",
    "Germ cell tumours",
    "Glandular fever",
    "Gonorrhoea",
    "Gout",
    "Gum disease",
    "Haemorrhoids (piles)",
    "Hand, foot and mouth disease",
    "Hay fever",
    "Head and neck cancer",
    "Head lice and nits",
    "Headaches",
    "Hearing loss",
    "Heart attack",
    "Heart failure",
    "Hepatitis A",
    "Hepatitis B",
    "Hepatitis C",
    "Hiatus hernia",
    "High cholesterol",
    "HIV",
    "Hodgkin lymphoma",
    "Hodgkin lymphoma: Children",
    "Hodgkin lymphoma: Teenagers and young adults",
    "Huntington’s disease",
    "Hyperglycaemia (high blood sugar)",
    "Hyperhidrosis",
    "Hypoglycaemia (low blood sugar)",
    "Idiopathic pulmonary fibrosis",
    "Impetigo",
    "Indigestion",
    "Ingrown toenail",
    "Inherited heart conditions",
    "Insomnia",
    "Iron deficiency anaemia",
    "Irritable bowel syndrome (IBS)",
    "Itching",
    "Itchy bottom",
    "Kaposi’s sarcoma",
    "Kidney cancer",
    "Kidney infection",
    "Kidney stones",
    "Labyrinthitis",
    "Lactose intolerance",
    "Laryngeal (larynx) cancer",
    "Laryngitis",
    "Leg cramps",
    "Lichen planus",
    "Lipoedema",
    "Liver cancer",
    "Liver disease",
    "Liver tumours",
    "Loss of libido",
    "Lung cancer",
    "Lupus",
    "Lyme disease",
    "Lymphoedema",
    "Lymphogranuloma venereum (LGV)",
    "Malaria",
    "Malignant brain tumour (cancerous)",
    "Malnutrition",
    "Measles",
    "Meningitis",
    "Menopause",
    "Mesothelioma",
    "Middle ear infection (otitis media)",
    "Migraine",
    "Miscarriage",
    "Motor neurone disease (MND)",
    "Mouth cancer",
    "Mouth ulcer",
    "Multiple myeloma",
    "Multiple sclerosis (MS)",
    "Mumps",
    "Meniere’s disease",
    "Myasthenia gravis",
    "Nasal and sinus cancer",
    "Nasopharyngeal cancer",
    "Neuroblastoma: Children",
    "Neuroendocrine tumours",
    "Non-alcoholic fatty liver disease (NAFLD)",
    "Non-Hodgkin lymphoma",
    "Non-Hodgkin lymphoma: Children",
    "Norovirus",
    "Nosebleed",
    "Obesity",
    "Obsessive compulsive disorder (OCD)",
    "Obstructive sleep apnoea",
    "Oesophageal cancer",
    "Oral thrush in adults",
    "Osteoporosis",
    "Osteosarcoma",
    "Otitis externa",
    "Ovarian cancer",
    "Ovarian cancer: Teenagers and young adults",
    "Ovarian cyst",
    "Overactive thyroid",
    "Paget’s disease of the nipple",
    "Pancreatic cancer",
    "Panic disorder",
    "Parkinson’s disease",
    "Patau’s syndrome",
    "Pelvic inflammatory disease",
    "Pelvic organ prolapse",
    "Penile cancer",
    "Peripheral neuropathy",
    "Personality disorder",
    "Pleurisy",
    "Pneumonia",
    "Polycystic ovary syndrome (PCOS)",
    "Polymyalgia rheumatica",
    "Post-polio syndrome",
    "Post-traumatic stress disorder (PTSD)",
    "Postnatal depression",
    "Pregnancy and baby",
    "Pressure ulcers",
    "Prostate cancer",
    "Psoriasis",
    "Psoriatic arthritis",
    "Psychosis",
    "Pubic lice",
    "Rare tumours",
    "Raynaud’s phenomenon",
    "Reactive arthritis",
    "Restless legs syndrome",
    "Retinoblastoma: Children",
    "Rhabdomyosarcoma",
    "Rheumatoid arthritis",
    "Ringworm and other fungal infections",
    "Rosacea",
    "Scabies",
    "Scarlet fever",
    "Schizophrenia",
    "Scoliosis",
    "Septic shock",
    "Shingles",
    "Shortness of breath",
    "Sickle cell disease",
    "Sinusitis",
    "Sjogren’s syndrome",
    "Skin cancer (melanoma)",
    "Skin cancer (non-melanoma)",
    "Skin rashes in children",
    "Slapped cheek syndrome",
    "Soft tissue sarcomas",
    "Soft tissue sarcomas: Teenagers and young adults",
    "Sore throat",
    "Spleen problems and spleen removal",
    "Stillbirth",
    "Stomach ache and abdominal pain",
    "Stomach cancer",
    "Stomach ulcer",
    "Streptococcus A (strep A)",
    "Stress, anxiety and low mood",
    "Sudden infant death syndrome (SIDS)",
    "Suicide",
    "Sunburn",
    "Supraventricular tachycardia",
    "Swollen glands",
    "Syphilis",
    "Testicular cancer",
    "Testicular cancer: Teenagers and young adults",
    "Testicular lumps and swellings",
    "Thirst",
    "Threadworms",
    "Thrush",
    "Thyroid cancer",
    "Thyroid cancer: Teenagers and young adults",
    "Tinnitus",
    "Tonsillitis",
    "Tooth decay",
    "Toothache",
    "Transient ischaemic attack (TIA)",
    "Trigeminal neuralgia",
    "Tuberculosis (TB)",
    "Type 1 diabetes",
    "Type 2 diabetes",
    "Trichomonas infection",
    "Transverse myelitis",
    "Ulcerative colitis",
    "Underactive thyroid",
    "Urinary incontinence",
    "Urinary tract infection (UTI)",
    "Urinary tract infection (UTI) in children",
    "Urticaria (hives)",
    "Vaginal cancer",
    "Vaginal discharge",
    "Varicose eczema",
    "Venous leg ulcer",
    "Vertigo",
    "Vitamin B12 or folate deficiency anaemia",
    "Vomiting in adults",
    "Vulval cancer",
    "Warts and verrucas",
    "Whooping cough",
    "Wilms’ tumour",
    "Womb (uterus) cancer",
    "Yellow fever"
];

export default health;