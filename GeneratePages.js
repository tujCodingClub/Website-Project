const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');
const facultyNamesToDescription = {
    "Erica Adams": {
        "department": "Career Development",
        "title": "Director of Career Development"
    },
    "Karin Admiraal": {
        "department": "Academic Success",
        "title": "Adjunct Assistant Professor"
    },
    "Sunghee Ahn": {
        "department": "First Year Writing Program",
        "title": "Assistant Professor / Director of First Year Writing Program"
    },
    "Bethany Alling": {
        "department": "Yoga",
        "title": "Adjunct Instructor"
    },
    "Ada Angel": {
        "department": "Psychology",
        "title": "Associate Professor / Director of Writing Program"
    },
    "Sean Arnold": {
        "department": "First Year Writing Program",
        "title": "Adjunct Assistant Professor"
    },
    "Kuniko Ashizawa": {
        "department": "Political Science",
        "title": "Adjunct Professor"
    },
    "Mark Azzopardi": {
        "department": "Intellectual Heritage, English Literature",
        "title": "Associate Professor / Area Coordinator for Intellectual Heritage"
    },
    "Dennis Bacani": {
        "department": "Mathematics",
        "title": "Associate Professor / Area Coordinator for Mathematics"
    },
    "Trevor Ballance": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Brett A Bedard": {
        "department": "International Business Studies",
        "title": "Adjunct Professor"
    },
    "Haniyeh Bidadi": {
        "department": "Chemistry",
        "title": "Adjunct Professor"
    },
    "Laure-Helene Boudier": {
        "department": "Bridge, Economics",
        "title": "Adjunct Instructor"
    },
    "David Broekema": {
        "department": "First Year Writing Program",
        "title": "Adjunct Instructor"
    },
    "Andrew Brown": {
        "department": "First Year Writing Program",
        "title": "Adjunct Assistant Professor"
    },
    "James D.J. Brown": {
        "department": "International Affairs, Political Science",
        "title": "Professor / Advisor and Coordinator of International Affairs major"
    },
    "Rocky Burton": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Ronald Carr": {
        "department": "Communication Studies, Film & Media Arts",
        "title": "Professor / Advisor and Coordinator of Communication Studies major"
    },
    "Jeremy S. Chambers": {
        "department": "First Year Writing Program",
        "title": "Instructor"
    },
    "Sunghee Cho": {
        "department": "International Affairs / Political Science",
        "title": "Assistant Professor"
    },
    "Matthew Chozick": {
        "department": "Asian Studies",
        "title": "Adjunct Professor"
    },
    "Graham Christian": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Androniki Christodoulou": {
        "department": "Communication Studies",
        "title": "Adjunct Instructor"
    },
    "William Clark": {
        "department": "American Studies",
        "title": "Associate Professor"
    },
    "Kyle Cleveland": {
        "department": "Sociology",
        "title": "Associate Professor / ICAS Co-Director"
    },
    "Michael Thomas Cucek": {
        "department": "Asian Studies",
        "title": "Assistant Professor / Adjunct Fellow"
    },
    "Michael Cucek": {
        "department": "Japan Campus",
        "title": "Assistant Professor / Adjunct Fellow"
    },
    "Marni Cueno": {
        "department": "Biology, Psychology",
        "title": "Adjunct Assistant Professor"
    },
    "Henry Curtley": {
        "department": "Bridge, First Year Writing Program",
        "title": "Adjunct Instructor"
    },
    "Jonathan Derr": {
        "department": "First Year Writing Program",
        "title": "Adjunct Assistant Professor"
    },
    "Stephen Duran": {
        "department": "Music",
        "title": "Adjunct Assistant Professor"
    },
    "Singh Faye": {
        "department": "Critical Languages",
        "title": "Adjunct Assistant Professor"
    },
    "William Feeney": {
        "department": "Asian Studies",
        "title": "Adjunct Assistant Professor"
    },
    "Mark Fernelius": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Eric Firestone": {
        "department": "Bridge Program",
        "title": "Instructor"
    },
    "Joao Fonseca": {
        "department": "Mathematics",
        "title": "Adjunct Assistant Professor"
    },
    "Mark Ford": {
        "department": "International Business Studies",
        "title": "Adjunct Professor"
    },
    "John Foster": {
        "department": "Advertising",
        "title": "Adjunct Assistant Professor"
    },
    "Mike Fu": {
        "department": "Asian Studies",
        "title": "Adjunct Instructor"
    },
    "Shota Fujii": {
        "department": "Bridge, Asian Studies",
        "title": "Academic Advisor"
    },
    "Christopher Fujiwara": {
        "department": "Communications",
        "title": "Adjunct Assistant Professor"
    },
    "Francis Fung": {
        "department": "Career Development",
        "title": "Adjunct Professor"
    },
    "Nicholas Giarratani": {
        "department": "Bridge, Music",
        "title": "Adjunct Instructor"
    },
    "Hazel Gonzales": {
        "department": "Economics",
        "title": "Adjunct Assistant Professor"
    },
    "Prachi Gupta": {
        "department": "Economics",
        "title": "Assistant Professor"
    },
    "Erhan Selcuk Haciomeroglu": {
        "department": "Mathematics",
        "title": "Professor"
    },
    "Aquiles Hadjis Labarca": {
        "department": "Communications",
        "title": "Adjunct Assistant Professor"
    },
    "Benoit Hardy-Chartrand": {
        "department": "Int. Affairs / Political Science",
        "title": "Adjunct Assistant Professor"
    },
    "Beryl Hawkins": {
        "department": "Communications",
        "title": "Adjunct Associate Professor"
    },
    "Irene Herrera": {
        "department": "Communication Studies, Film & Media Arts",
        "title": "Associate Professor"
    },
    "Mason Coe Hester": {
        "department": "Legal Studies",
        "title": "Adjunct Assistant Professor / Senior Associate, Thomas Consultants International Co., Ltd."
    },
    "Shawn Higgins": {
        "department": "Bridge Program",
        "title": "Coordinator"
    },
    "Yuko Hishiyama": {
        "department": "Art",
        "title": "Adjunct Professor"
    },
    "May May Ho": {
        "department": "Finance, Accounting",
        "title": "Assistant Professor"
    },
    "Irina Holca": {
        "department": "Asian Studies",
        "title": "Adjunct Professor"
    },
    "Akashi Hongo": {
        "department": "International Business Studies",
        "title": "Distinguished Scholar"
    },
    "Kyle Hoover": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Sachiko Horiguchi": {
        "department": "Asian Studies, Anthropology",
        "title": "Professor / Advisor and Coordinator of Asian Studies Major"
    },
    "Leonard Horton": {
        "department": "Music",
        "title": "Professor"
    },
    "Sarah House-Liu": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Colin Hueston": {
        "department": "Bridge, First Year Writing Program",
        "title": "Adjunct Assistant Professor"
    },
    "Yoshiko Ichimura": {
        "department": "Japanese",
        "title": "Assistant Professor"
    },
    "Alberto Iniguez": {
        "department": "Economics",
        "title": "Adjunct Associate Professor"
    },
    "Sandy Ito": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Terry Joyce": {
        "department": "Psychology",
        "title": "Adjunct Associate Professor / Adjunct Professor, Temple University, Japan Campus"
    },
    "Yaeko Kabe": {
        "department": "Japanese",
        "title": "Adjunct Instructor"
    },
    "Hady George Kahy": {
        "department": "Economics, Political Economy",
        "title": "Associate Professor / Advisor and Coordinator of Economics major"
    },
    "Rio Kaieda": {
        "department": "International Business Studies",
        "title": "Adjunct Instructor"
    },
    "Masaki Kakizaki": {
        "department": "Political Science",
        "title": "Professor / Advisor and Coordinator of Political Science major"
    },
    "Priya Kansal": {
        "department": "Mathematics",
        "title": "Adjunct Assistant Professor"
    },
    "Hani Karam": {
        "department": "Computer Science",
        "title": "Assistant Professor / Coordinator of Computer Science Major"
    },
    "Jamil Karim": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Douglas Karsner": {
        "department": "Int. Affairs / Political Science",
        "title": "Distinguished Scholar"
    },
    "Haruko Kato": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Karin Keefe": {
        "department": "First Year Writing Program",
        "title": "Adjunct Instructor"
    },
    "Lawrence Kieffer": {
        "department": "International Business Studies",
        "title": "Adjunct Associate Professor"
    },
    "Jeff Kingston": {
        "department": "Asian Studies, History",
        "title": "Professor"
    },
    "Joel Kirkham": {
        "department": "Art",
        "title": "Adjunct Instructor"
    },
    "Tomoko Kiyama (Murakami)": {
        "department": "Japanese",
        "title": "Adjunct Assistant Professor"
    },
    "Kako Koshino": {
        "department": "Education",
        "title": "Adjunct Assistant Professor"
    },
    "Takayuki Kubota": {
        "department": "Art",
        "title": "Assistant Professor / Art Program Operations Manager"
    },
    "James Lambiasi": {
        "department": "Architecture",
        "title": "Adjunct Assistant Professor"
    },
    "John A. Lipartito Jr.": {
        "department": "Communication Studies",
        "title": "Assistant Professor / Esports Program Manager"
    },
    "Ian Lynam": {
        "department": "Graphic Design",
        "title": "Associate Professor"
    },
    "Deanna MacDonald": {
        "department": "Art",
        "title": "Adjunct Associate Professor"
    },
    "Yoshimi Machida": {
        "department": "Japanese",
        "title": "Adjunct Assistant Professor"
    },
    "Zane Mackin": {
        "department": "Intellectual Heritage",
        "title": "Adjunct Associate Professor"
    },
    "John Maher": {
        "department": "Linguistics",
        "title": "Adjunct Assistant Professor"
    },
    "Yuka Matsuhashi": {
        "department": "Japanese",
        "title": "Assistant Professor"
    },
    "Tatsuki Matsui": {
        "department": "",
        "title": "Japanese Major AdvisorCoordinator of Japanese and Critical Languages Program"
    },
    "Michael Mc Gehee": {
        "department": "Physics",
        "title": "Adjunct Associate Professor"
    },
    "Johnathan McCaskill": {
        "department": "First Year Writing Program",
        "title": "Adjunct Instructor"
    },
    "Eugenia Medrano": {
        "department": "General Studies, Legal Studies",
        "title": "Assistant Professor / Coordinator for General Education & General Studies"
    },
    "Thomas Meyer": {
        "department": "First Year Writing Program",
        "title": "Adjunct Instructor"
    },
    "Shayela Mian": {
        "department": "Bridge, Education",
        "title": "Adjunct Assistant Professor"
    },
    "Steven Miller": {
        "department": "Bridge Program",
        "title": "Instructor"
    },
    "Esteban Mino Avila": {
        "department": "Intellectual Heritage",
        "title": "Adjunct Assistant Professor"
    },
    "Sonia Mino Avila": {
        "department": "Mathematics",
        "title": "Adjunct Associate Professor"
    },
    "Shimpei Miyagawa": {
        "department": "Economics",
        "title": "Adjunct Instructor"
    },
    "John Mock": {
        "department": "International Business Studies",
        "title": "Assistant Professor"
    },
    "Ken Moskowitz": {
        "department": "Asian Studies",
        "title": "Adjunct Professor"
    },
    "Hiromi Murakami": {
        "department": "Political Science",
        "title": "Adjunct Assistant Professor"
    },
    "Fred Myers": {
        "department": "Int. Affairs / Political Science",
        "title": "Adjunct Assistant Professor"
    },
    "Paul Nadeau": {
        "department": "Music",
        "title": "Adjunct Professor"
    },
    "Mariko Nagai": {
        "department": "Int. Affairs / Political Science",
        "title": "Adjunct Assistant Professor"
    },
    "Fusae Namba": {
        "department": "Japanese Literature, Creative Writing",
        "title": "Director and Professor / Director of Research"
    },
    "Marco Narducci": {
        "department": "Japanese",
        "title": "Adjunct Instructor"
    },
    "Makoto Negishi": {
        "department": "Marketing",
        "title": "Assistant Professor"
    },
    "Taro Nettleton": {
        "department": "Japanese",
        "title": "Adjunct Instructor"
    },
    "Karl Neubert": {
        "department": "Art History",
        "title": "Associate Professor / Co-coordinator of Art major"
    },
    "Chieko Numata": {
        "department": "Communication Studies, Film & Media Arts",
        "title": "Associate Professor"
    },
    "Samuel Ofori": {
        "department": "Int. Affairs / Political Science",
        "title": "Adjunct Professor"
    },
    "Chiho Okada": {
        "department": "Economics",
        "title": "Adjunct Associate Professor"
    },
    "Jillian Okamoto": {
        "department": "Japanese",
        "title": "Adjunct Associate Professor"
    },
    "Yukiko Oki": {
        "department": "Bridge Program",
        "title": "Instructor"
    },
    "Yumi Okumura": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Keiko Ono": {
        "department": "Japanese",
        "title": "Adjunct Instructor"
    },
    "Ryoko Osada": {
        "department": "Political Science, Data Science",
        "title": "Adjunct Associate Professor"
    },
    "Alonso Oviedo Ceron": {
        "department": "Japanese",
        "title": "Assistant Professor"
    },
    "Christopher Parham": {
        "department": "Spanish",
        "title": "Adjunct Instructor"
    },
    "Kyohee Park": {
        "department": "Communications",
        "title": "Adjunct Assistant Professor"
    },
    "Maria Isabel Pedraza Morales": {
        "department": "Korean",
        "title": "Adjunct Associate Professor"
    },
    "Ryan Rashotte": {
        "department": "Physics",
        "title": "Adjunct Assistant Professor"
    },
    "Ashley Reed": {
        "department": "First Year Writing Program",
        "title": "Assistant Professor / Director of The Learning Center"
    },
    "Walter Roberts": {
        "department": "Art",
        "title": "Adjunct Assistant Professor"
    },
    "Patrick Rosenkjar": {
        "department": "Theater, Communications",
        "title": "Adjunct Professor"
    },
    "Lee Roser": {
        "department": "Intellectual Heritage, English Education",
        "title": "Professor"
    },
    "Sarajean Rossitto": {
        "department": "Intellectual Heritage, Religion",
        "title": "Assistant Professor"
    },
    "Louise Rouse": {
        "department": "Asian Studies",
        "title": "Adjunct Assistant Professor"
    },
    "Junko Saito": {
        "department": "Art",
        "title": "Adjunct Professor"
    },
    "Misaki Saito": {
        "department": "Japanese Linguistics",
        "title": "Associate Professor"
    },
    "Kaoru Sakurai": {
        "department": "Psychology",
        "title": "Adjunct Instructor"
    },
    "Susana Sanchez Perez": {
        "department": "Art",
        "title": "Associate Professor / Co-coordinator of Art major"
    },
    "Kazue Sasaki": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "David Satterwhite": {
        "department": "Career Development",
        "title": "Career Advisor"
    },
    "Morgan Schulz": {
        "department": "Int. Affairs / Political Science, Asian Studies",
        "title": "Adjunct Associate Professor"
    },
    "Bela Schweiger": {
        "department": "Intellectual Heritage",
        "title": "Adjunct Associate Professor"
    },
    "Jordanco Sekulovski": {
        "department": "International Business Studies",
        "title": "Adjunct Assistant Professor"
    },
    "Karen Severns": {
        "department": "Intellectual Heritage, Philosophy",
        "title": "Adjunct Associate Professor"
    },
    "Marvin Shigueiti Uehara": {
        "department": "Communication Studies",
        "title": "Adjunct Assistant Professor"
    },
    "Masako Shimizu": {
        "department": "International Business Studies",
        "title": "Adjunct Assistant Professor"
    },
    "David Sigaty": {
        "department": "Japanese",
        "title": "Adjunct Instructor"
    },
    "Robert Sinclair": {
        "department": "International Business Studies",
        "title": "Adjunct Assistant Professor"
    },
    "Dariusz Skowronski": {
        "department": "Intellectual Heritage",
        "title": "Adjunct Assistant Professor"
    },
    "Agustin Spinetto": {
        "department": "Psychology",
        "title": "Associate Professor / Advisor and Coordinator of Psychological Studies major"
    },
    "William Sposato": {
        "department": "Communications",
        "title": "Adjunct Instructor"
    },
    "Ari Staiman": {
        "department": "Political Science",
        "title": "Adjunct Instructor"
    },
    "Ira Stevens": {
        "department": "Special Topics",
        "title": "Adjunct Assistant Professor"
    },
    "Dennis Stromback": {
        "department": "Economics",
        "title": "Adjunct Instructor"
    },
    "Catherine Sudo": {
        "department": "Intellectual Heritage",
        "title": "Adjunct Assistant Professor"
    },
    "Shan Shan Sun": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "David Sussman": {
        "department": "Chinese",
        "title": "Adjunct Associate Professor"
    },
    "William J. Swinton": {
        "department": "Environmental Studies",
        "title": "Adjunct Professor"
    },
    "Nobuya Takezawa": {
        "department": "International Business Programs, Business Administration",
        "title": "Assistant Dean / MiM Program Director / Advisor and Coordinator of International Business Studies major"
    },
    "Makoto Tanaka": {
        "department": "International Business Studies",
        "title": "Adjunct Assistant Professor"
    },
    "Yasuko Taoka": {
        "department": "Economics",
        "title": "Adjunct Professor"
    },
    "Kasia Tomaszynska": {
        "department": "Intellectual Heritage, Classics",
        "title": "Associate Dean for Academic Affairs"
    },
    "F Sigmund Topor": {
        "department": "Kinesiology",
        "title": "Assistant Registrar"
    },
    "Nobuko Toyoizumi": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Patrick Tsai": {
        "department": "Japanese",
        "title": "Adjunct Instructor"
    },
    "Vasileios Tserolas": {
        "department": "Art",
        "title": "Adjunct Associate Professor"
    },
    "Mayu Tsuruya": {
        "department": "Computer Science",
        "title": "Assistant Professor"
    },
    "Colin Tyner": {
        "department": "Art",
        "title": "Adjunct Associate Professor"
    },
    "Yoshimi Valentine": {
        "department": "Asian Studies",
        "title": "Adjunct Assistant Professor"
    },
    "Yuko Van Orman": {
        "department": "Japanese",
        "title": "Adjunct Instructor"
    },
    "Kristen Wade": {
        "department": "Japanese",
        "title": "Adjunct Instructor"
    },
    "Yi Wang": {
        "department": "Yoga",
        "title": "Adjunct Instructor"
    },
    "Yuko Watabe": {
        "department": "Int. Affairs / Political Science",
        "title": "Adjunct Assistant Professor"
    },
    "Shinya B Watanabe": {
        "department": "Psychology",
        "title": "Director of Counseling / TUJ Senior Councilor"
    },
    "Shinya C Watanabe": {
        "department": "Art",
        "title": "Associate Professor"
    },
    "Darryl Wharton-Rigby": {
        "department": "Art",
        "title": "Adjunct Associate Professor"
    },
    "Kazumi Wilds": {
        "department": "Communication Studies, Film and Media Arts",
        "title": "Assistant Professor"
    },
    "Matthew Williams": {
        "department": "Art",
        "title": "Adjunct Assistant Professor"
    },
    "Mike Williams": {
        "department": "Asian Studies",
        "title": "Adjunct Assistant Professor"
    },
    "Holly Woolbright": {
        "department": "African-American Studies",
        "title": "Assistant Professor"
    },
    "Lewis Wright": {
        "department": "Yoga",
        "title": "Adjunct Instructor"
    },
    "Wei Xu": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Naomi Yamada": {
        "department": "Bridge",
        "title": "Adjunct Bridge Instructor"
    },
    "Asako Yamaguchi": {
        "department": "First Year Writing Program",
        "title": "Adjunct Assistant Professor"
    },
    "Yuko Yamamiya": {
        "department": "Japanese",
        "title": "Assistant Professor"
    },
    "Zhaocheng Zeng": {
        "department": "Psychology",
        "title": "Adjunct Professor"
    },
    "Suzi K. Zimmerman": {
        "department": "International Business Studies",
        "title": "Assistant Professor"
    }
};
const professors = [
    { name: "Erica Adams", file: "ericaadams" },
    { name: "Karin Admiraal", file: "karinadmiraal" },
    { name: "Sunghee Ahn", file: "sungheeahn" },
    { name: "Bethany Alling", file: "bethanyalling" },
    { name: "Ada Angel", file: "adaangel" },
    { name: "Sean Arnold", file: "seanarnold" },
    { name: "Kuniko Ashizawa", file: "kunikoashizawa" },
    { name: "Mark Azzopardi", file: "markazzopardi" },
    { name: "Dennis Bacani", file: "dennisbacani" },
    { name: "Trevor Ballance", file: "trevorballance" },
    { name: "Brett A Bedard", file: "brettabedard" },
    { name: "Haniyeh Bidadi", file: "haniyehbidadi" },
    { name: "Laure-Helene Boudier", file: "laure-heleneboudier" },
    { name: "David Broekema", file: "davidbroekema" },
    { name: "Andrew Brown", file: "andrewbrown" },
    { name: "James D.J. Brown", file: "jamesd.j.brown" },
    { name: "Rocky Burton", file: "rockyburton" },
    { name: "Ronald Carr", file: "ronaldcarr" },
    { name: "Jeremy S. Chambers", file: "jeremys.chambers" },
    { name: "Sunghee Cho", file: "sungheecho" },
    { name: "Matthew Chozick", file: "matthewchozick" },
    { name: "Graham Christian", file: "grahamchristian" },
    { name: "Androniki Christodoulou", file: "andronikichristodoulou" },
    { name: "William Clark", file: "williamclark" },
    { name: "Kyle Cleveland", file: "kylecleveland" },
    { name: "Michael Thomas Cucek", file: "michaelthomascucek" },
    { name: "Michael Cucek", file: "michaelcucek" },
    { name: "Marni Cueno", file: "marnicueno" },
    { name: "Henry Curtley", file: "henrycurtley" },
    { name: "Jonathan Derr", file: "jonathanderr" },
    { name: "Stephen Duran", file: "stephenduran" },
    { name: "Singh Faye", file: "singhfaye" },
    { name: "William Feeney", file: "williamfeeney" },
    { name: "Mark Fernelius", file: "markfernelius" },
    { name: "Eric Firestone", file: "ericfirestone" },
    { name: "Joao Fonseca", file: "joaofonseca" },
    { name: "Mark Ford", file: "markford" },
    { name: "John Foster", file: "johnfoster" },
    { name: "Mike Fu", file: "mikefu" },
    { name: "Shota Fujii", file: "shotafujii" },
    { name: "Christopher Fujiwara", file: "christopherfujiwara" },
    { name: "Francis Fung", file: "francisfung" },
    { name: "Nicholas Giarratani", file: "nicholasgiarratani" },
    { name: "Hazel Gonzales", file: "hazelgonzales" },
    { name: "Prachi Gupta", file: "prachigupta" },
    { name: "Erhan Selcuk Haciomeroglu", file: "erhanselcukhaciomeroglu" },
    { name: "Aquiles Hadjis Labarca", file: "aquileshadjislabarca" },
    { name: "Benoit Hardy-Chartrand", file: "benoithardy-chartrand" },
    { name: "Beryl Hawkins", file: "berylhawkins" },
    { name: "Irene Herrera", file: "ireneherrera" },
    { name: "Mason Coe Hester", file: "masoncoehester" },
    { name: "Shawn Higgins", file: "shawnhiggins" },
    { name: "Yuko Hishiyama", file: "yukohishiyama" },
    { name: "May May Ho", file: "maymayho" },
    { name: "Irina Holca", file: "irinaholca" },
    { name: "Akashi Hongo", file: "akashihongo" },
    { name: "Kyle Hoover", file: "kylehoover" },
    { name: "Sachiko Horiguchi", file: "sachikohoriguchi" },
    { name: "Leonard Horton", file: "leonardhorton" },
    { name: "Sarah House-Liu", file: "sarahhouse-liu" },
    { name: "Colin Hueston", file: "colinhueston" },
    { name: "Yoshiko Ichimura", file: "yoshikoichimura" },
    { name: "Alberto Iniguez", file: "albertoiniguez" },
    { name: "Sandy Ito", file: "sandyito" },
    { name: "Terry Joyce", file: "terryjoyce" },
    { name: "Yaeko Kabe", file: "yaekokabe" },
    { name: "Hady George Kahy", file: "hadygeorgekahy" },
    { name: "Rio Kaieda", file: "riokaieda" },
    { name: "Masaki Kakizaki", file: "masakikakizaki" },
    { name: "Priya Kansal", file: "priyakansal" },
    { name: "Hani Karam", file: "hanikaram" },
    { name: "Jamil Karim", file: "jamilkarim" },
    { name: "Douglas Karsner", file: "douglaskarsner" },
    { name: "Haruko Kato", file: "harukokato" },
    { name: "Karin Keefe", file: "karinkeefe" },
    { name: "Lawrence Kieffer", file: "lawrencekieffer" },
    { name: "Jeff Kingston", file: "jeffkingston" },
    { name: "Joel Kirkham", file: "joelkirkham" },
    { name: "Tomoko Kiyama (Murakami)", file: "tomokokiyama(murakami)" },
    { name: "Kako Koshino", file: "kakokoshino" },
    { name: "Takayuki Kubota", file: "takayukikubota" },
    { name: "James Lambiasi", file: "jameslambiasi" },
    { name: "John A. Lipartito Jr.", file: "johna.lipartitojr." },
    { name: "Ian Lynam", file: "ianlynam" },
    { name: "Deanna MacDonald", file: "deannamacdonald" },
    { name: "Yoshimi Machida", file: "yoshimimachida" },
    { name: "Zane Mackin", file: "zanemackin" },
    { name: "John Maher", file: "johnmaher" },
    { name: "Yuka Matsuhashi", file: "yukamatsuhashi" },
    { name: "Tatsuki Matsui", file: "tatsukimatsui" },
    { name: "Michael Mc Gehee", file: "michaelmcgehee" },
    { name: "Johnathan McCaskill", file: "johnathanmccaskill" },
    { name: "Eugenia Medrano", file: "eugeniamedrano" },
    { name: "Thomas Meyer", file: "thomasmeyer" },
    { name: "Shayela Mian", file: "shayelamian" },
    { name: "Steven Miller", file: "stevenmiller" },
    { name: "Esteban Mino Avila", file: "estebanminoavila" },
    { name: "Sonia Mino Avila", file: "soniaminoavila" },
    { name: "Shimpei Miyagawa", file: "shimpeimiyagawa" },
    { name: "John Mock", file: "johnmock" },
    { name: "Ken Moskowitz", file: "kenmoskowitz" },
    { name: "Hiromi Murakami", file: "hiromimurakami" },
    { name: "Fred Myers", file: "fredmyers" },
    { name: "Paul Nadeau", file: "paulnadeau" },
    { name: "Mariko Nagai", file: "marikonagai" },
    { name: "Fusae Namba", file: "fusaenamba" },
    { name: "Marco Narducci", file: "marconarducci" },
    { name: "Makoto Negishi", file: "makotonegishi" },
    { name: "Taro Nettleton", file: "taronettleton" },
    { name: "Karl Neubert", file: "karlneubert" },
    { name: "Chieko Numata", file: "chiekonumata" },
    { name: "Samuel Ofori", file: "samuelofori" },
    { name: "Chiho Okada", file: "chihookada" },
    { name: "Jillian Okamoto", file: "jillianokamoto" },
    { name: "Yukiko Oki", file: "yukikooki" },
    { name: "Yumi Okumura", file: "yumiokumura" },
    { name: "Keiko Ono", file: "keikoono" },
    { name: "Ryoko Osada", file: "ryokoosada" },
    { name: "Alonso Oviedo Ceron", file: "alonsooviedoceron" },
    { name: "Christopher Parham", file: "christopherparham" },
    { name: "Kyohee Park", file: "kyoheepark" },
    { name: "Maria Isabel Pedraza Morales", file: "mariaisabelpedrazamorales" },
    { name: "Ryan Rashotte", file: "ryanrashotte" },
    { name: "Ashley Reed", file: "ashleyreed" },
    { name: "Walter Roberts", file: "walterroberts" },
    { name: "Patrick Rosenkjar", file: "patrickrosenkjar" },
    { name: "Lee Roser", file: "leeroser" },
    { name: "Sarajean Rossitto", file: "sarajeanrossitto" },
    { name: "Louise Rouse", file: "louiserouse" },
    { name: "Junko Saito", file: "junkosaito" },
    { name: "Misaki Saito", file: "misakisaito" },
    { name: "Kaoru Sakurai", file: "kaorusakurai" },
    { name: "Susana Sanchez Perez", file: "susanasanchezperez" },
    { name: "Kazue Sasaki", file: "kazuesasaki" },
    { name: "David Satterwhite", file: "davidsatterwhite" },
    { name: "Morgan Schulz", file: "morganschulz" },
    { name: "Bela Schweiger", file: "belaschweiger" },
    { name: "Jordanco Sekulovski", file: "jordancosekulovski" },
    { name: "Karen Severns", file: "karenseverns" },
    { name: "Marvin Shigueiti Uehara", file: "marvinshigueitiuehara" },
    { name: "Masako Shimizu", file: "masakoshimizu" },
    { name: "David Sigaty", file: "davidsigaty" },
    { name: "Robert Sinclair", file: "robertsinclair" },
    { name: "Dariusz Skowronski", file: "dariuszskowronski" },
    { name: "Agustin Spinetto", file: "agustinspinetto" },
    { name: "William Sposato", file: "williamsposato" },
    { name: "Ari Staiman", file: "aristaiman" },
    { name: "Ira Stevens", file: "irastevens" },
    { name: "Dennis Stromback", file: "dennisstromback" },
    { name: "Catherine Sudo", file: "catherinesudo" },
    { name: "Shan Shan Sun", file: "shanshansun" },
    { name: "David Sussman", file: "davidsussman" },
    { name: "William J. Swinton", file: "williamj.swinton" },
    { name: "Nobuya Takezawa", file: "nobuyatakezawa" },
    { name: "Makoto Tanaka", file: "makototanaka" },
    { name: "Yasuko Taoka", file: "yasukotaoka" },
    { name: "Kasia Tomaszynska", file: "kasiatomaszynska" },
    { name: "F Sigmund Topor", file: "fsigmundtopor" },
    { name: "Nobuko Toyoizumi", file: "nobukotoyoizumi" },
    { name: "Patrick Tsai", file: "patricktsai" },
    { name: "Vasileios Tserolas", file: "vasileiostserolas" },
    { name: "Mayu Tsuruya", file: "mayutsuruya" },
    { name: "Colin Tyner", file: "colintyner" },
    { name: "Yoshimi Valentine", file: "yoshimivalentine" },
    { name: "Yuko Van Orman", file: "yukovanorman" },
    { name: "Kristen Wade", file: "kristenwade" },
    { name: "Yi Wang", file: "yiwang" },
    { name: "Yuko Watabe", file: "yukowatabe" },
    { name: "Shinya B Watanabe", file: "shinyabwatanabe" },
    { name: "Shinya C Watanabe", file: "shinyacwatanabe" },
    { name: "Darryl Wharton-Rigby", file: "darrylwharton-rigby" },
    { name: "Kazumi Wilds", file: "kazumiwilds" },
    { name: "Matthew Williams", file: "matthewwilliams" },
    { name: "Mike Williams", file: "mikewilliams" },
    { name: "Holly Woolbright", file: "hollywoolbright" },
    { name: "Lewis Wright", file: "lewiswright" },
    { name: "Wei Xu", file: "weixu" },
    { name: "Naomi Yamada", file: "naomiyamada" },
    { name: "Asako Yamaguchi", file: "asakoyamaguchi" },
    { name: "Yuko Yamamiya", file: "yukoyamamiya" },
    { name: "Zhaocheng Zeng", file: "zhaochengzeng" },
    { name: "Suzi K. Zimmerman", file: "suzik.zimmerman" },

];
for(let i = 0; i < professors.length; i++){
    const descriptionSets = facultyNamesToDescription[professors[i].name];
    console.log(descriptionSets);
    professors[i] = {name: professors[i].name, file: professors[i].file, department: descriptionSets.department, title: descriptionSets.title};
}

const templatePath = path.join(__dirname, 'professorTemplate.ejs');
const outputPath = path.join(__dirname, 'PROFS');

fs.ensureDirSync(outputPath);

fs.readFile(templatePath, 'utf8', (err, templateData) => {
    if (err) {
        console.error('Error reading the EJS template:', err);
        return;
    }

    professors.forEach((professor) => {
        ejs.renderFile(templatePath, { name: professor.name, department: professor.department, title: professor.title}, (err, html) => {
            if (err) {
                console.error(`Error rendering HTML for ${professor.name}:`, err);
                return;
            }


            const outputFilePath = path.join(outputPath, `${professor.file}.html`);
            fs.writeFile(outputFilePath, html, (err) => {
                if (err) {
                    console.error(`Error writing HTML file for ${professor.name}:`, err);
                    return;
                }

                console.log(`Generated HTML file for ${professor.name}`);
            });
        });
    });
});
