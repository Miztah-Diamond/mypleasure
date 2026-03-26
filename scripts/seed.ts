import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function createPlaceholder(name: string): string {
  const encoded = encodeURIComponent(name)
  return `https://placehold.co/600x600/1E1218/C4956A?text=${encoded}`
}

const products = [
  // WOMEN - Rose Toys
  {
    name: 'Rose Suction Vibrator (Classic 10-mode)',
    slug: slugify('Rose Suction Vibrator (Classic 10-mode)'),
    category: 'women',
    subcategory: 'Rose Toys',
    price: 700000,
    compare_price: 1200000,
    description: 'Experience ultimate pleasure with this medical-grade Rose suction vibrator featuring 10 customizable modes. Designed for maximum comfort and satisfaction with whisper-quiet operation and waterproof design.',
    features: ['10 suction modes', 'Whisper-quiet motor', 'Waterproof design', 'USB rechargeable', 'Medical-grade silicone'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '7.5" length, 1.5" diameter',
      howToUse: 'Apply lubricant, position over clitoris, select desired mode',
      howToClean: 'Wash with warm soapy water or toy cleaner spray, air dry',
      whatsInBox: ['Rose vibrator', 'USB charging cable', 'User manual', 'Luxury pouch']
    },
    images: [createPlaceholder('Rose%20Suction%20Vibrator')],
    badge: 'bestseller',
    stock: 30,
    featured: true,
    rating: 4.8,
    review_count: 2847
  },
  {
    name: 'Rose 2-in-1 (Suction + Tongue Licker)',
    slug: slugify('Rose 2-in-1 (Suction + Tongue Licker)'),
    category: 'women',
    subcategory: 'Rose Toys',
    price: 1200000,
    compare_price: 2500000,
    description: 'Dual-pleasure rose toy combining suction and tongue licking sensations. Features independent controls for each function, allowing you to customize your experience with 10 modes each.',
    features: ['Dual suction & tongue functions', '10 modes each function', 'Independent controls', 'Rechargeable battery', 'Waterproof design'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '8" length, 2" diameter',
      howToUse: 'Apply lubricant, select individual or combined modes, enjoy',
      howToClean: 'Wash with toy cleaner, fully waterproof for cleaning',
      whatsInBox: ['Rose 2-in-1 toy', 'USB charging cable', 'Quick start guide', 'Premium storage case']
    },
    images: [createPlaceholder('Rose%202-in-1%20Suction%20Tongue')],
    badge: 'bestseller',
    stock: 15,
    featured: true,
    rating: 4.9,
    review_count: 1923
  },
  {
    name: 'Rose + Thrusting G-Spot (Dual-End)',
    slug: slugify('Rose + Thrusting G-Spot (Dual-End)'),
    category: 'women',
    subcategory: 'Rose Toys',
    price: 1800000,
    compare_price: 3500000,
    description: 'Advanced dual-end design combining rose suction with internal thrusting for complete G-spot stimulation. Features synchronized or independent operation with 10 customizable modes.',
    features: ['Rose suction end', 'Thrusting G-spot end', 'Synchronize or alternate modes', '10 intensity levels', 'Dual motor design'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '8.5" length, dual-end design',
      howToUse: 'Use externally for suction, internally for thrusting, or both simultaneously',
      howToClean: 'Separate chambers for easy cleaning, fully waterproof',
      whatsInBox: ['Dual-end rose toy', 'USB cable', 'Instruction manual', 'Luxury carrying case']
    },
    images: [createPlaceholder('Rose%20Thrusting%20G-Spot')],
    badge: 'new',
    stock: 10,
    featured: true,
    rating: 4.7,
    review_count: 856
  },

  // WOMEN - Suction Toys
  {
    name: 'Clitoral Air Pulse Sucker',
    slug: slugify('Clitoral Air Pulse Sucker'),
    category: 'women',
    subcategory: 'Suction Toys',
    price: 900000,
    compare_price: 2000000,
    description: 'Advanced air pulse technology delivers gentle yet intense suction for targeted clitoral stimulation. Ergonomic design fits perfectly and provides hands-free operation options.',
    features: ['Advanced air pulse technology', '5 suction intensities', 'Ergonomic design', 'Whisper-quiet operation', 'USB rechargeable'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '3.5" length, 1.75" head diameter',
      howToUse: 'Apply lubricant, position over clitoris, adjust intensity as desired',
      howToClean: 'Easy removable head for thorough cleaning, waterproof',
      whatsInBox: ['Air pulse sucker', 'USB charging cable', 'User guide', 'Storage pouch']
    },
    images: [createPlaceholder('Clitoral%20Air%20Pulse%20Sucker')],
    badge: null,
    stock: 15,
    featured: true,
    rating: 4.6,
    review_count: 1245
  },
  {
    name: 'Nipple Sucker Vibrator (Pair)',
    slug: slugify('Nipple Sucker Vibrator (Pair)'),
    category: 'women',
    subcategory: 'Suction Toys',
    price: 750000,
    compare_price: 1500000,
    description: 'Dual nipple suckers with independent vibration controls. Perfect for solo play or couple activities with adjustable suction intensity and multiple vibration modes.',
    features: ['Pair of suckers', 'Independent controls', '8 vibration modes', 'Adjustable suction', 'Waterproof design'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '2" diameter suction cups',
      howToUse: 'Position on nipples, apply suction, select vibration mode',
      howToClean: 'Removable suction cups, wash separately, fully waterproof',
      whatsInBox: ['2 nipple suckers', 'Control remote', 'USB cable', 'Care guide']
    },
    images: [createPlaceholder('Nipple%20Sucker%20Vibrator%20Pair')],
    badge: null,
    stock: 10,
    featured: false,
    rating: 4.4,
    review_count: 567
  },

  // WOMEN - Vibrators
  {
    name: 'Bullet Vibrator (Mini, 10-Speed)',
    slug: slugify('Bullet Vibrator (Mini, 10-Speed)'),
    category: 'women',
    subcategory: 'Vibrators',
    price: 450000,
    compare_price: 1000000,
    description: 'Compact and discreet bullet vibrator with 10 customizable vibration speeds. Perfect for on-the-go pleasure with excellent battery life and quiet operation.',
    features: ['10 vibration speeds', 'Ultra-compact design', 'Long battery life', 'Whisper quiet', 'Waterproof'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '3" length, 0.5" diameter',
      howToUse: 'Insert or place on desired area, select vibration speed',
      howToClean: 'Wash with warm water and toy cleaner, fully waterproof',
      whatsInBox: ['Bullet vibrator', 'AAA batteries', 'User manual', 'Small storage pouch']
    },
    images: [createPlaceholder('Bullet%20Vibrator%20Mini')],
    badge: 'bestseller',
    stock: 40,
    featured: true,
    rating: 4.7,
    review_count: 3456
  },
  {
    name: 'Rabbit Vibrator (Dual G-Spot+Clit)',
    slug: slugify('Rabbit Vibrator (Dual G-Spot+Clit)'),
    category: 'women',
    subcategory: 'Vibrators',
    price: 1500000,
    compare_price: 5000000,
    description: 'Premium dual-action rabbit with simultaneous G-spot and clitoral stimulation. Features independent controls and multiple vibration patterns for ultimate pleasure customization.',
    features: ['Dual motors', 'Independent controls', '12 vibration patterns', 'G-spot and clitoral stimulation', 'Rechargeable battery'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '8" length, 2.5" insertable depth',
      howToUse: 'Apply lubricant generously, insert main shaft, position ears on clitoris',
      howToClean: 'Separate vibrating sections, wash thoroughly, waterproof',
      whatsInBox: ['Rabbit vibrator', 'USB charging cable', 'User guide', 'Luxury case']
    },
    images: [createPlaceholder('Rabbit%20Vibrator%20Dual')],
    badge: 'bestseller',
    stock: 8,
    featured: true,
    rating: 4.8,
    review_count: 2134
  },
  {
    name: 'Wand Massager (AV Stick, USB)',
    slug: slugify('Wand Massager (AV Stick, USB)'),
    category: 'women',
    subcategory: 'Vibrators',
    price: 1200000,
    compare_price: 2500000,
    description: 'Powerful wand massager with broad vibrating head for deep muscle and intimate stimulation. USB rechargeable with multiple intensity levels perfect for full-body relaxation.',
    features: ['Broad vibrating head', '8 intensity levels', 'Powerful motor', 'USB rechargeable', 'Completely waterproof'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '7.5" length, 2" head diameter',
      howToUse: 'Apply to desired area, adjust vibration intensity gradually',
      howToClean: 'Fully waterproof, wash under running water',
      whatsInBox: ['Wand massager', 'USB charging cable', 'User manual', 'Travel pouch']
    },
    images: [createPlaceholder('Wand%20Massager%20AV%20Stick')],
    badge: null,
    stock: 12,
    featured: false,
    rating: 4.5,
    review_count: 987
  },
  {
    name: 'Tongue Licking Vibrator',
    slug: slugify('Tongue Licking Vibrator'),
    category: 'women',
    subcategory: 'Vibrators',
    price: 800000,
    compare_price: 1800000,
    description: 'Realistic tongue vibrator with lifelike licking sensations and variable vibration patterns. Designed for precise clitoral stimulation with whisper-quiet operation.',
    features: ['Realistic tongue design', 'Variable vibration patterns', 'Targeted stimulation', 'Whisper quiet', 'Rechargeable battery'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '4" length, 1.5" width',
      howToUse: 'Apply lubricant, position on clitoris, select vibration pattern',
      howToClean: 'Wash with toy cleaner, fully waterproof design',
      whatsInBox: ['Tongue vibrator', 'USB cable', 'Quick start guide', 'Storage case']
    },
    images: [createPlaceholder('Tongue%20Licking%20Vibrator')],
    badge: 'new',
    stock: 15,
    featured: true,
    rating: 4.6,
    review_count: 1567
  },
  {
    name: 'G-Spot Vibrator (Curved, 10-mode)',
    slug: slugify('G-Spot Vibrator (Curved, 10-mode)'),
    category: 'women',
    subcategory: 'Vibrators',
    price: 1000000,
    compare_price: 2500000,
    description: 'Ergonomically curved vibrator with 10 modes designed specifically for G-spot stimulation. Perfect curve angle and firm base for optimal pleasure.',
    features: ['Ergonomic curve design', '10 vibration modes', 'Firm base', 'G-spot targeting', 'USB rechargeable'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '5" length, 1.25" diameter',
      howToUse: 'Apply lubricant, insert with curve upward toward G-spot',
      howToClean: 'Smooth surface for easy cleaning, fully waterproof',
      whatsInBox: ['G-spot vibrator', 'USB charging cable', 'User manual', 'Carrying pouch']
    },
    images: [createPlaceholder('G-Spot%20Vibrator%20Curved')],
    badge: null,
    stock: 10,
    featured: false,
    rating: 4.5,
    review_count: 789
  },
  {
    name: 'Thrusting Dildo Vibrator',
    slug: slugify('Thrusting Dildo Vibrator'),
    category: 'women',
    subcategory: 'Vibrators',
    price: 2000000,
    compare_price: 4000000,
    description: 'Advanced thrusting vibrator with realistic stroking motion and vibration combination. Multiple speed settings provide customizable internal stimulation.',
    features: ['Realistic thrusting motion', 'Independent vibration control', '10 speed settings', 'Dual motor system', 'Rechargeable battery'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '8" length, 1.5" diameter',
      howToUse: 'Apply lubricant generously, insert, select thrust speed and vibration',
      howToClean: 'Separate components for thorough cleaning, waterproof',
      whatsInBox: ['Thrusting vibrator', 'USB cable', 'Manual', 'Luxury case']
    },
    images: [createPlaceholder('Thrusting%20Dildo%20Vibrator')],
    badge: 'bestseller',
    stock: 8,
    featured: true,
    rating: 4.7,
    review_count: 1876
  },
  {
    name: 'Finger Vibrator (Mini Sleeve)',
    slug: slugify('Finger Vibrator (Mini Sleeve)'),
    category: 'women',
    subcategory: 'Vibrators',
    price: 400000,
    compare_price: 800000,
    description: 'Discreet finger-sized vibrator for precise stimulation control. Perfect for manual play with added vibration and easy to conceal.',
    features: ['Fits on finger', 'Ultra discreet', '5 vibration modes', 'Whisper quiet', 'Battery operated'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '1.5" length, fits all finger sizes',
      howToUse: 'Slip onto finger, select vibration mode, use for targeted stimulation',
      howToClean: 'Removable sleeve, fully waterproof',
      whatsInBox: ['Finger vibrator', 'AAA batteries', 'User guide', 'Small pouch']
    },
    images: [createPlaceholder('Finger%20Vibrator%20Mini%20Sleeve')],
    badge: null,
    stock: 20,
    featured: false,
    rating: 4.3,
    review_count: 456
  },
  {
    name: 'Egg Vibrator (Remote Control)',
    slug: slugify('Egg Vibrator (Remote Control)'),
    category: 'women',
    subcategory: 'Vibrators',
    price: 1000000,
    compare_price: 2000000,
    description: 'Compact egg vibrator with wireless remote control for hands-free enjoyment. Perfect for public or partner play with whisper-quiet performance.',
    features: ['Wireless remote control', 'Compact egg design', '12 vibration modes', 'Whisper quiet', 'Long range control'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '2.5" length, 1.5" diameter',
      howToUse: 'Insert or place on skin, use remote to control vibration patterns',
      howToClean: 'Fully waterproof, wash with toy cleaner',
      whatsInBox: ['Egg vibrator', 'Wireless remote', 'USB charging cable', 'Carrying case']
    },
    images: [createPlaceholder('Egg%20Vibrator%20Remote%20Control')],
    badge: 'new',
    stock: 12,
    featured: false,
    rating: 4.5,
    review_count: 678
  },
  {
    name: 'Panty Vibrator (App-Controlled)',
    slug: slugify('Panty Vibrator (App-Controlled)'),
    category: 'women',
    subcategory: 'Vibrators',
    price: 1500000,
    compare_price: 3000000,
    description: 'Smartphone-controlled vibrator for interactive long-distance play. Connect via Bluetooth for personalized vibration patterns and partner control features.',
    features: ['App-controlled via Bluetooth', 'Custom vibration patterns', 'Long-distance compatible', 'Wearable design', 'Privacy secured'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '2" length, 0.75" width',
      howToUse: 'Wear in panties, connect to app on smartphone, enjoy remote control',
      howToClean: 'Removable from holder, fully waterproof',
      whatsInBox: ['Panty vibrator', 'Holder clip', 'USB cable', 'App setup guide']
    },
    images: [createPlaceholder('Panty%20Vibrator%20App%20Controlled')],
    badge: 'new',
    stock: 8,
    featured: false,
    rating: 4.6,
    review_count: 543
  },
  {
    name: 'Kegel Ball Vibrator (Training)',
    slug: slugify('Kegel Ball Vibrator (Training)'),
    category: 'women',
    subcategory: 'Vibrators',
    price: 900000,
    compare_price: 1800000,
    description: 'Dual-weighted Kegel balls with gentle vibration for pelvic floor training and stimulation. Designed to enhance muscle control and increase sensitivity.',
    features: ['Weighted design', 'Vibration function', 'Pelvic floor training', 'Dual balls', 'Trainer progressive sizes'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '1.5" diameter each ball',
      howToUse: 'Insert balls, perform Kegel exercises while vibration provides feedback',
      howToClean: 'Removable from string, thoroughly washable, waterproof',
      whatsInBox: ['2 Kegel balls on string', 'Vibration control unit', 'Training guide', 'Storage bag']
    },
    images: [createPlaceholder('Kegel%20Ball%20Vibrator%20Training')],
    badge: null,
    stock: 15,
    featured: false,
    rating: 4.4,
    review_count: 345
  },
  {
    name: 'Lipstick Vibrator (Discreet)',
    slug: slugify('Lipstick Vibrator (Discreet)'),
    category: 'women',
    subcategory: 'Vibrators',
    price: 600000,
    compare_price: 1200000,
    description: 'Disguised as luxury lipstick, this discreet vibrator offers portable pleasure. Perfect for travel with sophisticated appearance and powerful performance.',
    features: ['Lipstick disguise', 'Discreet appearance', '8 vibration modes', 'Rechargeable battery', 'Travel-friendly'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '3.5" length, 1" diameter',
      howToUse: 'Apply lubricant, select vibration mode, enjoy discreet pleasure',
      howToClean: 'Wash with toy cleaner, fully waterproof',
      whatsInBox: ['Lipstick vibrator', 'USB charging cable', 'User manual', 'Luxury pouch']
    },
    images: [createPlaceholder('Lipstick%20Vibrator%20Discreet')],
    badge: 'sale',
    stock: 25,
    featured: false,
    rating: 4.5,
    review_count: 892
  },

  // MEN - Strokers
  {
    name: 'Manual Masturbation Cup',
    slug: slugify('Manual Masturbation Cup'),
    category: 'men',
    subcategory: 'Strokers',
    price: 700000,
    compare_price: 1500000,
    description: 'High-quality manual stroker cup with realistic internal texture. Designed for comfort and pleasure with easy-clean design and discreet packaging.',
    features: ['Realistic texture', 'Easy-clean design', 'Flexible material', 'Discreet packaging', 'Long-lasting durability'],
    material: 'TPE',
    details: {
      dimensions: '5" length, 2.5" diameter',
      howToUse: 'Apply lubricant inside, position, perform manual stroking motion',
      howToClean: 'Open top for easy cleaning, air dry thoroughly before storage',
      whatsInBox: ['Stroker cup', 'Water-based lubricant sample', 'User guide', 'Discreet bag']
    },
    images: [createPlaceholder('Manual%20Masturbation%20Cup')],
    badge: 'bestseller',
    stock: 25,
    featured: true,
    rating: 4.6,
    review_count: 2345
  },
  {
    name: 'Electric Auto-Thrust Masturbator Cup',
    slug: slugify('Electric Auto-Thrust Masturbator Cup'),
    category: 'men',
    subcategory: 'Auto Cups',
    price: 3500000,
    compare_price: 6500000,
    description: 'Premium automatic thrusting cup with multiple speed settings and realistic motion. Perfect for hands-free pleasure with powerful motor and ergonomic design.',
    features: ['Automatic thrusting motion', '10 speed settings', 'Hands-free operation', 'Powerful motor', 'Rechargeable battery'],
    material: 'TPE',
    details: {
      dimensions: '8" length, 2.5" diameter',
      howToUse: 'Apply lubricant, insert, select speed setting, relax and enjoy',
      howToClean: 'Removable inner sleeve, fully washable, waterproof body',
      whatsInBox: ['Auto-thrust cup', 'USB charging cable', 'Control remote', 'User manual', 'Lubricant sample']
    },
    images: [createPlaceholder('Electric%20Auto-Thrust%20Masturbator')],
    badge: 'bestseller',
    stock: 5,
    featured: true,
    rating: 4.7,
    review_count: 1234
  },
  {
    name: 'Automatic Sucking + Heating Cup (Premium)',
    slug: slugify('Automatic Sucking + Heating Cup (Premium)'),
    category: 'men',
    subcategory: 'Auto Cups',
    price: 6500000,
    compare_price: 12000000,
    description: 'Premium cup featuring dual-action automatic sucking and heating technology. Creates realistic sensations with variable intensity control for ultimate pleasure.',
    features: ['Automatic sucking action', 'Heating function', 'Variable intensity', 'Premium materials', 'Dual motor system'],
    material: 'TPE',
    details: {
      dimensions: '9" length, 2.75" diameter',
      howToUse: 'Apply lubricant, insert, activate suction and heating, select intensity',
      howToClean: 'Fully disassemblable, all parts machine-safe',
      whatsInBox: ['Premium cup', 'USB charging cable', 'Control panel', 'User manual', 'Premium pouch', 'Lubricant sample']
    },
    images: [createPlaceholder('Automatic%20Sucking%20Heating%20Cup')],
    badge: 'new',
    stock: 3,
    featured: true,
    rating: 4.8,
    review_count: 567
  },
  {
    name: 'Delay Trainer Cup (Stamina)',
    slug: slugify('Delay Trainer Cup (Stamina)'),
    category: 'men',
    subcategory: 'Strokers',
    price: 700000,
    compare_price: 1500000,
    description: 'Specially designed stroker for stamina training with graduated resistance. Helps improve control and lasting power for enhanced intimate experiences.',
    features: ['Graduated resistance', 'Stamina training design', 'Realistic texture', 'Progressive difficulty', 'Training guide included'],
    material: 'TPE',
    details: {
      dimensions: '5.5" length, 2.5" diameter',
      howToUse: 'Apply lubricant, start with low resistance, gradually increase',
      howToClean: 'Removable design for easy washing, air dry',
      whatsInBox: ['Trainer cup', 'Training guide', 'Water-based lube', 'User manual']
    },
    images: [createPlaceholder('Delay%20Trainer%20Cup%20Stamina')],
    badge: null,
    stock: 15,
    featured: false,
    rating: 4.3,
    review_count: 678
  },
  {
    name: 'Realistic Pocket Pussy (TPE)',
    slug: slugify('Realistic Pocket Pussy (TPE)'),
    category: 'men',
    subcategory: 'Strokers',
    price: 1200000,
    compare_price: 2200000,
    description: 'Ultra-realistic stroker with lifelike internal texture and anatomy design. Premium TPE material provides authentic sensation in a discreet, portable package.',
    features: ['Ultra-realistic design', 'Lifelike anatomy', 'Textured interior', 'Portable and discreet', 'Easy-clean design'],
    material: 'TPE',
    details: {
      dimensions: '5" length, 2.5" diameter',
      howToUse: 'Apply generous lubricant, insert, perform stroking motion',
      howToClean: 'Open-ended design, rinse thoroughly, air dry completely',
      whatsInBox: ['Realistic stroker', 'Water-based lubricant sample', 'User guide', 'Discreet storage bag']
    },
    images: [createPlaceholder('Realistic%20Pocket%20Pussy%20TPE')],
    badge: 'sale',
    stock: 10,
    featured: false,
    rating: 4.5,
    review_count: 1234
  },

  // MEN - Rings
  {
    name: 'Vibrating Cock Ring (Silicone, USB)',
    slug: slugify('Vibrating Cock Ring (Silicone, USB)'),
    category: 'men',
    subcategory: 'Rings',
    price: 450000,
    compare_price: 1200000,
    description: 'Stretchy silicone cock ring with powerful vibration for enhanced arousal and extended performance. Comfortable fit for all sizes with multiple vibration modes.',
    features: ['Stretchable silicone', '8 vibration modes', 'USB rechargeable', 'Waterproof design', 'Couples-friendly'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '2" inner diameter, flexible sizing',
      howToUse: 'Stretch and slide onto base of penis when relaxed, select vibration',
      howToClean: 'Wash with warm water and toy cleaner, fully waterproof',
      whatsInBox: ['Vibrating ring', 'USB charging cable', 'User manual', 'Travel case']
    },
    images: [createPlaceholder('Vibrating%20Cock%20Ring%20Silicone')],
    badge: 'bestseller',
    stock: 30,
    featured: true,
    rating: 4.5,
    review_count: 3456
  },
  {
    name: 'Rose Cock Ring Vibrator (Couples)',
    slug: slugify('Rose Cock Ring Vibrator (Couples)'),
    category: 'men',
    subcategory: 'Rings',
    price: 800000,
    compare_price: 1800000,
    description: 'Unique rose-shaped cock ring with built-in vibrator for dual pleasure during couples play. The rose portion provides external clitoral stimulation while ring enhances erection.',
    features: ['Rose vibrator attachment', 'Couples pleasure', 'Dual stimulation', '10 vibration modes', 'Rechargeable battery'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '2" ring diameter, 2" rose attachment',
      howToUse: 'Place ring at base of penis, position rose for partner stimulation',
      howToClean: 'Removable rose section, fully waterproof',
      whatsInBox: ['Rose cock ring', 'USB cable', 'Instruction manual', 'Luxury case']
    },
    images: [createPlaceholder('Rose%20Cock%20Ring%20Couples')],
    badge: 'new',
    stock: 15,
    featured: false,
    rating: 4.6,
    review_count: 789
  },

  // MEN - Pumps
  {
    name: 'Penis Pump (Manual Vacuum)',
    slug: slugify('Penis Pump (Manual Vacuum)'),
    category: 'men',
    subcategory: 'Pumps',
    price: 1500000,
    compare_price: 3000000,
    description: 'Manual vacuum penis pump for temporary enlargement and improved blood flow. Quality construction with comfortable fit and ergonomic hand grip.',
    features: ['Manual vacuum operation', 'Safe pressure gauge', 'Comfortable seal', 'Reusable design', 'Ergonomic grip'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '8" length, 2.5" diameter cylinder',
      howToUse: 'Lubricate edges, position on penis, pump handle to create vacuum',
      howToClean: 'Removable cylinder, wash thoroughly, air dry',
      whatsInBox: ['Pump cylinder', 'Hand pump', 'Pressure gauge', 'User guide', 'Storage case']
    },
    images: [createPlaceholder('Penis%20Pump%20Manual%20Vacuum')],
    badge: null,
    stock: 10,
    featured: false,
    rating: 4.4,
    review_count: 1567
  },

  // MEN - Vibrators
  {
    name: 'Prostate Massager (Vibrating)',
    slug: slugify('Prostate Massager (Vibrating)'),
    category: 'men',
    subcategory: 'Vibrators',
    price: 1200000,
    compare_price: 2500000,
    description: 'Ergonomic prostate massager with precise vibration for targeted P-spot stimulation. Safe, comfortable design for health-conscious pleasure seekers.',
    features: ['Prostate targeting design', 'Precise vibration', 'Ergonomic shape', 'Multiple modes', 'USB rechargeable'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '4" length, angled design',
      howToUse: 'Apply lubricant generously, insert with curve toward prostate, adjust vibration',
      howToClean: 'Smooth finish for easy cleaning, fully waterproof',
      whatsInBox: ['Prostate massager', 'USB cable', 'User manual', 'Lubricant sample', 'Storage bag']
    },
    images: [createPlaceholder('Prostate%20Massager%20Vibrating')],
    badge: null,
    stock: 8,
    featured: false,
    rating: 4.5,
    review_count: 456
  },
  {
    name: 'Glans Trainer Cap (Vibrating)',
    slug: slugify('Glans Trainer Cap (Vibrating)'),
    category: 'men',
    subcategory: 'Vibrators',
    price: 900000,
    compare_price: 1800000,
    description: 'Specialized glans stimulator with vibration for increased sensitivity and pleasure. Perfectly sized for safe, comfortable glans-only stimulation.',
    features: ['Glans-specific design', 'Vibration function', 'Sensitivity enhancing', 'Comfortable fit', 'Quick cleaning'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '1.5" diameter cap',
      howToUse: 'Apply lubricant, position over glans, select vibration intensity',
      howToClean: 'Simple removable design, fully waterproof',
      whatsInBox: ['Glans cap', 'Control unit', 'USB cable', 'User guide']
    },
    images: [createPlaceholder('Glans%20Trainer%20Cap%20Vibrating')],
    badge: null,
    stock: 12,
    featured: false,
    rating: 4.3,
    review_count: 345
  },

  // COUPLES
  {
    name: 'Couples Starter Bundle',
    slug: slugify('Couples Starter Bundle'),
    category: 'couples',
    subcategory: 'Bundles',
    price: 2500000,
    compare_price: 4000000,
    description: 'Complete couples pleasure bundle featuring complementary toys for mutual satisfaction. Includes vibrators, rings, and accessories for varied shared experiences.',
    features: ['Multi-product bundle', 'His and hers toys', 'Couple-friendly sizes', 'Multiple modes', 'Luxury presentation'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: 'Multiple items in bundle',
      howToUse: 'Refer to individual product guides included',
      howToClean: 'Each item individually cleanable, all waterproof',
      whatsInBox: ['Couples vibrator', 'Ring vibrator', 'Bullet vibrator', 'Lubricant 100ml', 'Toy cleaner spray', 'Storage pouch set', 'User manuals']
    },
    images: [createPlaceholder('Couples%20Starter%20Bundle')],
    badge: 'bestseller',
    stock: 10,
    featured: true,
    rating: 4.8,
    review_count: 1567
  },
  {
    name: 'Wearable Couples Vibrator (U-Shape)',
    slug: slugify('Wearable Couples Vibrator (U-Shape)'),
    category: 'couples',
    subcategory: 'Vibrators',
    price: 1800000,
    compare_price: 3500000,
    description: 'Innovative U-shaped vibrator designed for simultaneous internal and external stimulation during intercourse. Pleasure for both partners with synchronized vibration.',
    features: ['U-shape design', 'Dual pleasure points', 'Hands-free wearable', '10 vibration modes', 'Couples-focused'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: '4" width, flexible design',
      howToUse: 'Position during intercourse for simultaneous stimulation of both partners',
      howToClean: 'Flexible and durable, fully waterproof',
      whatsInBox: ['U-shape vibrator', 'USB cable', 'Couples guide', 'Storage case']
    },
    images: [createPlaceholder('Wearable%20Couples%20Vibrator%20U-Shape')],
    badge: 'new',
    stock: 8,
    featured: true,
    rating: 4.6,
    review_count: 678
  },
  {
    name: 'Remote Egg + Ring Kit',
    slug: slugify('Remote Egg + Ring Kit'),
    category: 'couples',
    subcategory: 'Kits',
    price: 1400000,
    compare_price: 2500000,
    description: 'Couple-friendly kit combining remote-controlled egg vibrator and pleasure ring. One partner controls the other for exciting interactive play.',
    features: ['Remote control egg', 'Couples ring', 'Wireless remote', 'Interactive control', 'Multiple vibration modes'],
    material: 'Medical-grade Silicone',
    details: {
      dimensions: 'Egg 2.5" length, Ring 2" diameter',
      howToUse: 'One partner inserts egg, other uses remote for interactive control',
      howToClean: 'Both items fully waterproof and cleanable',
      whatsInBox: ['Remote egg', 'Couples ring', 'Wireless remote', 'USB cable', 'User guide', 'Carrying case']
    },
    images: [createPlaceholder('Remote%20Egg%20Ring%20Kit')],
    badge: null,
    stock: 10,
    featured: false,
    rating: 4.5,
    review_count: 456
  },
  {
    name: 'BDSM Beginner Kit (10-piece)',
    slug: slugify('BDSM Beginner Kit (10-piece)'),
    category: 'couples',
    subcategory: 'Kits',
    price: 1500000,
    compare_price: 3000000,
    description: 'Safe, consensual BDSM beginner kit with essential items for couples exploring bondage and restraint. Includes educational guide for safe practices.',
    features: ['10 essential items', 'Beginner-friendly', 'Safe materials', 'Educational guide', 'Couples exploration'],
    material: 'Medical-grade Silicone & Faux Leather',
    details: {
      dimensions: 'Multiple items in kit',
      howToUse: 'Follow educational guide for safe, consensual exploration',
      howToClean: 'Item-specific cleaning instructions included',
      whatsInBox: ['Handcuffs', 'Eye mask', 'Blindfold', 'Bondage rope', 'Paddle', 'Collar', 'Restraint straps', 'Body massager', 'Guide book', 'Luxury storage case']
    },
    images: [createPlaceholder('BDSM%20Beginner%20Kit%2010-piece')],
    badge: 'bestseller',
    stock: 8,
    featured: true,
    rating: 4.6,
    review_count: 2345
  },

  // ACCESSORIES
  {
    name: 'Water-Based Lubricant (100ml)',
    slug: slugify('Water-Based Lubricant (100ml)'),
    category: 'accessories',
    subcategory: 'Lubricants',
    price: 350000,
    compare_price: 800000,
    description: 'Premium water-based lubricant safe for all toy materials. Creates smooth, natural sensations and is easy to clean up without staining.',
    features: ['Water-based formula', 'All-toy compatible', 'Long-lasting', 'Easy cleanup', 'Hypoallergenic'],
    material: 'Water-based',
    details: {
      dimensions: '100ml bottle',
      howToUse: 'Apply generously to toy or intimate areas before use',
      howToClean: 'Rinses away with warm water, no residue',
      whatsInBox: ['100ml pump bottle', 'Instruction label']
    },
    images: [createPlaceholder('Water-Based%20Lubricant%20100ml')],
    badge: null,
    stock: 40,
    featured: true,
    rating: 4.7,
    review_count: 4567
  },
  {
    name: 'Toy Cleaner Spray (100ml)',
    slug: slugify('Toy Cleaner Spray (100ml)'),
    category: 'accessories',
    subcategory: 'Cleaning',
    price: 250000,
    compare_price: 500000,
    description: 'Antibacterial toy cleaner spray for safe, effective cleaning of intimate toys. Leaves toys fresh and hygienic without harmful chemicals.',
    features: ['Antibacterial formula', 'Toy-safe ingredients', 'Quick-drying', 'Fresh scent', 'Spray bottle'],
    material: 'Antibacterial Formula',
    details: {
      dimensions: '100ml spray bottle',
      howToUse: 'Spray on toy, wipe with cloth, air dry',
      howToClean: 'For cleaning toys, not for internal use',
      whatsInBox: ['100ml spray bottle', 'Usage instructions']
    },
    images: [createPlaceholder('Toy%20Cleaner%20Spray%20100ml')],
    badge: null,
    stock: 30,
    featured: true,
    rating: 4.6,
    review_count: 2345
  }
]

async function seed() {
  console.log('🌱 Seeding database...')

  // Delete existing products
  try {
    await sql`DELETE FROM products`
    console.log('Cleared existing products')
  } catch (err) {
    console.error('Delete error:', err)
  }

  // Insert products
  for (const product of products) {
    try {
      await sql`
        INSERT INTO products (name, slug, category, subcategory, price, compare_price, description, features, material, details, images, badge, stock, featured, rating, review_count)
        VALUES (
          ${product.name}, ${product.slug}, ${product.category}, ${product.subcategory},
          ${product.price}, ${product.compare_price}, ${product.description},
          ${product.features}, ${product.material}, ${JSON.stringify(product.details)},
          ${product.images}, ${product.badge}, ${product.stock},
          ${product.featured}, ${product.rating}, ${product.review_count}
        )
      `
      console.log(`✅ ${product.name}`)
    } catch (err) {
      console.error(`Error inserting ${product.name}:`, err)
    }
  }

  console.log(`\n🎉 Seeded ${products.length} products!`)
}

seed().catch(console.error)
