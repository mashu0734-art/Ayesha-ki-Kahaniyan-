export interface Story {
  id: number;
  title: string;
  cat: 'romance' | 'sad' | 'first';
  emoji: string;
  cover: string;
  tag: string;
  image: string;
  readTime: string;
  roman: string;
  urdu: string;
}

export const STORIES: Story[] = [
  {
    id: 1,
    title: "Tum Mere Ho",
    cat: "romance",
    emoji: "🌹",
    cover: "rose",
    tag: "Romantic • Short Story",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=85",
    roman: `Ayesha ko hamesha lagta tha ke mohabbat sirf kitabon mein hoti hai. Phir ek din library mein uski mulaqat Arham se hui. Arham ne uski kitab uthate hue muskurakar kaha, “Shayad yeh kahani aap se zyada mujhe pasand aa gayi hai.”

Ayesha hans pari. Us chhoti si mulaqat ke baad roz ek nayi baat, ek nayi muskurahat unke darmiyan jagah banane lagi.

Ek shaam Arham ne kaha, “Main wada nahi karta ke har din aasaan hoga, bas itna ke har mushkil mein tumhara saath dunga.” Ayesha ne uska haath thaam liya. Kabhi kabhi mohabbat ka sab se khoobsurat izhar bas saath nibhana hota hai.`,
    urdu: `عائشہ کو ہمیشہ لگتا تھا کہ محبت صرف کتابوں میں ہوتی ہے۔ پھر ایک دن لائبریری میں اس کی ملاقات ارحم سے ہوئی۔ ارحم نے اس کی کتاب اٹھاتے ہوئے مسکرا کر کہا، ”شاید یہ کہانی آپ سے زیادہ مجھے پسند آ گئی ہے۔“

عائشہ ہنس پڑی۔ اس چھوٹی سی ملاقات کے بعد روز ایک نئی بات، ایک نئی مسکراہٹ ان کے درمیان جگہ بنانے لگی۔

ایک شام ارحم نے کہا، ”میں وعدہ نہیں کرتا کہ ہر دن آسان ہوگا، بس اتنا کہ ہر مشکل میں تمہارا ساتھ دوں گا۔“ عائشہ نے اس کا ہاتھ تھام لیا۔ کبھی کبھی محبت کا سب سے خوبصورت اظہار بس ساتھ نبھانا ہوتا ہے۔`
  },
  {
    id: 2,
    title: "Adhoori Si Mohabbat",
    cat: "sad",
    emoji: "🌙",
    cover: "night",
    tag: "Sad Love • Emotional",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=85",
    roman: `Ayesha har shaam usi purane darakht ke neeche aati thi jahan kabhi Arham ne us se kaha tha, “Main laut kar zaroor aaunga.” Mausam badalte rahe, patte girte aur phir ugte rahe, magar Arham na aaya.

Ek din Ayesha ko uski kitab mein ek purana khat mila: “Agar kabhi main door ho jaun, to apni zindagi rok mat dena. Tumhari muskurahat meri sab se pyari yaad hai.”

Ayesha ki aankhon mein aansu thay, magar honton par halki si muskurahat bhi. Kuch mohabbatein mil kar mukammal nahi hotin; woh humein khud se mohabbat karna sikha jati hain.`,
    urdu: `عائشہ ہر شام اسی پرانے درخت کے نیچے آتی تھی جہاں کبھی ارحم نے اس سے کہا تھا، ”میں لوٹ کر ضرور آؤں گا۔“ موسم بدلتے رہے، پتے گرتے اور پھر اُگتے رہے، مگر ارحم نہ آیا۔

ایک دن عائشہ کو اس کی کتاب میں ایک پرانا خط ملا: ”اگر کبھی میں دور ہو جاؤں، تو اپنی زندگی روک مت دینا۔ تمہاری مسکراہٹ میری سب سے پیاری یاد ہے۔“

عائشہ کی آنکھوں میں آنسو تھے، مگر ہونٹوں پر ہلکی سی مسکراہٹ بھی۔ کچھ محبتیں مل کر مکمل نہیں ہوتیں؛ وہ ہمیں خود سے محبت کرنا سکھا جاتی ہیں۔`
  },
  {
    id: 3,
    title: "Pehli Baarish, Pehla Pyar",
    cat: "first",
    emoji: "🌧️",
    cover: "sunset",
    tag: "First Love • Sweet",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    roman: `Us din achanak baarish shuru ho gayi. Ayesha bus stop par khari thi jab Arham ne apni chhatri uski taraf barha di. “Aap bheeg jayengi,” usne kaha.

“Phir aap?” Ayesha ne poocha.

Arham muskura diya. “Kuch baarishein yaadgar banane ke liye hoti hain.”

Dono ek hi chhatri ke neeche ghar ki taraf chale. Raaste bhar chhoti chhoti baatein hoti rahin. Kuch mahine baad jab Arham ne pehli baar apne dil ki baat kahi, Ayesha ne hans kar jawab diya, “Mujhe usi din pata chal gaya tha—jab aap khud bheeg rahe thay.”`,
    urdu: `اس دن اچانک بارش شروع ہو گئی۔ عائشہ بس اسٹاپ پر کھڑی تھی جب ارحم نے اپنی چھتری اس کی طرف بڑھا دی۔ ”آپ بھیگ جائیں گی،“ اس نے کہا۔

”پھر آپ؟“ عائشہ نے پوچھا۔

ارحم مسکرا دیا۔ ”کچھ بارشیں یادگار بنانے کے لیے ہوتی ہیں۔“

دونوں ایک ہی چھتری کے نیچے گھر کی طرف چلے۔ راستے بھر چھوٹی چھوٹی باتیں ہوتی رہیں۔ کچھ ماہ بعد جب ارحم نے پہلی بار اپنے دل کی بات کہی، عائشہ نے ہنس کر جواب دیا، ”مجھے اسی دن پتا چل گیا تھا—جب آپ خود بھیگ رہے تھے۔“`
  },
  {
    id: 4,
    title: "Chand Aur Tum",
    cat: "romance",
    emoji: "🌙",
    cover: "rose",
    tag: "Romantic • Dreamy",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=900&q=85",
    roman: `Raat ke waqt Ayesha chhat par baith kar chand dekha karti thi. Uska dost Arham har raat usay ek hi sawal bhejta: “Aaj chand kaisa hai?”

Ayesha tasveer bhej deti aur likhti, “Khoobsurat, magar door.”

Ek raat Arham ne jawab diya, “Kuch cheezein door reh kar bhi dil ke bohat qareeb hoti hain.” Ayesha ne pehli baar mehsoos kiya ke shayad woh chand ki nahi, us shakhs ki baat kar raha tha jo har raat uske khayalon mein aa jata tha.`,
    urdu: `رات کے وقت عائشہ چھت پر بیٹھ کر چاند دیکھا کرتی تھی۔ اس کا دوست ارحم ہر رات اسے ایک ہی سوال بھیجتا: ”آج چاند کیسا ہے؟“

عائشہ تصویر بھیج دیتی اور لکھتی، ”خوبصورت، مگر دور۔“

ایک رات ارحم نے جواب دیا، ”کچھ چیزیں دور رہ کر بھی دل کے بہت قریب ہوتی ہیں۔“ عائشہ نے پہلی بار محسوس کیا کہ شاید وہ چاند کی نہیں، اس شخص کی بات کر رہا تھا جو ہر رات اس کے خیالوں میں آ جاتا تھا۔`
  },
  {
    id: 5,
    title: "Ek Khat Tumhare Naam",
    cat: "sad",
    emoji: "💌",
    cover: "book",
    tag: "Letters • Heartfelt",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=900&q=85",
    roman: `“Dear Arham, main nahi jaanti yeh khat tum tak pohnchega ya nahi. Bas itna jaanti hoon ke tumhare saath guzre lamhon ne mujhe behtar insaan banaya.”

Ayesha ne khat mor kar diary mein rakh diya. Woh ab intezar mein apni zindagi nahi guzarna chahti thi. Usne naye sapne likhe, apni pasand ki kitaabein khareedein aur doston ke saath hansna dobara seekha.

Saalon baad usay samajh aaya: kuch khat doosron ko bhejne ke liye nahi, apne dil ko azaad karne ke liye likhe jate hain.`,
    urdu: `”ارحم کے نام، میں نہیں جانتی یہ خط تم تک پہنچے گا یا نہیں۔ بس اتنا جانتی ہوں کہ تمہارے ساتھ گزرے لمحوں نے مجھے بہتر انسان بنایا۔“

عائشہ نے خط موڑ کر ڈائری میں رکھ دیا۔ وہ اب انتظار میں اپنی زندگی نہیں گزارنا چاہتی تھی۔ اس نے نئے خواب لکھے، اپنی پسند کی کتابیں خریدیں اور دوستوں کے ساتھ ہنسنا دوبارہ سیکھا۔

سالوں بعد اسے سمجھ آیا: کچھ خط دوسروں کو بھیجنے کے لیے نہیں، اپنے دل کو آزاد کرنے کے لیے لکھے جاتے ہیں۔`
  },
  {
    id: 6,
    title: "Dil Ki Dhadkan",
    cat: "first",
    emoji: "💗",
    cover: "flower",
    tag: "First Love • Cute",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=85",
    roman: `Ayesha ko class mein hamesha aakhri bench pasand thi. Lekin jab naya student, Arham, uske paas baithne laga to uski pasand badal gayi.

Arham uske notes saaf likh deta, mushkil sawal samjha deta aur har test se pehle kehta, “Tum kar logi.”

Aakhri din Ayesha ko uski kitab mein ek parchi mili: “Tumhari kamyabi dekh kar mujhe apni khushi milti hai. Shayad isi ko pasand karna kehte hain.” Ayesha ne palat kar dekha—Arham darwaze par khara muskurata raha.`,
    urdu: `عائشہ کو کلاس میں ہمیشہ آخری بینچ پسند تھی۔ لیکن جب نیا طالب علم، ارحم، اس کے پاس بیٹھنے لگا تو اس کی پسند بدل گئی۔

ارحم اس کے نوٹس صاف لکھ دیتا، مشکل سوال سمجھا دیتا اور ہر ٹیسٹ سے پہلے کہتا، ”تم کر لو گی۔“

آخری دن عائشہ کو اس کی کتاب میں ایک پرچی ملی: ”تمہاری کامیابی دیکھ کر مجھے اپنی خوشی ملتی ہے۔ شاید اسی کو پسند کرنا کہتے ہیں۔“ عائشہ نے پلٹ کر دیکھا—ارحم دروازے پر کھڑا مسکراتا رہا۔`
  },
  {
    id: 7,
    title: "Woh Jo Qareeb Tha",
    cat: "romance",
    emoji: "💞",
    cover: "rose",
    tag: "Romantic • Emotional",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85",
    roman: `Ayesha aur Arham ki dosti ek chhoti si coffee shop se shuru hui thi. Ayesha roz apni diary lekar khirki ke paas baithti, aur Arham hamesha uske liye bina poochhe hot chocolate mangwa deta. Dono ke darmiyan baatein kam aur samajh zyada thi.

Ek din Ayesha pareshan thi. Uska interview achha nahi gaya tha aur woh khud ko nakaam samajh rahi thi. Arham ne uski diary band kar ke kaha, “Ek din kharab ho sakta hai, Ayesha. Tumhari qeemat nahi.” Uski baat sun kar Ayesha ki aankhon mein aansu aa gaye.

Kuch hafton baad Ayesha ko apni pasand ki job mil gayi. Sab se pehle usne Arham ko khabar di. Arham ne muskurate hue kaha, “Mujhe pehle se yaqeen tha.” Ayesha ne uska haath thaam kar kaha, “Mujhe bhi, kyun ke tum hamesha mere saath kharay rahe.” Us din dono ko samajh aaya ke sachchi mohabbat sirf dil nahi jeetti, himmat bhi deti hai.`,
    urdu: `عائشہ اور ارحم کی دوستی ایک چھوٹے سے کافی شاپ سے شروع ہوئی تھی۔ عائشہ روز اپنی ڈائری لے کر کھڑکی کے پاس بیٹھتی، اور ارحم ہمیشہ اس کے لیے بغیر پوچھے ہاٹ چاکلیٹ منگوا دیتا۔ دونوں کے درمیان باتیں کم اور سمجھ زیادہ تھی۔

ایک دن عائشہ پریشان تھی۔ اس کا انٹرویو اچھا نہیں گیا تھا اور وہ خود کو ناکام سمجھ رہی تھی۔ ارحم نے اس کی ڈائری بند کر کے کہا، ”ایک دن خراب ہو سکتا ہے، عائشہ۔ تمہاری قدر نہیں۔“ اس کی بات سن کر عائشہ کی آنکھوں میں آنسو آ گئے۔

کچھ ہفتوں بعد عائشہ کو اپنی پسند کی نوکری مل گئی۔ سب سے پہلے اس نے ارحم کو خبر دی۔ ارحم نے مسکراتے ہوئے کہا، ”مجھے پہلے سے یقین تھا۔“ عائشہ نے اس کا ہاتھ تھام کر کہا، ”مجھے بھی، کیونکہ تم ہمیشہ میرے ساتھ کھڑے رہے۔“ اس دن دونوں کو سمجھ آیا کہ سچی محبت صرف دل نہیں جیتتی، ہمت بھی دیتی ہے۔`
  },
  {
    id: 8,
    title: "Gulab Ka Wada",
    cat: "first",
    emoji: "🌹",
    cover: "flower",
    tag: "First Love • Sweet",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85",
    roman: `Arham ne Ayesha ko pehli baar university ke garden mein dekha tha. Woh gulabon ke paudon ko pani de rahi thi aur har murjhaye phool ko ehtiyat se alag kar rahi thi. Arham ne mazaaq mein poocha, “Aap phoolon se bhi itni mohabbat karti hain?” Ayesha boli, “Jo cheez khoobsurat ho, uska khayal rakhna chahiye.”

Uske baad Arham aksar garden aane laga. Kabhi woh paudon ke liye mitti lata, kabhi Ayesha ki kitaabein utha leta. Dheere dheere dono ki dosti gehri hoti gayi, lekin Arham apne dil ki baat kehne se darta tha.

Aakhri semester ke din usne Ayesha ko ek gulab diya. “Main wada nahi karta ke zindagi hamesha gulab jaisi hogi,” usne kaha, “magar kaanton wale dinon mein bhi tumhara saath nahi chhorunga.” Ayesha ne gulab apni kitab mein rakh liya. “Phir yeh wada hum dono ka hua.”`,
    urdu: `ارحم نے عائشہ کو پہلی بار یونیورسٹی کے باغ میں دیکھا تھا۔ وہ گلابوں کے پودوں کو پانی دے رہی تھی اور ہر مرجھائے پھول کو احتیاط سے الگ کر رہی تھی۔ ارحم نے مذاق میں پوچھا، ”آپ پھولوں سے بھی اتنی محبت کرتی ہیں؟“ عائشہ بولی، ”جو چیز خوبصورت ہو، اس کا خیال رکھنا چاہیے۔“

اس کے بعد ارحم اکثر باغ آنے لگا۔ کبھی وہ پودوں کے لیے مٹی لاتا، کبھی عائشہ کی کتابیں اٹھا لیتا۔ آہستہ آہستہ دونوں کی دوستی گہری ہوتی گئی، لیکن ارحم اپنے دل کی بات کہنے سے ڈرتا تھا۔

آخری سمسٹر کے دن اس نے عائشہ کو ایک گلاب دیا۔ ”میں وعدہ نہیں کرتا کہ زندگی ہمیشہ گلاب جیسی ہوگی،“ اس نے کہا، ”مگر کانٹوں والے دنوں میں بھی تمہارا ساتھ نہیں چھوڑوں گا۔“ عائشہ نے گلاب اپنی کتاب میں رکھ لیا۔ ”پھر یہ وعدہ ہم دونوں کا ہوا۔`
  },
  {
    id: 9,
    title: "Faaslon Ke Paar",
    cat: "sad",
    emoji: "🌅",
    cover: "sunset",
    tag: "Long Distance • Heartfelt",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85",
    roman: `Arham ko kaam ke silsile mein doosre shehar jana pada. Ayesha ne station par muskurate hue usay rukhsat kiya, lekin train nazron se ojhal hui to uski aankhen bhar aayin. Dono ne faisla kiya ke chahe din kitna bhi masroof ho, raat ko ek doosre se zaroor baat karenge.

Shuru mein har raat lambi calls hoti thin. Phir kaam, thakan aur waqt ki kami darmiyan aane lagi. Ek raat Ayesha ne gusse mein keh diya, “Shayad faaslay tumhare liye aasaan hain.” Arham khamosh ho gaya, kyun ke woh bhi uski kami se roz guzarta tha.

Agli subah Ayesha ko ek voice note mila. Arham ne kaha, “Main door hoon, beparwah nahi. Main chahta hoon ke jab wapas aaun to tumhare saath aisi zindagi bana sakun jahan tumhein akela mehsoos na ho.” Ayesha ne bhi apni baat samjhai. Dono ne waqt nikalna seekha, shikayat ke bajaye sach bolna seekha. Jab Arham lauta, station par unki muskurahatein bata rahi thin ke faaslay mohabbat ko kam nahi kar sake.`,
    urdu: `ارحم کو کام کے سلسلے میں دوسرے شہر جانا پڑا۔ عائشہ نے اسٹیشن پر مسکراتے ہوئے اسے رخصت کیا، لیکن ٹرین نظروں سے اوجھل ہوئی تو اس کی آنکھیں بھر آئیں۔ دونوں نے فیصلہ کیا کہ چاہے دن کتنا بھی مصروف ہو، رات کو ایک دوسرے سے ضرور بات کریں گے۔

شروع میں ہر رات لمبی کالز ہوتی تھیں۔ پھر کام، تھکن اور وقت کی کمی درمیان آنے لگی۔ ایک رات عائشہ نے غصے میں کہہ دیا، ”شاید فاصلے تمہارے لیے آسان ہیں۔“ ارحم خاموش ہو گیا، کیونکہ وہ بھی اس کی کمی سے روز گزرتا تھا۔

اگلی صبح عائشہ کو ایک وائس نوٹ ملا۔ ارحم نے کہا، ”میں دور ہوں، بے پروا نہیں۔ میں چاہتا ہوں کہ جب واپس آؤں تو تمہارے ساتھ ایسی زندگی بنا سکوں جہاں تمہیں اکیلا محسوس نہ ہو۔“ عائشہ نے بھی اپنی بات سمجھائی۔ دونوں نے وقت نکالنا سیکھا، شکایت کے بجائے سچ بولنا سیکھا۔ جب ارحم لوٹا، اسٹیشن پر ان کی مسکراہٹیں بتا رہی تھیں کہ فاصلے محبت کو کم نہیں کر سکے۔`
  },
  {
    id: 10,
    title: "Hamesha Tumhara",
    cat: "romance",
    emoji: "💗",
    cover: "book",
    tag: "Romantic • Happy Ending",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=85",
    roman: `Ayesha aur Arham ne apni zindagi ke kai mausam saath dekhe thay. Unki mohabbat kisi film jaisi nahi thi; kabhi bills ki fikr, kabhi ghar ke kaam, kabhi chhoti si narazgi. Magar har raat sone se pehle dono ek doosre se poochte, “Aaj tumhara din kaisa tha?”

Ek din Ayesha ko laga ke rozmarrah ki masroofiyat mein unki pehli wali romaniyat kahin kho gayi hai. Arham ne uski baat suni aur agle jumay ko dono ke liye ek chhota sa surprise rakha: wohi purani coffee shop, wohi khirki wali mez aur do garam cups.

Mez par ek lifafa tha. Andar Arham ka khat tha: “Ayesha, main tumse sirf un dinon mein mohabbat nahi karta jab tum hasti ho. Main tumse un dinon mein bhi mohabbat karta hoon jab tum thak jati ho, pareshan hoti ho ya khamosh rehti ho. Main har naye din tumhein dobara chunna chahta hoon.” Ayesha ne khat se nazar uthai aur usay gale laga liya. Unki kahani ka khubsurat raaz yahi tha: hamesha ka wada roz ke chhote chhote faislon se poora hota hai.`,
    urdu: `عائشہ اور ارحم نے اپنی زندگی کے کئی موسم ساتھ دیکھے تھے۔ ان کی محبت کسی فلم جیسی نہیں تھی؛ کبھی بلوں کی فکر، کبھی گھر کے کام، کبھی چھوٹی سی ناراضی۔ مگر ہر رات سونے سے پہلے دونوں ایک دوسرے سے پوچھتے، ”آج تمہارا دن کیسا تھا؟“

ایک دن عائشہ کو لگا کہ روزمرہ کی مصروفیت میں ان کی پہلی والی رومانویت کہیں کھو گئی ہے۔ ارحم نے اس کی بات سنی اور اگلے جمعے کو دونوں کے لیے ایک چھوٹا سا سرپرائز رکھا: وہی پرانا کافی شاپ، وہی کھڑکی والی میز اور دو گرم کپ۔

میز پر ایک لفافہ تھا۔ اندر ارحم کا خط تھا: ”ارحم کا خط: عائشہ، میں تم سے صرف ان دنوں میں محبت نہیں کرتا جب تم ہنستی ہو۔ میں تم سے ان دنوں میں بھی محبت کرتا ہوں جب تم تھک جاتی ہو، پریشان ہوتی ہو یا خاموش رہتی ہو۔ میں ہر نئے دن تمہیں دوبارہ چننا چاہتا ہوں۔“ عائشہ نے خط سے نظر اٹھائی اور اسے گلے لگا لیا۔ ان کی کہانی کا خوبصورت راز یہی تھا: ہمیشہ کا وعدہ روز کے چھوٹے چھوٹے فیصلوں سے پورا ہوتا ہے۔`
  }
];
