/**
 * i18n.js — Marathi / English translations + language switcher
 *
 * HOW IT WORKS
 *  - Every translatable element carries a key:
 *      data-i18n="key"            → replaces the element's text
 *      data-i18n-html="key"       → replaces inner HTML (for headings with a gradient word etc.)
 *      data-i18n-attr="attr:key; attr2:key2" → translates attributes
 *                                   (placeholder, alt, aria-label, title, content…)
 *  - Each entry below is  'key': ['मराठी', 'English'].
 *  - Page <title> and meta description come from  meta.<page>.title / meta.<page>.desc,
 *    where <page> is the  data-page  attribute on <html>.
 *  - Default language is English; the visitor's choice is saved in localStorage.
 *
 * To change any text on the site, edit it here — both languages side by side.
 */

const KEY = 'rayate-language'; // renamed so earlier saved choices reset to the English default
export const LANGS = ['mr', 'en'];

export const dict = {
  /* ── Meta (title + description per page) ─────────────────────────── */
  'meta.home.title': ['रायते हॉस्पिटल अँड मॅटर्निटी होम, नाशिक | प्रसूती व स्त्रीरोग तज्ज्ञ', 'Rayate Hospital & Maternity Home, Nashik | Maternity Hospital & Gynaecologist'],
  'meta.home.desc': ['नाशिकमधील विश्वासू मॅटर्निटी हॉस्पिटल — डॉ. मनोज रायते (MBBS, DGO, स्त्रीरोगतज्ज्ञ) व डॉ. प्रिया रायते (MD आयुर्वेद). नॉर्मल व सिझेरियन प्रसूती, NICU, 24/7 सेवा.', 'Trusted maternity hospital in Nashik — Dr. Manoj Rayate (MBBS, DGO, gynaecologist) and Dr. Priya Rayate (MD Ayurveda). Normal & C-section delivery, NICU and 24/7 care.'],
  'meta.about.title': ['आमच्याबद्दल | रायते हॉस्पिटल अँड मॅटर्निटी होम, नाशिक', 'About Us | Rayate Hospital & Maternity Home, Nashik'],
  'meta.about.desc': ['नाशिकमधील 15+ वर्षांची कौटुंबिक मातृत्व व आरोग्य सेवा, आता नवीन सुसज्ज इमारतीत. आमची कहाणी, ध्येय आणि मूल्ये.', 'A family-run maternity and family-care hospital serving Nashik for 15+ years, now in a new fully equipped building. Our story, mission and values.'],
  'meta.doctors.title': ['आमचे डॉक्टर | स्त्रीरोगतज्ज्ञ व आयुर्वेद डॉक्टर, नाशिक', 'Our Doctors | Gynaecologist & Ayurveda Doctor in Nashik'],
  'meta.doctors.desc': ['डॉ. मनोज रायते (MBBS, DGO) — स्त्रीरोग व प्रसूतीतज्ज्ञ आणि डॉ. प्रिया रायते (MD आयुर्वेद) — फॅमिली फिजिशियन. OPD वेळ आणि अपॉइंटमेंट.', 'Dr. Manoj Rayate (MBBS, DGO), gynaecologist & obstetrician, and Dr. Priya Rayate (MD Ayurveda), family physician, in Nashik. OPD timings and appointments.'],
  'meta.services.title': ['सेवा व सुविधा | मॅटर्निटी हॉस्पिटल नाशिक', 'Services & Facilities | Maternity Hospital in Nashik'],
  'meta.services.desc': ['गर्भावस्था काळजी, नॉर्मल व सिझेरियन प्रसूती, हाय-रिस्क गर्भावस्था, NICU, स्त्रीरोग शस्त्रक्रिया, आयुर्वेद — आणि 24/7 लॅब, OT, लेबर रूम, डिलक्स रूम्स.', 'Pregnancy care, normal & C-section delivery, high-risk pregnancy, NICU, gynaecology surgery and Ayurveda — plus a 24/7 lab, OT, labour room and deluxe rooms.'],
  'meta.gallery.title': ['गॅलरी | रायते हॉस्पिटल, नाशिक', 'Gallery | Rayate Hospital, Nashik'],
  'meta.gallery.desc': ['रायते हॉस्पिटलची नवीन इमारत, रूम्स, ऑपरेशन थिएटर, लेबर रूम आणि NICU चे फोटो.', 'Photos of the new Rayate Hospital building, rooms, operation theatre, labour room and NICU.'],
  'meta.contact.title': ['संपर्क व अपॉइंटमेंट | रायते हॉस्पिटल, नाशिक', 'Contact & Appointment | Rayate Hospital, Nashik'],
  'meta.contact.desc': ['अपॉइंटमेंट बुक करा, कॉल करा किंवा WhatsApp करा. पत्ता, OPD वेळ आणि 24/7 आपत्कालीन क्रमांक.', 'Book an appointment, call or WhatsApp us. Address, OPD timings and 24/7 emergency number.'],
  'meta.404.title': ['पान सापडले नाही | रायते हॉस्पिटल', 'Page not found | Rayate Hospital'],
  'meta.404.desc': ['हे पान उपलब्ध नाही. मुख्यपृष्ठावर जा किंवा आम्हाला कॉल करा.', 'This page is not available. Go to the home page or call us.'],
  'meta.privacy.title': ['गोपनीयता धोरण | रायते हॉस्पिटल', 'Privacy Policy | Rayate Hospital'],
  'meta.privacy.desc': ['रायते हॉस्पिटल वेबसाइटवर तुमची माहिती कशी वापरली जाते.', 'How the Rayate Hospital website uses your information.'],
  'meta.terms.title': ['अटी व शर्ती | रायते हॉस्पिटल', 'Terms of Use | Rayate Hospital'],
  'meta.terms.desc': ['रायते हॉस्पिटल वेबसाइट वापरण्याच्या अटी.', 'Terms for using the Rayate Hospital website.'],

  /* ── Global: brand, nav, buttons, aria ───────────────────────────── */
  'skip': ['मुख्य मजकुराकडे जा', 'Skip to content'],
  'brand.name': ['रायते हॉस्पिटल', 'Rayate Hospital'],
  'brand.sub': ['अँड मॅटर्निटी होम · नाशिक', '& Maternity Home · Nashik'],
  'brand.full': ['रायते हॉस्पिटल अँड मॅटर्निटी होम', 'Rayate Hospital & Maternity Home'],
  'brand.home': ['रायते हॉस्पिटल — मुख्यपृष्ठ', 'Rayate Hospital — home'],
  'tagline': ['प्रत्येक जीव मौल्यवान आहे', 'Every Life Matters'],
  'nav.home': ['मुख्यपृष्ठ', 'Home'],
  'nav.about': ['आमच्याबद्दल', 'About'],
  'nav.doctors': ['डॉक्टर', 'Doctors'],
  'nav.services': ['सेवा व सुविधा', 'Services'],
  'nav.gallery': ['गॅलरी', 'Gallery'],
  'nav.contact': ['संपर्क', 'Contact'],
  'nav.main': ['मुख्य मेनू', 'Main menu'],
  'btn.book': ['अपॉइंटमेंट घ्या', 'Book Appointment'],
  'btn.call': ['आता कॉल करा', 'Call Now'],
  'aria.menu': ['मेनू उघडा', 'Open menu'],
  'aria.close': ['बंद करा', 'Close'],
  'aria.theme': ['डार्क / लाइट मोड बदला', 'Switch dark / light mode'],
  'aria.lang': ['भाषा निवडा', 'Choose language'],
  'aria.wa': ['WhatsApp वर संदेश पाठवा', 'Message us on WhatsApp'],
  'aria.callfab': ['हॉस्पिटलला कॉल करा', 'Call the hospital'],
  'aria.fb': ['Facebook पेज (नवीन टॅबमध्ये उघडेल)', 'Facebook page (opens in a new tab)'],
  'aria.breadcrumb': ['तुम्ही इथे आहात', 'You are here'],
  'menu.title': ['मेनू', 'Menu'],
  'menu.lang': ['भाषा', 'Language'],
  'menu.theme': ['थीम', 'Theme'],

  /* ── Home: hero ──────────────────────────────────────────────────── */
  'home.hero.chip': ['15+ वर्षांचा विश्वास · नवीन वास्तू', '15+ years of trust · New premises'],
  'home.hero.title': ['<span>नाशिकमध्ये प्रत्येक</span><span>नव्या <em class="grad-text">जीवासाठी</em></span><span>विश्वासाची काळजी.</span>', '<span>Trusted care for</span><span>every new <em class="grad-text">life</em></span><span>in Nashik.</span>'],
  'home.hero.sub': ['गर्भधारणेच्या नियोजनापासून बाळाच्या पहिल्या तपासण्यांपर्यंत — अनुभवी स्त्रीरोगतज्ज्ञ आणि आयुर्वेदिक फॅमिली फिजिशियन एकाच छताखाली, आमच्या नवीन, सुसज्ज वास्तूत.', 'From planning a pregnancy to your baby\'s first check-ups — an experienced gynaecologist and an Ayurvedic family physician under one roof, in our new, fully equipped building.'],
  'home.hero.proof': ['<strong>5,000+</strong> आनंदी कुटुंबांचा विश्वास', 'Trusted by <strong>5,000+</strong> happy families'],
  'home.hero.proofsub': ['गेल्या 15 वर्षांत', 'over the last 15 years'],
  'home.hero.alt': ['रायते हॉस्पिटलची नवीन बहुमजली इमारत, नाशिक', 'The new multi-storey Rayate Hospital building in Nashik'],
  'home.hero.b1': ['24/7 आपत्कालीन सेवा', '24/7 Emergency'],
  'home.hero.b1s': ['दिवसा असो वा रात्री', 'Day or night'],
  'home.hero.b2': ['NICU / बेबी युनिट', 'NICU / Baby Unit'],
  'home.hero.b2s': ['नवजात बाळांसाठी विशेष काळजी', 'Special newborn care'],
  'home.hero.scroll': ['खाली स्क्रोल करा', 'Scroll down'],

  /* ── Home: ticker ────────────────────────────────────────────────── */
  'tick.1': ['इमर्जन्सी लिफ्ट', 'Emergency Lift'],
  'tick.2': ['आधुनिक ऑपरेशन थिएटर', 'Modern OT'],
  'tick.3': ['लेबर रूम', 'Labour Room'],
  'tick.4': ['NICU', 'NICU'],
  'tick.5': ['24/7 लॅब', '24/7 Lab'],
  'tick.6': ['डिलक्स रूम्स', 'Deluxe Rooms'],
  'tick.7': ['आयुर्वेदिक उपचार', 'Ayurveda Care'],
  'tick.8': ['कॅज्युअल्टी रूम', 'Casualty Room'],
  'tick.9': ['24/7 वैद्यकीय सेवा', '24/7 Medical Care'],
  'tick.label': ['आमच्या सुविधा', 'Our facilities'],

  /* ── Home: stats ─────────────────────────────────────────────────── */
  'stat.years': ['वर्षांची सेवा', 'Years of care'],
  'stat.deliveries': ['सुरक्षित प्रसूती', 'Safe deliveries'],
  'stat.deliveries.note': ['2010 पासून', 'since 2010'],
  'stat.care': ['तास, सातही दिवस काळजी', 'Hour care, all week'],
  'stat.doctors': ['तज्ज्ञ डॉक्टर', 'Specialist doctors'],

  /* ── Services (shared by home + services page) ───────────────────── */
  'home.svc.chip': ['आमच्या सेवा', 'Our services'],
  'home.svc.title': ['आई, बाळ आणि संपूर्ण कुटुंबासाठी काळजी', 'Care for mother, baby and the whole family'],
  'home.svc.lead': ['आधुनिक स्त्रीरोग-प्रसूतिशास्त्र आणि आयुर्वेदिक फॅमिली मेडिसिन — एकाच ठिकाणी, एकाच विश्वासाने.', 'Modern gynaecology and obstetrics alongside Ayurvedic family medicine — in one place, with one team you trust.'],
  'home.svc.all': ['सर्व सेवा पहा', 'View all services'],
  'tag.maternity': ['मातृत्व', 'Maternity'],
  'tag.gynae': ['स्त्रीरोग', 'Gynaecology'],
  'tag.newborn': ['नवजात', 'Newborn'],
  'tag.ayurveda': ['आयुर्वेद', 'Ayurveda'],
  'svc.pregnancy': ['गर्भावस्था काळजी', 'Pregnancy Care'],
  'svc.pregnancy.d': ['नियमित तपासण्या, सोनोग्राफी मार्गदर्शन, आहार सल्ला — आणि प्रत्येक महिन्यात आत्मविश्वास देणारी साथ.', 'Regular check-ups, scan guidance and nutrition advice — with steady support through every trimester.'],
  'svc.delivery': ['नॉर्मल व सिझेरियन प्रसूती', 'Normal & C-Section Delivery'],
  'svc.delivery.d': ['सुसज्ज लेबर रूम आणि ऑपरेशन थिएटरमध्ये, आई आणि बाळाच्या सुरक्षिततेला प्राधान्य देत प्रसूती.', 'Deliveries in a well-equipped labour room and OT, with the safety of mother and baby always first.'],
  'svc.highrisk': ['हाय-रिस्क गर्भावस्था', 'High-Risk Pregnancy'],
  'svc.highrisk.d': ['मधुमेह, उच्च रक्तदाब, जुळी बाळे किंवा आधीच्या गुंतागुंतीसाठी जवळून देखरेख.', 'Closer monitoring for diabetes, high blood pressure, twins or past complications.'],
  'svc.gynsurgery': ['स्त्रीरोग शस्त्रक्रिया', 'Gynaecology Surgery'],
  'svc.gynsurgery.d': ['गर्भाशय, अंडाशय व इतर स्त्रीरोग समस्यांसाठी शस्त्रक्रिया — नेहमी सविस्तर सल्ल्यानंतरच.', 'Surgery for uterine, ovarian and other gynaecological conditions — always after a clear consultation.'],
  'svc.nicu': ['NICU / नवजात शिशु काळजी', 'NICU / Newborn Care'],
  'svc.nicu.d': ['नवजात बाळांसाठी विशेष बेबी युनिट — उब, देखरेख आणि गरज पडल्यास तत्काळ मदत.', 'A dedicated baby unit — warmth, monitoring and prompt help when a newborn needs it.'],
  'svc.ayurveda': ['आयुर्वेद व फॅमिली मेडिसिन', 'Ayurveda & Family Medicine'],
  'svc.ayurveda.d': ['संपूर्ण कुटुंबासाठी आयुर्वेदिक सल्ला, जीवनशैली मार्गदर्शन आणि नेहमीच्या आजारांवर उपचार.', 'Ayurvedic consultation, lifestyle guidance and everyday care for the whole family.'],
  'svc.preconception': ['गर्भधारणापूर्व सल्ला', 'Pre-conception Counselling'],
  'svc.preconception.d': ['गर्भधारणेपूर्वी आवश्यक तपासण्या, पोषण आणि आरोग्याचे नियोजन.', 'Tests, nutrition and health planning before you conceive.'],
  'svc.postnatal': ['प्रसूतीनंतरची काळजी', 'Post-natal Care'],
  'svc.postnatal.d': ['आईची रिकव्हरी, टाके व जखमेची काळजी आणि स्तनपान मार्गदर्शन.', 'Recovery, stitch and wound care, and breastfeeding guidance for mothers.'],
  'svc.pcos': ['PCOS व मासिक पाळीच्या तक्रारी', 'PCOS & Menstrual Problems'],
  'svc.pcos.d': ['अनियमित किंवा वेदनादायी पाळी आणि PCOS साठी सविस्तर तपासणी व उपचार.', 'Assessment and treatment for irregular or painful periods and PCOS.'],
  'svc.familyplanning': ['कुटुंब नियोजन', 'Family Planning'],
  'svc.familyplanning.d': ['तुमच्या गरजेनुसार सुरक्षित पर्यायांबद्दल गोपनीय सल्ला.', 'Confidential advice on safe options that suit you.'],
  'svc.menopause': ['रजोनिवृत्ती काळजी', 'Menopause Care'],
  'svc.menopause.d': ['या बदलाच्या काळात शरीर आणि मन दोन्हींसाठी मार्गदर्शन.', 'Support for body and mind through the menopause transition.'],
  'svc.newbornfirst': ['नवजात बाळाची तपासणी', 'Newborn Check-ups'],
  'svc.newbornfirst.d': ['जन्मानंतरची तपासणी, वजन, काविळीवर देखरेख आणि लसीकरण मार्गदर्शन.', 'After-birth checks, weight, jaundice monitoring and vaccination guidance.'],
  'svc.breastfeeding': ['स्तनपान मार्गदर्शन', 'Breastfeeding Support'],
  'svc.breastfeeding.d': ['सुरुवातीच्या दिवसांत आई आणि बाळाला आत्मविश्वास देणारी प्रत्यक्ष मदत.', 'Hands-on help that builds confidence in the early days.'],
  'svc.sutika': ['सूतिका परिचर्या', 'Ayurvedic Post-natal Care'],
  'svc.sutika.d': ['प्रसूतीनंतर आईची ताकद परत मिळवण्यासाठी आयुर्वेदिक आहार आणि काळजी.', 'Ayurvedic diet and care (sutika paricharya) to help mothers regain strength.'],
  'svc.lifestyle': ['जीवनशैलीजन्य आजार', 'Lifestyle Conditions'],
  'svc.lifestyle.d': ['मधुमेह, रक्तदाब, पचन आणि सांधेदुखीसाठी आहार-विहार मार्गदर्शन.', 'Diet and routine guidance for diabetes, BP, digestion and joint pain.'],

  /* ── Doctors (shared) ────────────────────────────────────────────── */
  'home.dr.chip': ['आमचे डॉक्टर', 'Meet the doctors'],
  'home.dr.title': ['अनुभवी हात, आपुलकीचे मन', 'Experienced hands, caring hearts'],
  'home.dr.lead': ['रायते कुटुंब — दोन शाखा, एकच ध्येय: तुमच्या कुटुंबाचे आरोग्य.', 'The Rayate family — two disciplines, one goal: your family\'s health.'],
  'dr.avail': ['अपॉइंटमेंट उपलब्ध', 'Taking appointments'],
  'dr.book': ['डॉक्टरांची अपॉइंटमेंट घ्या', 'Book with Doctor'],
  'dr.profile': ['प्रोफाइल पहा', 'View profile'],
  'dr.manoj.name': ['डॉ. मनोज अशोक रायते', 'Dr. Manoj Ashok Rayate'],
  'dr.manoj.role': ['स्त्रीरोग व प्रसूतीतज्ज्ञ', 'Gynaecologist & Obstetrician'],
  'dr.manoj.short': ['15 वर्षांहून अधिक काळ नाशिकमधील मातांना शांत, काळजीपूर्वक आणि आपुलकीची प्रसूती-सेवा.', 'Over 15 years of calm, careful and personal pregnancy and childbirth care for mothers in Nashik.'],
  'dr.manoj.alt': ['डॉ. मनोज रायते यांचा फोटो', 'Photo of Dr. Manoj Rayate'],
  'dr.priya.name': ['डॉ. प्रिया मनोज रायते', 'Dr. Priya Manoj Rayate'],
  'dr.priya.role': ['फॅमिली फिजिशियन (आयुर्वेद)', 'Family Physician (Ayurveda)'],
  'dr.priya.short': ['आयुर्वेदाच्या सौम्य दृष्टिकोनातून संपूर्ण कुटुंबाच्या आरोग्याची काळजी — लहानांपासून ज्येष्ठांपर्यंत.', 'Gentle, Ayurveda-based care for the whole family — from little ones to grandparents.'],
  'dr.priya.alt': ['डॉ. प्रिया रायते यांचा फोटो', 'Photo of Dr. Priya Rayate'],

  /* ── Home: who we care for ───────────────────────────────────────── */
  'care.chip': ['आम्ही कोणाची काळजी घेतो', 'Who we care for'],
  'care.title': ['आयुष्याच्या प्रत्येक टप्प्यावर सोबत', 'With you at every stage of life'],
  'care.mothers': ['गर्भवती माता', 'Expecting Mothers'],
  'care.mothers.d': ['पहिल्या तपासणीपासून प्रसूतीपर्यंत', 'From first check-up to delivery'],
  'care.newborns': ['नवमाता व नवजात बाळे', 'New Mothers & Newborns'],
  'care.newborns.d': ['प्रसूतीनंतरची काळजी व स्तनपान मदत', 'Post-natal care & feeding support'],
  'care.women': ['महिलांचे आरोग्य', 'Women\'s Health'],
  'care.women.d': ['मासिक पाळी, PCOS, रजोनिवृत्ती', 'Periods, PCOS, menopause'],
  'care.families': ['संपूर्ण कुटुंब', 'Families'],
  'care.families.d': ['नेहमीचे आजार व आरोग्य सल्ला', 'Everyday illness & wellness advice'],
  'care.seniors': ['ज्येष्ठ नागरिक', 'Senior Care'],
  'care.seniors.d': ['सौम्य, नियमित देखरेख', 'Gentle, regular check-ups'],

  /* ── Home: maternity journey ─────────────────────────────────────── */
  'journey.chip': ['मातृत्वाचा प्रवास', 'The maternity journey'],
  'journey.title': ['नियोजनापासून पहिल्या हास्यापर्यंत', 'From planning to the first smile'],
  'journey.step': ['टप्पा', 'Step'],
  'journey.1': ['नियोजन', 'Planning'],
  'journey.1.d': ['गर्भधारणेपूर्वी तपासणी, फॉलिक ॲसिड आणि जीवनशैली सल्ला.', 'Pre-conception check-up, folic acid and lifestyle advice.'],
  'journey.2': ['गर्भावस्था', 'Pregnancy'],
  'journey.2.d': ['प्रत्येक तिमाहीत नियमित तपासण्या, सोनोग्राफी आणि आहार मार्गदर्शन.', 'Regular check-ups each trimester, scans and nutrition guidance.'],
  'journey.3': ['प्रसूती', 'Delivery'],
  'journey.3.d': ['सुसज्ज लेबर रूम व OT मध्ये तज्ज्ञांच्या देखरेखीखाली प्रसूती.', 'Delivery in an equipped labour room and OT under expert care.'],
  'journey.4': ['नवजात (NICU)', 'Newborn (NICU)'],
  'journey.4.d': ['बाळाची पहिली तपासणी आणि गरज पडल्यास NICU मध्ये विशेष काळजी.', 'Baby\'s first check, and special NICU care if needed.'],
  'journey.5': ['प्रसूतीनंतर', 'Post-natal'],
  'journey.5.d': ['आईची रिकव्हरी, स्तनपान मार्गदर्शन आणि आयुर्वेदिक सूतिका परिचर्या.', 'Recovery, breastfeeding support and Ayurvedic post-natal care.'],

  /* ── Home: testimonials (PLACEHOLDERS — replace with real reviews) ── */
  'testi.chip': ['कुटुंबांचे अनुभव', 'Family stories'],
  'testi.title': ['त्यांच्या शब्दांत', 'In their own words'],
  'testi.flag': ['[खरा अभिप्राय टाका]', '[replace with real]'],
  'testi.1': ['पहिल्या बाळंतपणाची खूप भीती वाटत होती, पण डॉक्टर आणि संपूर्ण स्टाफने प्रत्येक पायरी समजावून सांगितली. खूप आधार वाटला.', 'I was nervous about my first delivery, but the doctor and the whole staff explained every step. We felt truly supported.'],
  'testi.1.n': ['स्नेहा पाटील', 'Sneha Patil'],
  'testi.1.p': ['नाशिक रोड', 'Nashik Road'],
  'testi.2': ['रात्री अडीच वाजता तातडीने आलो, तरी लगेच उपचार सुरू झाले. नवीन हॉस्पिटल खूप स्वच्छ आणि सोयीचं आहे.', 'We came in an emergency at 2:30 am and care started right away. The new hospital is very clean and comfortable.'],
  'testi.2.n': ['राहुल देशमुख', 'Rahul Deshmukh'],
  'testi.2.p': ['सिडको', 'CIDCO'],
  'testi.3': ['डॉ. प्रिया यांच्या आयुर्वेदिक उपचारांनी आईला सांधेदुखीत चांगला आराम मिळाला. सगळं शांतपणे ऐकून घेतात.', 'Dr. Priya\'s Ayurvedic treatment brought my mother real relief from joint pain. Every concern is heard patiently.'],
  'testi.3.n': ['मंगेश कुलकर्णी', 'Mangesh Kulkarni'],
  'testi.3.p': ['पंचवटी', 'Panchavati'],
  'testi.4': ['डिलक्स रूम खूप आरामदायी होती — टीव्ही, फ्रिज सगळं होतं. घरच्यांचीही चांगली सोय झाली.', 'The deluxe room was so comfortable — TV, fridge, everything. It was easy for the family too.'],
  'testi.4.n': ['प्रियांका जाधव', 'Priyanka Jadhav'],
  'testi.4.p': ['गंगापूर रोड', 'Gangapur Road'],
  'testi.5': ['हाय-रिस्क प्रेग्नन्सी असूनही डॉ. मनोज यांनी नऊ महिने खूप काळजीपूर्वक लक्ष ठेवलं. आमची मुलगी आता छान आहे.', 'Despite a high-risk pregnancy, Dr. Manoj monitored us carefully for nine months. Our daughter is doing great.'],
  'testi.5.n': ['अश्विनी शिंदे', 'Ashwini Shinde'],
  'testi.5.p': ['सातपूर', 'Satpur'],
  'testi.6': ['बाळाला काही दिवस NICU मध्ये ठेवावं लागलं, पण नर्सिंग स्टाफने खूप मायेने काळजी घेतली.', 'Our baby needed a few days in the NICU, and the nursing staff cared for him so lovingly.'],
  'testi.6.n': ['विशाल पवार', 'Vishal Pawar'],
  'testi.6.p': ['इंदिरानगर', 'Indira Nagar'],
  'testi.stars': ['5 पैकी 5 स्टार', '5 out of 5 stars'],

  /* ── CTA band ────────────────────────────────────────────────────── */
  'cta.chip': ['अपॉइंटमेंट सुरू आहेत', 'Appointments open'],
  'cta.title': ['तुमच्या कुटुंबाची काळजी इथून सुरू होते.', 'Your family\'s care starts here.'],
  'cta.lead': ['तपासणीसाठी वेळ ठरवा किंवा थेट कॉल करा — आम्ही मदतीसाठी इथेच आहोत.', 'Book a visit or simply call us — we\'re right here to help.'],

  /* ── About page ──────────────────────────────────────────────────── */
  'about.chip': ['आमच्याबद्दल', 'About us'],
  'about.title': ['15 वर्षांची <em class="grad-text">आपुलकी</em>, नवीन वास्तूत.', '15 years of <em class="grad-text">care</em>, in a new home.'],
  'about.lead': ['रायते हॉस्पिटल अँड मॅटर्निटी होम हे कौटुंबिक रुग्णालय आहे — जिथे आधुनिक स्त्रीरोग-प्रसूती सेवा आणि आयुर्वेदिक फॅमिली मेडिसिन एकाच छताखाली मिळतात.', 'Rayate Hospital & Maternity Home is a family-run hospital where modern gynaecology and obstetrics meet Ayurvedic family medicine, under one roof.'],
  'about.story.chip': ['आमची कहाणी', 'Our story'],
  'about.story.title': ['एका छोट्या मॅटर्निटी होमपासून सुसज्ज हॉस्पिटलपर्यंत', 'From a small maternity home to a fully equipped hospital'],
  'about.story.p1': ['पंधरा वर्षांपूर्वी डॉ. मनोज आणि डॉ. प्रिया रायते यांनी एकाच विचाराने सुरुवात केली — प्रत्येक आईला आणि प्रत्येक कुटुंबाला विश्वासार्ह उपचार मिळावेत, आणि तेही घरच्यासारख्या आपुलकीने.', 'Fifteen years ago, Dr. Manoj and Dr. Priya Rayate began with one simple idea — that every mother and every family deserves care they can trust, given with the warmth of home.'],
  'about.story.p2': ['नाशिकमधील अनेक कुटुंबांनी दाखवलेल्या विश्वासामुळे आज आम्ही नवीन, बहुमजली इमारतीत आलो आहोत — इमर्जन्सी लिफ्ट, आधुनिक ऑपरेशन थिएटर, लेबर रूम, NICU आणि 24/7 लॅबसह. सुविधा वाढल्या, पण आपुलकी तीच आहे.', 'Thanks to the trust of so many Nashik families, we have now moved into a new multi-storey building — with an emergency lift, modern operation theatre, labour room, NICU and a 24/7 lab. The facilities have grown; the warmth hasn\'t changed.'],
  'about.m1': ['<strong>सुरुवात</strong> — कुटुंबासारखी काळजी देणारं छोटं मॅटर्निटी होम.', '<strong>The beginning</strong> — a small maternity home with a family feel.'],
  'about.m2': ['<strong>15+ वर्षे</strong> — नाशिकमधील अनेक कुटुंबांच्या आनंदाच्या क्षणांचे साक्षीदार.', '<strong>15+ years</strong> — part of many Nashik families\' happiest moments.'],
  'about.m3': ['<strong>आज</strong> — सर्व आधुनिक सुविधांसह नवीन बहुमजली इमारत.', '<strong>Today</strong> — a new multi-storey building with modern facilities.'],
  'about.badge': ['वर्षांचा विश्वास', 'years of trust'],
  'about.img.alt': ['रायते हॉस्पिटलच्या नवीन इमारतीचे प्रवेशद्वार', 'Entrance of the new Rayate Hospital building'],
  'about.mvv.chip': ['आम्हाला दिशा देणारे', 'What guides us'],
  'about.mvv.title': ['ध्येय, दृष्टी आणि मूल्ये', 'Mission, vision & values'],
  'about.mission': ['आमचे ध्येय', 'Our mission'],
  'about.mission.d': ['प्रत्येक आई, बाळ आणि कुटुंबाला सुरक्षित, प्रामाणिक आणि परवडणारे उपचार — आपुलकीने.', 'To give every mother, baby and family safe, honest and affordable care — with warmth.'],
  'about.vision': ['आमची दृष्टी', 'Our vision'],
  'about.vision.d': ['नाशिकमधील कुटुंबांना मनापासून विश्वास वाटेल असे मातृत्व व कौटुंबिक आरोग्य केंद्र बनणे.', 'To be a maternity and family-health centre that Nashik families trust wholeheartedly.'],
  'about.values': ['आमची मूल्ये', 'Our values'],
  'about.values.d': ['आपुलकी · प्रामाणिकपणा · स्वच्छता · सुरक्षितता · आधुनिक आणि पारंपरिक ज्ञानाचा समतोल.', 'Compassion · Honesty · Hygiene · Safety · A balance of modern and traditional medicine.'],
  'about.why.chip': ['आम्हालाच का निवडावे?', 'Why choose us'],
  'about.why.title': ['एकाच छताखाली, सगळी काळजी', 'Everything you need, under one roof'],
  'why.h.feature': ['महत्त्वाचे', 'What matters'],
  'why.h.us': ['रायते हॉस्पिटल', 'Rayate Hospital'],
  'why.h.other': ['सामान्य छोटा दवाखाना', 'Typical small clinic'],
  'why.1': ['प्रसूती व आपत्कालीन सेवा', 'Delivery & emergencies'],
  'why.1.us': ['लेबर रूम, OT आणि 24/7 वैद्यकीय सेवा एकाच ठिकाणी', 'Labour room, OT and 24/7 medical care in one place'],
  'why.1.o': ['अनेकदा दुसरीकडे पाठवावे लागते', 'Often need to be referred elsewhere'],
  'why.2': ['नवजात बाळाची काळजी', 'Newborn care'],
  'why.2.us': ['हॉस्पिटलमध्येच NICU / बेबी युनिट', 'In-house NICU / baby unit'],
  'why.2.o': ['बाळाला दुसऱ्या हॉस्पिटलमध्ये न्यावे लागू शकते', 'Baby may need to move to another hospital'],
  'why.3': ['कौटुंबिक आरोग्य', 'Family health'],
  'why.3.us': ['आयुर्वेदिक फॅमिली फिजिशियन त्याच इमारतीत', 'Ayurvedic family physician in the same building'],
  'why.3.o': ['वेगवेगळ्या ठिकाणी जावे लागते', 'Separate visits to different places'],
  'why.4': ['तपासण्या', 'Lab tests'],
  'why.4.us': ['24/7 लॅबोरेटरी', '24/7 laboratory'],
  'why.4.o': ['मर्यादित वेळेत बाहेरची लॅब', 'Outside lab with limited hours'],
  'why.5': ['राहण्याची सोय', 'Your stay'],
  'why.5.us': ['डिलक्स, स्पेशल व सेमी-स्पेशल रूम्स; डिलक्स रूममध्ये टीव्ही व फ्रिज', 'Deluxe, special & semi-special rooms; TV and fridge in deluxe rooms'],
  'why.5.o': ['मूलभूत वॉर्ड', 'Basic wards'],
  'about.gal.chip': ['एक झलक', 'A glimpse inside'],
  'about.gal.title': ['आमची नवीन वास्तू पहा', 'See our new building'],
  'about.gal.all': ['संपूर्ण गॅलरी पहा', 'View full gallery'],

  /* ── Doctors page ────────────────────────────────────────────────── */
  'drs.chip': ['आमचे डॉक्टर', 'Our doctors'],
  'drs.title': ['दोन तज्ज्ञ, <em class="grad-text">एक</em> कुटुंब.', 'Two specialists, <em class="grad-text">one</em> family.'],
  'drs.lead': ['स्त्रीरोग-प्रसूतिशास्त्र आणि आयुर्वेद — दोन्ही शाखांचे ज्ञान एकाच ठिकाणी, तुमच्या कुटुंबासाठी.', 'Gynaecology & obstetrics and Ayurveda — two disciplines in one place, for your family.'],
  'fact.qual': ['पात्रता', 'Qualifications'],
  'fact.exp': ['अनुभव', 'Experience'],
  'fact.days': ['OPD दिवस', 'OPD days'],
  'fact.time': ['OPD वेळ', 'OPD timings'],
  'fact.exp.v': ['15+ वर्षे', '15+ years'],
  'fact.exp.priya': ['12+ वर्षे', '12+ years'],
  'fact.days.v': ['सोमवार – शनिवार', 'Monday – Saturday'],
  'fact.time.manoj': ['सकाळी 10 – दुपारी 2 · संध्याकाळी 6 – रात्री 9', '10 am – 2 pm · 6 pm – 9 pm'],
  'fact.time.priya': ['सकाळी 11 – दुपारी 1 · संध्याकाळी 5 – रात्री 8', '11 am – 1 pm · 5 pm – 8 pm'],
  'drs.expertise': ['तज्ज्ञतेची क्षेत्रे', 'Areas of expertise'],
  'drs.book': ['या डॉक्टरांची अपॉइंटमेंट घ्या', 'Book appointment with this doctor'],
  'dr.manoj.bio': ['डॉ. मनोज रायते (MBBS, DGO) हे अनुभवी स्त्रीरोग व प्रसूतीतज्ज्ञ आहेत. गर्भावस्थेतील नियमित काळजी, नॉर्मल व सिझेरियन प्रसूती आणि हाय-रिस्क गर्भावस्थेचे व्यवस्थापन हे त्यांचे मुख्य कार्यक्षेत्र. प्रत्येक निर्णय आई आणि कुटुंबाला नीट समजावून, त्यांच्या सहमतीनेच घेतला जातो.', 'Dr. Manoj Rayate (MBBS, DGO) is an experienced gynaecologist and obstetrician, focused on antenatal care, normal and caesarean deliveries, and the management of high-risk pregnancies. Every decision is explained clearly and made together with the mother and her family.'],
  'dr.manoj.e1': ['गर्भावस्थेतील नियमित तपासणी व काळजी', 'Antenatal check-ups & care'],
  'dr.manoj.e2': ['नॉर्मल प्रसूती', 'Normal delivery'],
  'dr.manoj.e3': ['सिझेरियन (C-section) प्रसूती', 'Caesarean (C-section) delivery'],
  'dr.manoj.e4': ['हाय-रिस्क गर्भावस्था व्यवस्थापन', 'High-risk pregnancy management'],
  'dr.manoj.e5': ['स्त्रीरोग शस्त्रक्रिया', 'Gynaecological surgery'],
  'dr.manoj.e6': ['PCOS, पाळीच्या तक्रारी व वंध्यत्व सल्ला', 'PCOS, period problems & fertility advice'],
  'dr.manoj.e7': ['कुटुंब नियोजन', 'Family planning'],
  'dr.manoj.e8': ['रजोनिवृत्ती काळातील काळजी', 'Menopause care'],
  'dr.priya.bio': ['डॉ. प्रिया रायते (MD – आयुर्वेद) फॅमिली फिजिशियन म्हणून संपूर्ण कुटुंबाच्या आरोग्याची काळजी घेतात. आहार, दिनचर्या आणि आयुर्वेदिक उपचारांच्या मदतीने नेहमीच्या तसेच दीर्घकालीन आजारांवर सौम्य, समग्र उपचार — हा त्यांचा दृष्टिकोन.', 'Dr. Priya Rayate (MD – Ayurveda) cares for the health of the whole family as a family physician. The approach is gentle and holistic — using diet, daily routine and Ayurvedic treatment for everyday and long-term conditions.'],
  'dr.priya.e1': ['आयुर्वेदिक फॅमिली मेडिसिन', 'Ayurvedic family medicine'],
  'dr.priya.e2': ['गर्भसंस्कार व गर्भावस्थेतील आहार सल्ला', 'Garbha sanskar & pregnancy diet advice'],
  'dr.priya.e3': ['सूतिका परिचर्या (प्रसूतीनंतरची आयुर्वेदिक काळजी)', 'Sutika paricharya (Ayurvedic post-natal care)'],
  'dr.priya.e4': ['सांधेदुखी, पचन व त्वचेच्या तक्रारी', 'Joint pain, digestive & skin complaints'],
  'dr.priya.e5': ['मधुमेह, रक्तदाब — जीवनशैली मार्गदर्शन', 'Diabetes & BP — lifestyle guidance'],
  'dr.priya.e6': ['लहान मुलांचे नेहमीचे आजार', 'Common childhood illnesses'],
  'dr.priya.e7': ['ज्येष्ठ नागरिकांची नियमित काळजी', 'Regular care for seniors'],
  'dr.priya.e8': ['पंचकर्म उपचार', 'Panchakarma therapies'],

  /* ── Services page ───────────────────────────────────────────────── */
  'svcp.chip': ['सेवा व सुविधा', 'Services & facilities'],
  'svcp.title': ['आधुनिक सुविधा, <em class="grad-text">आपुलकीची</em> काळजी.', 'Modern facilities, <em class="grad-text">caring</em> hands.'],
  'svcp.lead': ['गर्भधारणेपासून कुटुंबाच्या दैनंदिन आरोग्यापर्यंत — तुम्हाला लागणारी प्रत्येक सेवा, एकाच ठिकाणी.', 'From pregnancy to your family\'s everyday health — the care you need, in one place.'],
  'svcp.list.chip': ['आमच्या सेवा', 'What we offer'],
  'svcp.list.title': ['तुमच्या गरजेनुसार सेवा निवडा', 'Find the care you need'],
  'filter.label': ['सेवा फिल्टर करा', 'Filter services'],
  'filter.all': ['सर्व', 'All'],
  'fac.chip': ['सुविधा', 'Facilities'],
  'fac.title': ['नवीन इमारतीतील सुविधा', 'Facilities in our new building'],
  'fac.lead': ['सुरक्षितता, स्वच्छता आणि आराम — प्रत्येक मजल्यावर याचा विचार करून.', 'Safety, hygiene and comfort — planned into every floor.'],
  'fac.1': ['इमर्जन्सी लिफ्ट', 'Emergency Lift'],
  'fac.1.d': ['स्ट्रेचरसह मजल्यांदरम्यान, OT व वॉर्डपर्यंत जलद पोहोच.', 'Quick stretcher access between floors, OT and wards.'],
  'fac.2': ['तज्ज्ञ सल्लागार डॉक्टर', 'Expert Consulting Doctors'],
  'fac.2.d': ['गरजेनुसार विविध विषयांतील तज्ज्ञ डॉक्टरांचा सल्ला.', 'Specialist consultants whenever your care needs them.'],
  'fac.3': ['कॅज्युअल्टी रूम', 'Casualty Room'],
  'fac.3.d': ['आपत्कालीन रुग्णांवर तातडीच्या उपचारांची सोय.', 'Ready for urgent care when emergencies arrive.'],
  'fac.4': ['मेजर ऑपरेशन थिएटर', 'Major Operation Theatre'],
  'fac.4.d': ['सिझेरियन व स्त्रीरोग शस्त्रक्रियांसाठी सुसज्ज OT.', 'Equipped for C-sections and gynaecological surgery.'],
  'fac.5': ['लेबर रूम', 'Labour Room'],
  'fac.5.d': ['स्वच्छ, शांत आणि सुरक्षित प्रसूतीसाठी सज्ज.', 'Clean, calm and prepared for safe deliveries.'],
  'fac.6': ['NICU / बेबी युनिट', 'NICU / Baby Unit'],
  'fac.6.d': ['नवजात बाळांसाठी उब आणि देखरेखीची विशेष सोय.', 'Warmth and monitoring for newborns who need extra care.'],
  'fac.7': ['डिलक्स रूम्स', 'Deluxe Rooms'],
  'fac.7.d': ['प्रत्येक रूममध्ये टीव्ही व फ्रिज — कुटुंबासाठी आरामदायी मुक्काम.', 'TV and fridge in every room — a comfortable stay for the family.'],
  'fac.8': ['स्पेशल / सेमी-स्पेशल रूम्स', 'Special / Semi-Special Rooms'],
  'fac.8.d': ['प्रत्येक गरज आणि बजेटसाठी स्वच्छ, आरामदायी पर्याय.', 'Clean, comfortable options for every need and budget.'],
  'fac.9': ['24/7 लॅबोरेटरी', '24/7 Laboratory'],
  'fac.9.d': ['दिवस-रात्र आवश्यक तपासण्यांची सोय.', 'Essential tests available round the clock.'],
  'fac.10': ['24/7 वैद्यकीय सेवा', '24/7 Medical Facility'],
  'fac.10.d': ['दिवसा असो वा रात्री, वैद्यकीय मदत नेहमी उपलब्ध.', 'Medical help available day and night.'],
  'fac.11': ['अपॉइंटमेंटनुसार तज्ज्ञ डॉक्टर', 'Expert Doctors on Appointment'],
  'fac.11.d': ['ठरलेल्या वेळेत तज्ज्ञांची भेट — कमी प्रतीक्षा.', 'Book a time with specialists and wait less.'],

  /* ── Gallery page ────────────────────────────────────────────────── */
  'gal.chip': ['गॅलरी', 'Gallery'],
  'gal.title': ['आमच्या <em class="grad-text">नवीन</em> वास्तूची सफर.', 'A tour of our <em class="grad-text">new</em> home.'],
  'gal.lead': ['इमारत, रूम्स, OT, लेबर रूम आणि NICU — एक झलक.', 'The building, rooms, OT, labour room and NICU — take a look around.'],
  'gal.note': ['आमच्या नवीन वास्तूतील काही क्षण', 'A few moments from our new building'],
  'gal.filter': ['फोटो फिल्टर करा', 'Filter photos'],
  'gal.f.building': ['इमारत', 'Building'],
  'gal.f.rooms': ['रूम्स', 'Rooms'],
  'gal.f.ot': ['OT व लेबर रूम', 'OT & Labour Room'],
  'gal.f.nicu': ['NICU', 'NICU'],
  'gal.f.events': ['कार्यक्रम', 'Events'],
  'gal.1': ['नवीन इमारत — समोरचे दृश्य', 'New building — front view'],
  'gal.2': ['मुख्य प्रवेशद्वार व रिसेप्शन', 'Main entrance & reception'],
  'gal.3': ['प्रतीक्षा कक्ष', 'Waiting lounge'],
  'gal.4': ['डिलक्स रूम', 'Deluxe room'],
  'gal.5': ['स्पेशल रूम', 'Special room'],
  'gal.6': ['सेमी-स्पेशल रूम', 'Semi-special room'],
  'gal.7': ['मेजर ऑपरेशन थिएटर', 'Major operation theatre'],
  'gal.8': ['लेबर रूम', 'Labour room'],
  'gal.9': ['NICU / बेबी युनिट', 'NICU / baby unit'],
  'gal.10': ['बाळासाठी वॉर्मर', 'Infant warmer'],
  'gal.11': ['नवीन वास्तू उद्घाटन', 'New building inauguration'],
  'gal.12': ['माता आरोग्य शिबिर', 'Mother\'s health camp'],
  'lb.label': ['फोटो पहा', 'Photo viewer'],
  'lb.prev': ['मागील फोटो', 'Previous photo'],
  'lb.next': ['पुढील फोटो', 'Next photo'],
  'lb.open': ['मोठा फोटो पहा', 'Open larger photo'],

  /* ── Contact page ────────────────────────────────────────────────── */
  'ct.chip': ['संपर्क व अपॉइंटमेंट', 'Contact & appointment'],
  'ct.title': ['चला, <em class="grad-text">भेटूया</em>.', 'Let\'s <em class="grad-text">talk</em>.'],
  'ct.lead': ['अपॉइंटमेंटसाठी फॉर्म भरा, कॉल करा किंवा WhatsApp वर संदेश पाठवा — आम्ही लवकरात लवकर उत्तर देऊ.', 'Fill in the form, give us a call or send a WhatsApp message — we\'ll get back to you soon.'],
  'ct.form.chip': ['अपॉइंटमेंट', 'Appointment'],
  'ct.form.title': ['भेटीची वेळ ठरवा', 'Book your visit'],
  'ct.call': ['कॉल करा', 'Call us'],
  'ct.wa': ['WhatsApp', 'WhatsApp'],
  'ct.wa.d': ['संदेश पाठवा — आम्ही लवकर उत्तर देऊ', 'Message us — we\'ll reply soon'],
  'ct.addr': ['पत्ता', 'Address'],
  'ct.addr.v': ['प्लॉट नं. 12, गंगापूर रोड, कॉलेज रोडजवळ, नाशिक – 422003', 'Plot No.7, near Parksyde Nest Panchavati, opposite Rasbihari International School, Panchavati, Hanuman Nagar, , Nashik, India, 422003'],
  'ct.time': ['OPD वेळ', 'OPD timings'],
  'ct.time.v': ['सोम–शनि: सकाळी 10 ते दुपारी 2 · संध्याकाळी 6 ते रात्री 9', 'Mon–Sat: 10 am – 2 pm · 6 pm – 9 pm'],
  'ct.time.e': ['आपत्कालीन सेवा: 24/7', 'Emergency: 24/7'],
  'ct.email': ['ईमेल', 'Email'],
  'ct.email.v': ['info@rayatehospital.in', 'info@rayatehospital.in'],
  'ct.emg.chip': ['24/7 आपत्कालीन', '24/7 Emergency'],
  'ct.emg.title': ['तातडीच्या वेळी थेट कॉल करा', 'In an emergency, call directly'],
  'ct.emg.d': ['फॉर्मची वाट पाहू नका — दिवसा असो वा रात्री, कधीही.', 'Don\'t wait for a form — day or night, any time.'],
  'ct.map': ['रायते हॉस्पिटल — Google नकाशा', 'Rayate Hospital on Google Maps'],
  'ct.dir': ['दिशा मिळवा', 'Get directions'],

  /* ── Appointment form ────────────────────────────────────────────── */
  'appt.chip': ['अपॉइंटमेंट सुरू आहेत', 'Appointments open'],
  'appt.title': ['अपॉइंटमेंट बुक करा', 'Book an appointment'],
  'f.name': ['रुग्णाचे नाव', 'Patient name'],
  'f.name.ph': ['पूर्ण नाव', 'Full name'],
  'f.mobile': ['मोबाईल नंबर', 'Mobile number'],
  'f.mobile.ph': ['10 अंकी मोबाईल नंबर', '10-digit mobile number'],
  'f.doctor': ['डॉक्टर', 'Doctor'],
  'f.doctor.any': ['कोणतेही / तुम्ही सुचवा', 'Any / please suggest'],
  'f.doctor.manoj': ['डॉ. मनोज रायते – स्त्रीरोग व प्रसूती', 'Dr. Manoj Rayate – Gynaecology'],
  'f.doctor.priya': ['डॉ. प्रिया रायते – आयुर्वेद व फॅमिली मेडिसिन', 'Dr. Priya Rayate – Ayurveda & Family Medicine'],
  'f.visit': ['भेटीचा प्रकार', 'Visit type'],
  'f.visit.preg': ['गर्भावस्था तपासणी', 'Pregnancy check-up'],
  'f.visit.gyn': ['स्त्रीरोग सल्ला', 'Gynae consultation'],
  'f.visit.ayu': ['आयुर्वेदिक सल्ला', 'Ayurveda consultation'],
  'f.visit.gen': ['सामान्य तपासणी', 'General'],
  'f.visit.other': ['इतर', 'Other'],
  'f.date': ['पसंतीची तारीख', 'Preferred date'],
  'f.slot': ['पसंतीची वेळ', 'Preferred time slot'],
  'f.slot.am': ['सकाळ', 'Morning'],
  'f.slot.pm': ['संध्याकाळ', 'Evening'],
  'f.msg': ['संदेश', 'Message'],
  'f.msg.ph': ['तक्रार किंवा आम्हाला माहिती असावी असे काही (ऐच्छिक)', 'Symptoms or anything we should know (optional)'],
  'f.required': ['आवश्यक', 'required'],
  'f.submit': ['WhatsApp वर विनंती पाठवा', 'Send request on WhatsApp'],
  'f.privacy': ['तुमची माहिती फक्त अपॉइंटमेंटसाठीच वापरली जाईल.', 'Your details are used only to arrange your appointment.'],
  'f.emg': ['आपत्कालीन परिस्थितीत थेट कॉल करा:', 'For emergencies, call directly:'],
  'err.name': ['कृपया रुग्णाचे नाव लिहा.', 'Please enter the patient\'s name.'],
  'err.mobile': ['कृपया 6, 7, 8 किंवा 9 ने सुरू होणारा 10 अंकी मोबाईल नंबर लिहा.', 'Please enter a valid 10-digit mobile number starting with 6–9.'],
  'err.date': ['कृपया तारीख निवडा.', 'Please choose a date.'],
  'err.past': ['मागील तारीख निवडता येणार नाही.', 'Please choose today or a later date.'],
  'err.closed': ['रविवारी OPD बंद असते — कृपया दुसरा दिवस निवडा.', 'OPD is closed on Sundays — please choose another day.'],
  'ok.title': ['धन्यवाद! तुमची विनंती तयार आहे.', 'Thank you! Your request is ready.'],
  'ok.d': ['WhatsApp उघडले आहे — फक्त संदेश पाठवा, आम्ही लवकरच वेळ निश्चित करून कळवू. WhatsApp उघडले नसल्यास खालील बटण वापरा.', 'WhatsApp has opened — just press send and we\'ll confirm your time shortly. If it didn\'t open, use the button below.'],
  'ok.again': ['पुन्हा WhatsApp उघडा', 'Open WhatsApp again'],
  'ok.new': ['नवीन विनंती', 'New request'],
  'wa.greet': ['नमस्कार, रायते हॉस्पिटल. मला अपॉइंटमेंट हवी आहे:', 'Hello Rayate Hospital, I would like to book an appointment:'],
  'wa.general': ['नमस्कार, रायते हॉस्पिटल. मला माहिती हवी आहे.', 'Hello Rayate Hospital, I have a question.'],

  /* ── Footer ──────────────────────────────────────────────────────── */
  'ft.about': ['नाशिकमधील कौटुंबिक मातृत्व व आरोग्य सेवा — 15 वर्षांहून अधिक काळ, आता नवीन वास्तूत.', 'Family-run maternity and family care in Nashik for over 15 years — now in a new building.'],
  'ft.links': ['क्विक लिंक्स', 'Quick links'],
  'ft.services': ['सेवा', 'Services'],
  'ft.contact': ['संपर्क', 'Contact'],
  'ft.fb': ['Facebook वर फॉलो करा', 'Follow us on Facebook'],
  'ft.rights': ['रायते हॉस्पिटल अँड मॅटर्निटी होम. सर्व हक्क राखीव.', 'Rayate Hospital & Maternity Home. All rights reserved.'],
  'ft.privacy': ['गोपनीयता धोरण', 'Privacy Policy'],
  'ft.terms': ['अटी व शर्ती', 'Terms of Use'],
  'ft.legal': ['कायदेशीर', 'Legal'],

  /* ── 404 ─────────────────────────────────────────────────────────── */
  'nf.title': ['अरेरे! हे पान सापडले नाही.', 'Oops! This page wasn\'t found.'],
  'nf.d': ['कदाचित लिंक बदलली असेल — पण काळजी नको, आम्ही इथेच आहोत.', 'The link may have changed — but don\'t worry, we\'re still right here.'],
  'nf.home': ['मुख्यपृष्ठावर जा', 'Go to home page'],

  /* ── Privacy & Terms (PLACEHOLDER legal copy — review before launch) ─ */
  'legal.note': ['शेवटचे अद्यतन: ऑक्टोबर 2026', 'Last updated: October 2026'],
  'pv.chip': ['गोपनीयता', 'Privacy'],
  'pv.title': ['गोपनीयता धोरण', 'Privacy Policy'],
  'pv.p1': ['ही वेबसाइट कोणतीही वैयक्तिक माहिती आमच्या सर्व्हरवर साठवत नाही. अपॉइंटमेंट फॉर्म भरल्यावर तुमची माहिती फक्त तुमच्या फोनवरील WhatsApp मध्ये संदेश म्हणून तयार होते; तो संदेश पाठवायचा की नाही, हे तुम्ही ठरवता.', 'This website does not store any personal information on our servers. When you fill in the appointment form, your details are only turned into a WhatsApp message on your own device; you decide whether to send it.'],
  'pv.p2': ['तुम्ही पाठवलेली माहिती फक्त अपॉइंटमेंट ठरवण्यासाठी आणि तुमच्या उपचारांसाठी वापरली जाते. ती कोणत्याही त्रयस्थ व्यक्तीला विकली किंवा दिली जात नाही.', 'Information you send us is used only to arrange your appointment and your care. It is never sold or shared with third parties.'],
  'pv.p3': ['तुमची भाषा व थीमची निवड लक्षात ठेवण्यासाठी वेबसाइट तुमच्या ब्राउझरमध्ये छोटी सेटिंग साठवते. नकाशा Google Maps द्वारे दाखवला जातो.', 'The website saves your language and theme choice in your browser. The map is provided by Google Maps.'],
  'tm.chip': ['अटी', 'Terms'],
  'tm.title': ['अटी व शर्ती', 'Terms of Use'],
  'tm.p1': ['या वेबसाइटवरील माहिती फक्त सर्वसाधारण माहितीसाठी आहे; ती डॉक्टरांच्या प्रत्यक्ष सल्ल्याला पर्याय नाही.', 'Information on this website is for general guidance only and is not a substitute for an in-person consultation with a doctor.'],
  'tm.p2': ['वेबसाइटवरून पाठवलेली अपॉइंटमेंट विनंती, हॉस्पिटलकडून निश्चित केल्यानंतरच पक्की मानली जाईल.', 'An appointment request sent through this website is confirmed only once the hospital replies.'],
  'tm.p3': ['आपत्कालीन परिस्थितीत फॉर्म वापरू नका — थेट हॉस्पिटलला कॉल करा.', 'In an emergency, do not use the form — call the hospital directly.'],

  /* ── Homepage v2 (new design) ────────────────────────────────────── */
  'v2.addr': ['पार्कसाईड नेस्ट, नाशिक', 'Parksyde Nest, Nashik'],
  'v2.hero.title': ['<span>प्रत्येक जीव</span><span>मौल्यवान<i class="orb-dot" aria-hidden="true"></i></span>', '<span>Every life</span><span>matters<i class="orb-dot" aria-hidden="true"></i></span>'],
  'v2.hero.note': ['<strong>आम्ही फक्त उपचार करत नाही —</strong> प्रत्येक आई आणि कुटुंबाची मनापासून काळजी घेतो.', '<strong>We don\'t just treat —</strong> we truly care for every mother and family.'],
  'v2.hero.panel': ['आधुनिक सुविधांसह', 'With modern facilities'],
  'v2.hero.panel.d': ['ऑपरेशन थिएटर, लेबर रूम, NICU आणि 24/7 लॅब — सर्व एकाच नवीन वास्तूत.', 'Operation theatre, labour room, NICU and a 24/7 lab — all in one new building.'],
  'v2.hero.alt': ['आपल्या बाळासोबत हसणारी आई', 'A smiling mother with her baby'],
  'v2.lbl.safe': ['सुरक्षित प्रसूती', 'Safe deliveries'],
  'v2.lbl.care': ['आपुलकीची काळजी', 'Caring hands'],
  'v2.lbl.nicu': ['NICU सज्ज', 'NICU ready'],
  'v2.feedback': ['प्रत्येक कुटुंबाचा अभिप्राय आम्हाला अधिक चांगले बनवतो', 'Every family\'s feedback helps us do better'],
  'v2.tour': ['नवीन वास्तू', 'New building'],
  'v2.tour.s': ['फोटो पहा', 'Take a look'],
  'v2.tour.alt': ['रायते हॉस्पिटलची नवीन इमारत', 'The new Rayate Hospital building'],
  'v2.proud': ['आम्हाला अभिमान आहे', 'Results we\'re proud of'],
  'v2.st.years': ['वर्षांचा अनुभव', 'years of experience'],
  'v2.st.docs': ['तज्ज्ञ डॉक्टर', 'specialist doctors'],
  'v2.st.care': ['आपत्कालीन सेवा', 'emergency care'],
  'v2.call': ['कॉल करा', 'Call'],
  'v2.stmt': [
    'आम्ही <strong>आधुनिक प्रसूतिशास्त्र</strong> <span class="pill-ico"><svg class="icon" aria-hidden="true"><use href="#i-stethoscope"/></svg></span> आणि <strong>आयुर्वेदाचे</strong> सौम्य ज्ञान एकत्र आणतो, जेणेकरून प्रत्येक आईला <span class="pill-ava" aria-hidden="true"><i></i><i></i><i></i></span> <strong>सुरक्षित आणि निश्चिंत</strong> वाटेल.',
    'We combine <strong>modern obstetrics</strong> <span class="pill-ico"><svg class="icon" aria-hidden="true"><use href="#i-stethoscope"/></svg></span> with the gentle wisdom of <strong>Ayurveda</strong> so every mother <span class="pill-ava" aria-hidden="true"><i></i><i></i><i></i></span> feels <strong>safe and calm.</strong>',
  ],
  'v2.stmt.sub': ['आमचे हॉस्पिटल म्हणजे <strong>विश्वासाचे ठिकाण</strong> — 15+ वर्षांचा अनुभव आणि कुटुंबांवरील प्रेमावर उभी असलेली आधुनिक वैद्यकीय सेवा.', 'Our hospital is <strong>a place of trust</strong> — modern medical care built on 15+ years of experience and love for families.'],
  'v2.more': ['आमच्याबद्दल अधिक', 'More about us'],
  'v2.svc.title': ['आमच्या<br>वैद्यकीय सेवा <small>( तुम्हाला काय मिळते )</small>', 'Our medical<br>services <small>( what you get )</small>'],
  'v2.svc.lead': ['गर्भधारणेपासून प्रसूतीपर्यंत आणि कुटुंबाच्या दैनंदिन आरोग्यापर्यंत — सर्व सेवा एकाच ठिकाणी.', 'From pregnancy and delivery to your family\'s everyday health — all in one place.'],
  'v2.svc.make': ['अपॉइंटमेंट घ्या', 'Make an appointment'],
  'v2.svc.more': ['तपशील', 'Details'],
  'v2.feat': ['पहिल्या सोनोग्राफीपासून बाळाच्या पहिल्या हास्यापर्यंत — आई आणि बाळासाठी एकच विश्वासू टीम.', 'From the first scan to the first smile — one trusted team for mother and baby.'],
  'v2.img.alt': ['बाळाला कुशीत घेतलेली आई', 'A mother holding her baby close'],
  'v2.prev': ['मागील', 'Previous'],
  'v2.next': ['पुढील', 'Next'],
  'v2.why.title': ['आम्हालाच<br>का निवडावे?', 'Why<br>choose us'],
  'v2.why.by': ['नेतृत्व: डॉ. मनोज व डॉ. प्रिया रायते', 'Led by Dr. Manoj & Dr. Priya Rayate'],
  'v2.why.alt': ['पांढऱ्या चादरीवर आई आणि बाळ', 'A mother and baby relaxing together'],
  'v2.why.adv': ['[ वैशिष्ट्ये ]', '[ Advantages ]'],
  'v2.why.tag': ['घरच्यासारखी आपुलकी', 'Feels like family'],
  'v2.adv.1': ['वर्षांचा अनुभव', 'Years of experience'],
  'v2.adv.1.d': ['15 वर्षांहून अधिक काळ नाशिकमधील कुटुंबांची सेवा — दरवर्षी अधिक चांगली.', 'Serving Nashik families for over 15 years — and getting better every year.'],
  'v2.adv.2': ['आपत्कालीन सेवा व लॅब', 'Emergency care & lab'],
  'v2.adv.2.d': ['दिवसा असो वा रात्री — कॅज्युअल्टी, लॅब आणि डॉक्टर उपलब्ध.', 'Day or night — casualty, lab and doctors on call.'],
  'v2.adv.3': ['आधुनिक सुविधा', 'Modern facilities'],
  'v2.adv.3.d': ['OT, लेबर रूम, NICU, इमर्जन्सी लिफ्ट, डिलक्स रूम्स आणि बरेच काही.', 'OT, labour room, NICU, emergency lift, deluxe rooms and more.'],
  'v2.adv.4': ['तज्ज्ञ शाखा, एक छत', 'Specialities, one roof'],
  'v2.adv.4.d': ['स्त्रीरोग-प्रसूतिशास्त्र आणि आयुर्वेदिक फॅमिली मेडिसिन.', 'Gynaecology & obstetrics plus Ayurvedic family medicine.'],
  'v2.infact': ['खरं तर:', 'In fact:'],
  'v2.infact.d': ['इथे जन्मलेलं प्रत्येक बाळ आमच्या कुटुंबाचाच भाग बनतं.', 'every baby born here becomes part of our family.'],
  'v2.lbl.ot': ['आधुनिक OT व लेबर रूम', 'Modern OT & labour room'],
  'v2.dr.photo': ['नाशिक', 'Nashik'],
  'v2.rating': ['320+ Google अभिप्रायांवर आधारित', 'Based on 320+ Google reviews'],
  'v2.cta.alt': ['नवजात बाळाच्या कपाळावर प्रेमाने ओठ टेकवणारी आई', 'A mother gently kissing her newborn'],
  'aria.top': ['पानाच्या वर जा', 'Back to top'],
  'v2.about.alt': ['बाळाच्या गालावर प्रेमाने ओठ टेकवणारी आई', 'A mother gently kissing her baby\'s cheek'],
  'v2.fac.gallery': ['सुविधांचे फोटो पहा', 'See facilities in the gallery'],
  'ft.follow': ['आम्हाला फॉलो करा', 'Follow us'],
  'v2.gal.viewall': ['सर्व फोटो पहा', 'View all photos'],
  'ct.social': ['सोशल मीडियावर भेटा', 'Find us on social media'],
  'ct.social.d': ['ताज्या बातम्या, आरोग्य टिप्स आणि हॉस्पिटलमधील कार्यक्रम', 'News, health tips and hospital events'],
  'aria.ig': ['Instagram (नवीन टॅबमध्ये उघडेल)', 'Instagram (opens in a new tab)'],
  'aria.x': ['X / Twitter (नवीन टॅबमध्ये उघडेल)', 'X / Twitter (opens in a new tab)'],
  'aria.yt': ['YouTube (नवीन टॅबमध्ये उघडेल)', 'YouTube (opens in a new tab)'],
  'v2.feet.alt': ['पाळण्यातील नवजात बाळाचे पाय', 'A newborn\'s tiny feet in a crib'],
  'v2.drs.aside': ['दोन तज्ज्ञ, एकाच छताखाली', 'Two specialists, one roof'],
  'v2.svc.aside': ['24/7 वैद्यकीय सेवा व लॅब', '24/7 medical care & lab'],
  'v2.gal.aside': ['इमारत · रूम्स · OT · NICU', 'Building · Rooms · OT · NICU'],
  'v2.fac.lead': ['सुरक्षितता, स्वच्छता आणि आराम — प्रत्येक मजल्यावर याचा विचार करून.', 'Safety, hygiene and comfort — planned into every floor.'],
  'v2.ft.big': ['रायते', 'RAYATE'],
};

/* ── Engine ────────────────────────────────────────────────────────── */

let current = 'en';

export function getLang() { return current; }

/** Translate a key into the active (or given) language. */
export function t(key, lang = current) {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang === 'en' ? 1 : 0];
}

function savedLang() {
  try {
    const v = localStorage.getItem(KEY);
    return LANGS.includes(v) ? v : null;
  } catch { return null; }
}

function setMeta(selector, value) {
  const el = document.querySelector(selector);
  if (el && value) el.setAttribute('content', value);
}

export function applyLang(lang) {
  current = LANGS.includes(lang) ? lang : 'en';
  const root = document.documentElement;
  root.lang = current;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml); // trusted strings from this file only
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });

  // Page title + meta (per page via <html data-page="…">)
  const page = root.dataset.page;
  if (page && dict[`meta.${page}.title`]) {
    document.title = t(`meta.${page}.title`);
    setMeta('meta[name="description"]', t(`meta.${page}.desc`));
    setMeta('meta[property="og:title"]', t(`meta.${page}.title`));
    setMeta('meta[property="og:description"]', t(`meta.${page}.desc`));
  }
  setMeta('meta[property="og:locale"]', current === 'mr' ? 'mr_IN' : 'en_IN');

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === current));
  });

  root.classList.remove('i18n-wait');
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: current } }));
}

export function initI18n() {
  applyLang(savedLang() || 'en');

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === current) return;
      applyLang(lang);
      try { localStorage.setItem(KEY, lang); } catch { /* storage unavailable */ }
    });
  });
}
