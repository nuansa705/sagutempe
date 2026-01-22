'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState, useRef, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { ShoppingCart, Star, Award, Shield, Clock, MapPin, Phone, Mail, Facebook, Instagram, Globe, ChevronDown, Volume2, MessageCircle, Volume, VolumeX, Headphones } from 'lucide-react'

const translations = {
  id: {
    nav: { home: 'Beranda', products: 'Produk', about: 'Tentang', faq: 'FAQ', contact: 'Kontak' },
    hero: {
      title: 'Renyah, Sehat, dan Nikmat!',
      subtitle: 'Cemilan Sagu Tempe Asli Indonesia dengan Perpaduan Rasa Tradisional yang Menggugah Selera',
      cta: 'Pesan Sekarang',
      tagline: '100% Halal • BPOM Certified • Tanpa Pengawet'
    },
    products: {
      title: 'Produk Kami',
      subtitle: 'Pilihan cemilan sagu tempe terbaik dengan kualitas premium',
      items: [
        { name: 'Sagu Tempe Original', description: 'Rasa klasik sagu tempe dengan keju alami dan rempah pilihan. Renyah di luar, lembut di dalam.', features: ['Rasa Otentik', '100% Bahan Alami', 'Tanpa Pengawet'] },
        { name: 'Sagu Tempe Keju', description: 'Perpaduan sagu tempe dengan keju premium yang melimpah. Pilihan favorit keluarga!', features: ['Keju Premium', 'Protein Tinggi', 'Rasa Gurih'] },
        { name: 'Sagu Tempe Pedas Manis', description: 'Kombinasi sempurna pedas dan manis dengan bumbu rahasia yang bikin ketagihan.', features: ['Pedas Nikmat', 'Bumbu Spesial', '100% Alami'] },
        { name: 'Sagu Tempe Bawang', description: 'Aroma bawang yang menggoda dengan cita rasa gurih yang tak tertahankan.', features: ['Aroma Bawang', 'Rasa Gurih', 'Tanpa MSG'] }
      ]
    },
    about: {
      title: 'Tentang Kami',
      subtitle: 'Mengenal Sagu Tempe Lebih Dekat',
      story: 'Sagu Tempe adalah cemilan tradisional Indonesia yang dibuat dengan mencampur tepung sagu dan tempe yang dihaluskan, kemudian digoreng hingga keemasan. Warisan kuliner nusantara yang telah turun-temurun.',
      benefits: {
        items: [
          { title: 'Protein Tinggi', description: 'Tempe adalah sumber protein nabati terbaik yang mudah diserap tubuh' },
          { title: 'Rendah Lemak', description: 'Cemilan sehat dengan kandungan lemak yang rendah dan baik untuk diet' },
          { title: 'Tanpa Pengawet', description: '100% alami tanpa bahan pengawet buatan yang berbahaya' },
          { title: 'Renyah Tahan Lama', description: 'Tekstur renyah yang tahan lama hingga berminggu-minggu' }
        ]
      }
    },
    trust: {
      title: 'Kepercayaan & Kualitas',
      subtitle: 'Produk kami telah melalui proses kontrol kualitas ketat',
      certifications: {
        halal: { title: 'Sertifikasi Halal', description: '100% Halal MUI' },
        bpom: { title: 'Terdaftar BPOM', description: 'No. BPOM MD XXXXXX' }
      }
    },
    faq: {
      title: 'Pertanyaan Umum',
      items: [
        { question: 'Berapa lama Sagu Tempe bisa bertahan?', answer: 'Sagu Tempe dapat bertahan hingga 2-3 bulan dalam kemasan tertutup dan disimpan di tempat yang kering dan sejuk.' },
        { question: 'Apakah Sagu Tempe halal?', answer: 'Ya, 100% produk Sagu Tempe kami tersertifikasi halal dari MUI. Semua bahan yang digunakan adalah halal.' },
        { question: 'Apakah ada pengawet dalam Sagu Tempe?', answer: 'Tidak, Sagu Tempe kami dibuat tanpa pengawet buatan. Kualitas dan kerenyahannya dijaga melalui proses penggorengan yang tepat.' },
        { question: 'Bagaimana cara membeli Sagu Tempe?', answer: 'Anda bisa memesan melalui WhatsApp atau mengisi form kontak di website ini. Kami melayani pengiriman ke seluruh Indonesia.' },
        { question: 'Berapa minimum pembelian?', answer: 'Minimum pembelian adalah 5 kemasan untuk pengiriman reguler. Untuk pembelian partai besar, silakan hubungi kami langsung.' }
      ]
    },
    contact: {
      title: 'Hubungi Kami',
      subtitle: 'Siap melayani kebutuhan cemilan Anda',
      form: {
        name: 'Nama Lengkap',
        email: 'Email',
        phone: 'No. WhatsApp',
        message: 'Pesan',
        submit: 'Kirim Pesan',
        success: 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.'
      },
      social: { whatsapp: 'WhatsApp', instagram: 'Instagram', facebook: 'Facebook' },
      address: { title: 'Alamat', content: 'Jl. Contoh No. 123, Jakarta, Indonesia' },
      hours: { title: 'Jam Operasional', content: 'Senin - Sabtu: 08:00 - 17:00 WIB' }
    },
    footer: { rights: 'Copyright © 2025 Jaya Optimal Solution' }
  },
  su: {
    nav: { home: 'Imah', products: 'Produk', about: 'Ngeus Kami', faq: 'Pataran', contact: 'Ampar Kontak' },
    hero: {
      title: 'Renyah, Sehat, sareng Nikmat!',
      subtitle: 'Cemilan Sagu Tempe Asli Indonesia sareng Perpaduan Rasa Tradisional nu Nggugah Selera',
      cta: 'Pesan Sekarang',
      tagline: '100% Halal • BPOM Certified • Tanpa Pangawet'
    },
    products: {
      title: 'Produk Kami',
      subtitle: 'Pilihan cemilan sagu tempe terbaik sareng kualitas premium',
      items: [
        { name: 'Sagu Tempe Original', description: 'Rasa klasik sagu tempe sareng keju alami sareng rempah pilihan. Renyah di luar, lembut di dalam.', features: ['Rasa Otentik', '100% Bahan Alami', 'Tanpa Pangawet'] },
        { name: 'Sagu Tempe Keju', description: 'Perpaduan sagu tempe sareng keju premium nu melimpah. Pilihan favorit kuluarga!', features: ['Keju Premium', 'Protein Tinggi', 'Rasa Gurih'] },
        { name: 'Sagu Tempe Pedas Manis', description: 'Kombinasi sempurna pedas sareng manis sareng bumbu rahasia nu bikin ketagihan.', features: ['Pedas Nikmat', 'Bumbu Spesial', '100% Alami'] },
        { name: 'Sagu Tempe Bawang', description: 'Aroma bawang nu ngagoda sareng cita rasa gurih nu tak tertahankan.', features: ['Aroma Bawang', 'Rasa Gurih', 'Tanpa MSG'] }
      ]
    },
    about: {
      title: 'Ngeus Kami',
      subtitle: 'Ngenalan Sagu Tempe Lebih Dekat',
      story: 'Sagu Tempe teh cemilan tradisional Indonesia nu dibuat sareng mencampur tepung sagu sareng tempe nu dihaluskan, kamudian digoreng hingga keemasan. Warisan kuliner nusantara nu tias turun-temurun.',
      benefits: {
        items: [
          { title: 'Protein Tinggi', description: 'Tempe teh sumber protein nabati terbaik nu mudah diserap tubuh' },
          { title: 'Rendah Lemak', description: 'Cemilan sehat sareng kandungan lemak nu rendah sareng alus kanggo pikeun diet' },
          { title: 'Tanpa Pangawet', description: '100% alami tanpa bahan pangawet buatan nu berbahaya' },
          { title: 'Renyah Tahan Lama', description: 'Tekstur renyah nu tahan lama hingga berminggu-minggu' }
        ]
      }
    },
    trust: {
      title: 'Kepercayaan sareng Kualitas',
      subtitle: 'Produk kami teh melalui proses kontrol kualitas ketat',
      certifications: {
        halal: { title: 'Sertifikasi Halal', description: '100% Halal MUI' },
        bpom: { title: 'Terdaftar BPOM', description: 'No. BPOM MD XXXXXX' }
      }
    },
    faq: {
      title: 'Pataran Umum',
      items: [
        { question: 'Berapa lama Sagu Tempe tias bertahan?', answer: 'Sagu Tempe tias bertahan hingga 2-3 bulan dina kemasan tertutup sareng disimpen dina tempat nu kering sareng sejuk.' },
        { question: 'Apa Sagu Tempe halal?', answer: 'Poh, 100% produk Sagu Tempe kami tersertifikasi halal ti MUI. Sakabahan nu dipakai teh halal.' },
        { question: 'Aya aya pangawet dina Sagu Tempe?', answer: 'Teu, Sagu Tempe kami dihuet tanpa pangawet buatan. Kualitas sareng kerenyahannana dijaga melalui proses penggorengan nu tepat.' },
        { question: 'Bagaimana cara mabeleh Sagu Tempe?', answer: 'Anu tias mabeleh melalui WhatsApp atawa ngisi form kontak dina website ieu. Kami melayani pengiriman ka seluruh Indonesia.' },
        { question: 'Berapa minimum pabelehan?', answer: 'Minimum pabelehan teh 5 kemasan kanggo pengiriman reguler. Kanggo pabelehan partai badag, silakan hubungi kami langsung.' }
      ]
    },
    contact: {
      title: 'Ampar Kontak',
      subtitle: 'Siap melayani kebutuhan cemilan Anje',
      form: {
        name: 'Nami Lengkap',
        email: 'Email',
        phone: 'No. WhatsApp',
        message: 'Pesan',
        submit: 'Kirim Pesan',
        success: 'Pesan berhasil dikirim! Kami teh segera ngahubungi Anje.'
      },
      social: { whatsapp: 'WhatsApp', instagram: 'Instagram', facebook: 'Facebook' },
      address: { title: 'Alamat', content: 'Jl. Contoh No. 123, Jakarta, Indonesia' },
      hours: { title: 'Jam Operasional', content: 'Senin - Sabtu: 08:00 - 17:00 WIB' }
    },
    footer: { rights: 'Copyright © 2025 Jaya Optimal Solution' }
  },
  en: {
    nav: { home: 'Home', products: 'Products', about: 'About', faq: 'FAQ', contact: 'Contact' },
    hero: {
      title: 'Crispy, Healthy, and Delicious!',
      subtitle: 'Authentic Indonesian Sago Tempe Snacks with Traditional Flavors that Tempt Your Taste Buds',
      cta: 'Order Now',
      tagline: '100% Halal • BPOM Certified • No Preservatives'
    },
    products: {
      title: 'Our Products',
      subtitle: 'Best quality sago tempe snacks with premium quality',
      items: [
        { name: 'Original Sago Tempe', description: 'Classic sago tempe flavor with natural cheese and selected spices. Crispy outside, soft inside.', features: ['Authentic Taste', '100% Natural Ingredients', 'No Preservatives'] },
        { name: 'Cheese Sago Tempe', description: 'Perfect blend of sago tempe with abundant premium cheese. Family favorite choice!', features: ['Premium Cheese', 'High Protein', 'Savory Taste'] },
        { name: 'Sweet Spicy Sago Tempe', description: 'Perfect combination of sweet and spicy with secret spices that make you addicted.', features: ['Delicious Spicy', 'Special Spices', '100% Natural'] },
        { name: 'Garlic Sago Tempe', description: 'Tempting garlic aroma with irresistible savory flavor.', features: ['Garlic Aroma', 'Savory Taste', 'No MSG'] }
      ]
    },
    about: {
      title: 'About Us',
      subtitle: 'Get to Know Sago Tempe Better',
      story: 'Sago Tempe is a traditional Indonesian snack made by mixing sago flour with ground tempeh, then fried until golden brown. A culinary heritage passed down through generations.',
      benefits: {
        items: [
          { title: 'High Protein', description: 'Tempe is best plant-based protein source easily absorbed by body' },
          { title: 'Low Fat', description: 'Healthy snack with low fat content, good for diet' },
          { title: 'No Preservatives', description: '100% natural without harmful artificial preservatives' },
          { title: 'Long-Lasting Crispiness', description: 'Crispy texture that lasts for weeks' }
        ]
      }
    },
    trust: {
      title: 'Trust & Quality',
      subtitle: 'Our products have undergone strict quality control processes',
      certifications: {
        halal: { title: 'Halal Certification', description: '100% MUI Halal Certified' },
        bpom: { title: 'BPOM Registered', description: 'BPOM No. MD XXXXXX' }
      }
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { question: 'How long can Sago Tempe last?', answer: 'Sago Tempe can last up to 2-3 months in sealed packaging when stored in a dry, cool place.' },
        { question: 'Is Sago Tempe halal?', answer: 'Yes, 100% of our Sago Tempe products are MUI halal certified. All ingredients used are halal.' },
        { question: 'Are there preservatives in Sago Tempe?', answer: 'No, our Sago Tempe is made without artificial preservatives. Quality and crispiness are maintained through proper frying process.' },
        { question: 'How to buy Sago Tempe?', answer: 'You can order via WhatsApp or fill out the contact form on this website. We serve shipping throughout Indonesia.' },
        { question: 'What is minimum order?', answer: 'Minimum order is 5 packages for regular shipping. For bulk orders, please contact us directly.' }
      ]
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Ready to Serve Your Snack Needs',
      form: {
        name: 'Full Name',
        email: 'Email',
        phone: 'WhatsApp Number',
        message: 'Message',
        submit: 'Send Message',
        success: 'Message sent successfully! We will contact you soon.'
      },
      social: { whatsapp: 'WhatsApp', instagram: 'Instagram', facebook: 'Facebook' },
      address: { title: 'Address', content: '123 Example Street, Jakarta, Indonesia' },
      hours: { title: 'Operating Hours', content: 'Monday - Saturday: 08:00 - 17:00 WIB' }
    },
    footer: { rights: 'Copyright © 2025 Jaya Optimal Solution' }
  },
  ar: {
    nav: { home: 'الرئيسية', products: 'المنتجات', about: 'من نحن', faq: 'الأسئلة الشائعة', contact: 'اتصل بنا' },
    hero: {
      title: 'مقرمشة وصحية ولذيذة!',
      subtitle: 'وجبات ساغو تيمبي الإندونيسية الأصلية بالنكهات التقليدية التي تثير الشهية',
      cta: 'اطلب الآن',
      tagline: '100% حلال • معتمدة من BPOM • بدون مواد حافظة'
    },
    products: {
      title: 'منتجاتنا',
      subtitle: 'أفضل جودة لوجبات ساغو تيمبي بجودة ممتازة',
      items: [
        { name: 'ساغو تيمبي الأصلي', description: 'نكهة ساغو تيمبي الكلاسيكية بالجبن الطبيعي والتوابل المختارة. مقرمشة من الخارج، طرية من الداخل.', features: ['نكهة أصلية', '100% مكونات طبيعية', 'بدون مواد حافظة'] },
        { name: 'ساغو تيمبي بالجبن', description: 'مزيج مثالي من ساغو تيمبي مع الجبن المميز الوفير. المفضلة للعائلة!', features: ['جبن ممتاز', 'بروتين عالي', 'نكهة لذيذة'] },
        { name: 'ساغو تيمبي الحلو والحار', description: 'مزيج مثالي من الحلو والحار بتوابل سرية تجعلك مدمنًا.', features: ['حار لذيذ', 'توابل خاصة', '100% طبيعي'] },
        { name: 'ساغو تيمبي بالثوم', description: 'رائحة الثوم المغرية بالنكهة اللذيذة التي لا تقاوم.', features: ['رائحة ثوم', 'نكهة لذيذة', 'بدون MSG'] }
      ]
    },
    about: {
      title: 'من نحن',
      subtitle: 'تعرف على ساغو تيمبي بشكل أفضل',
      story: 'ساغو تيمبي هي وجبة خفيفة تقليدية إندونيسية مصنوعة بخلط دقيق الساغو مع التيمبي المطحون، ثم تقلى حتى يصبح ذهبيًا. تراث غذائي تم توارثه عبر الأجيال.',
      benefits: {
        items: [
          { title: 'بروتين عالي', description: 'التيمبي هو أفضل مصدر بروتين نباتي يسهل امتصاصه من قبل الجسم' },
          { title: 'منخفض الدهون', description: 'وجبة خفيفة صحية بمحتوى دهون منخفض، جيدة للنظام الغذائي' },
          { title: 'بدون مواد حافظة', description: '100% طبيعي بدون مواد حافظة صناعية ضارة' },
          { title: 'قرمشة تدوم طويلاً', description: 'قوام مقرمش يدوم لأسابيع' }
        ]
      }
    },
    trust: {
      title: 'الثقة والجودة',
      subtitle: 'منتجاتنا خضعت لعمليات مراقبة جودة صارمة',
      certifications: {
        halal: { title: 'شهادة حلال', description: '100% معتمد حلال من MUI' },
        bpom: { title: 'مسجل في BPOM', description: 'رقم BPOM MD XXXXXX' }
      }
    },
    faq: {
      title: 'الأسئلة الشائعة',
      items: [
        { question: 'كم من الوقت يمكن أن يستمر ساغو تيمبي؟', answer: 'يمكن أن يستمر ساغو تيمبي حتى 2-3 أشهر في التغليف المغلق عند تخزينه في مكان جاف وبارد.' },
        { question: 'هل ساغو تيمبي حلال؟', answer: 'نعم، 100% من منتجات ساغو تيمبي لدينا معتمدة حلال من MUI. جميع المكونات المستخدمة حلال.' },
        { question: 'هل هناك مواد حافظة في ساغو تيمبي؟', answer: 'لا، يتم صنع ساغو تيمبي لدينا بدون مواد حافظة صناعية. يتم الحفاظ على الجودة والقرمشة من خلال عملية القلي المناسبة.' },
        { question: 'كيف أشتري ساغو تيمبي؟', answer: 'يمكنك الطلب عبر واتساب أو ملء نموذج الاتصال على هذا الموقع. نقدم الشحن في جميع أنحاء إندونيسيا.' },
        { question: 'ما هو الحد الأدنى للطلب؟', answer: 'الحد الأدنى للطلب هو 5 عبوات للشحن العادي. للطلبات الكبيرة، يرجى الاتصال بنا مباشرة.' }
      ]
    },
    contact: {
      title: 'اتصل بنا',
      subtitle: 'مستعدون لخدمة احتياجاتك من الوجبات الخفيفة',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم واتساب',
        message: 'الرسالة',
        submit: 'إرسال الرسالة',
        success: 'تم إرسال الرسالة بنجاح! سنتصل بك قريبًا.'
      },
      social: { whatsapp: 'واتساب', instagram: 'إنستغرام', facebook: 'فيسبوك' },
      address: { title: 'العنوان', content: '123 شارع المثال، جاكارتا، إندونيسيا' },
      hours: { title: 'ساعات العمل', content: 'الاثنين - السبت: 08:00 - 17:00 توقيت غرب إندونيسيا' }
    },
    footer: { rights: 'Copyright © 2025 Jaya Optimal Solution' }
  },
  jp: {
    nav: { home: 'ホーム', products: '製品', about: '私たちについて', faq: 'よくある質問', contact: 'お問い合わせ' },
    hero: {
      title: 'サクサク、ヘルシー、美味しい！',
      subtitle: '食欲をそそる伝統的な味のインドネシア本格サゴテンペおやつ',
      cta: '今すぐ注文',
      tagline: '100%ハラール • BPOM認証済み • 保存料なし'
    },
    products: {
      title: '私たちの製品',
      subtitle: 'プレミアム品質の最高品質サゴテンペおやつ',
      items: [
        { name: 'オリジナルサゴテンペ', description: '天然チーズと選りすぐりの香辛料を使ったサゴテンペのクラシックな味。外はサクサク、中はふわふわ。', features: ['本格的な味', '100%天然成分', '保存料なし'] },
        { name: 'チーズサゴテンペ', description: '豊富なプレミアムチーズと完璧に調和したサゴテンペ。ファミリーのお気に入り！', features: ['プレミアムチーズ', '高タンパク', '旨味のある味'] },
        { name: 'スパイシーシュガーサゴテンペ', description: '秘伝の香辛料を使った甘辛の完璧な組み合わせ。中毒性のある美味しさ。', features: ['美味しい辛さ', '特製香辛料', '100%天然'] },
        { name: 'ガーリックサゴテンペ', description: '魅力的なニンニクの香りと抵抗できない旨味。', features: ['ニンニクの香り', '旨味のある味', 'MSGなし'] }
      ]
    },
    about: {
      title: '私たちについて',
      subtitle: 'サゴテンペを詳しく知る',
      story: 'サゴテンペは、サゴ粉とすり潰したテンペを混ぜ合わせ、黄金色になるまで揚げて作られるインドネシアの伝統的なおやつです。世代を超えて受け継がれてきた食の遺産。',
      benefits: {
        items: [
          { title: '高タンパク', description: 'テンペは体が吸収しやすい最高の植物性タンパク質源です' },
          { title: '低脂質', description: '低脂質で健康的なおやつ、ダイエットに最適' },
          { title: '保存料なし', description: '有害な人工保存料を使わない100%天然成分' },
          { title: '長くサクサク', description: '数週間続くサクサク感' }
        ]
      }
    },
    trust: {
      title: '信頼と品質',
      subtitle: '私たちの製品は厳格な品質管理プロセスを経ています',
      certifications: {
        halal: { title: 'ハラール認証', description: '100% MUIハラール認証済み' },
        bpom: { title: 'BPOM登録済み', description: 'BPOM番号 MD XXXXXX' }
      }
    },
    faq: {
      title: 'よくある質問',
      items: [
        { question: 'サゴテンペはどれくらい持ちますか？', answer: '密閉されたパッケージで乾燥した涼しい場所に保管すれば、サゴテンペは2〜3ヶ月持ちます。' },
        { question: 'サゴテンペはハラールですか？', answer: 'はい、サゴテンペ製品は100%MUIハラール認証済みです。使用されているすべての材料はハラールです。' },
        { question: 'サゴテンペに保存料は含まれていますか？', answer: 'いいえ、私たちのサゴテンペは人工保存料なしで作られています。品質とサクサク感は適切な揚げプロセスで維持されています。' },
        { question: 'サゴテンペを購入するにはどうすればよいですか？', answer: 'WhatsAppまたはこのウェブサイトのお問い合わせフォームから注文できます。インドネシア全土への配送を提供しています。' },
        { question: '最小注文数量はいくつですか？', answer: '通常配送の最小注文数量は5個です。大量注文については、直接お問い合わせください。' }
      ]
    },
    contact: {
      title: 'お問い合わせ',
      subtitle: 'おやつのニーズにお応えする準備ができています',
      form: {
        name: '氏名',
        email: 'メール',
        phone: 'WhatsApp番号',
        message: 'メッセージ',
        submit: 'メッセージを送信',
        success: 'メッセージが正常に送信されました！すぐにご連絡いたします。'
      },
      social: { whatsapp: 'WhatsApp', instagram: 'Instagram', facebook: 'Facebook' },
      address: { title: '住所', content: 'インドネシア、ジャカルタ、サンプル通り123番' },
      hours: { title: '営業時間', content: '月曜日 - 土曜日: 08:00 - 17:00 WIB' }
    },
    footer: { rights: 'Copyright © 2025 Jaya Optimal Solution' }
  },
  zh: {
    nav: { home: '首页', products: '产品', about: '关于我们', faq: '常见问题', contact: '联系我们' },
    hero: {
      title: '酥脆、健康、美味！',
      subtitle: '印度尼西亚传统木薯豆腐小吃，经典传统风味让您垂涎欲滴',
      cta: '立即订购',
      tagline: '100% 清真 • BPOM 认证 • 无防腐剂'
    },
    products: {
      title: '我们的产品',
      subtitle: '优质木薯豆腐小吃，品质上乘',
      items: [
        { name: '原味木薯豆腐', description: '天然芝士和精选香料制成的经典木薯豆腐风味。外酥里嫩。', features: ['正宗口味', '100% 天然成分', '无防腐剂'] },
        { name: '芝士木薯豆腐', description: '木薯豆腐与优质芝士的完美融合。家庭首选！', features: ['优质芝士', '高蛋白', '美味可口'] },
        { name: '甜辣木薯豆腐', description: '秘制香料制成的甜辣完美组合。让人上瘾的美味。', features: ['美味辣味', '特制香料', '100% 天然'] },
        { name: '蒜味木薯豆腐', description: '诱人的蒜香和无法抗拒的美味口感。', features: ['蒜香浓郁', '美味可口', '无味精'] }
      ]
    },
    about: {
      title: '关于我们',
      subtitle: '进一步了解木薯豆腐',
      story: '木薯豆腐是印度尼西亚传统小吃，由木薯粉和磨碎的豆腐混合后炸至金黄色而成。代代相传的美食遗产。',
      benefits: {
        items: [
          { title: '高蛋白', description: '豆腐是最易被人体吸收的优质植物蛋白来源' },
          { title: '低脂肪', description: '健康小吃，脂肪含量低，适合减肥' },
          { title: '无防腐剂', description: '100% 天然，无有害人工防腐剂' },
          { title: '持久酥脆', description: '酥脆口感可持续数周' }
        ]
      }
    },
    trust: {
      title: '信任与品质',
      subtitle: '我们的产品经过严格的质量控制流程',
      certifications: {
        halal: { title: "清真认证", description: '100% MUI 清真认证' },
        bpom: { title: 'BPOM 注册', description: "BPOM 编号 MD XXXXXX" }
      }
    },
    faq: {
      title: '常见问题',
      items: [
        { question: '木薯豆腐可以保存多久？', answer: "木薯豆腐在密封包装中可保存2-3个月，存放在干燥阴凉处。" },
        { question: '木薯豆腐是清真的吗？', answer: '是的，我们的木薯豆腐产品100%通过MUI清真认证。所有使用的材料都是清真的。' },
        { question: '木薯豆腐含防腐剂吗？', answer: "不含，我们的木薯豆腐不含人工防腐剂。质量和酥脆感通过适当的油炸工艺保持。" },
        { question: "如何购买木薯豆腐？", answer: "您可以通过WhatsApp或填写此网站上的联系表单订购。我们提供印度尼西亚全境配送。" },
        { question: '最小订购量是多少？', answer: "常规配送的最小订购量为5包。大宗订单请直接联系我们。" }
      ]
    },
    contact: {
      title: "联系我们",
      subtitle: "准备为您的小吃需求服务",
      form: {
        name: '全名',
        email: "电子邮件",
        phone: 'WhatsApp号码',
        message: '留言',
        submit: '发送留言',
        success: "留言已成功发送！我们将尽快与您联系。"
      },
      social: { whatsapp: 'WhatsApp', instagram: 'Instagram', facebook: 'Facebook' },
      address: { title: '地址', content: "印度尼西亚，雅加达，示例街123号" },
      hours: { title: '营业时间', content: "周一 - 周六: 08:00 - 17:00 WIB" }
    },
    footer: { rights: "Copyright © 2025 Jaya Optimal Solution" }
  }
}

export default function Home() {
  const { toast } = useToast()
  const [locale, setLocale] = useState('id')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = translations[locale as keyof typeof translations]
  const [selectedText, setSelectedText] = useState<string>('')
  const [speakerPosition, setSpeakerPosition] = useState<{ x: number; y: number } | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [voice, setVoice] = useState('tongtong')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleTextSelection = () => {
    const selection = window.getSelection()
    const text = selection?.toString().trim()
    if (text && text.length > 0 && text.length <= 1024) {
      setSelectedText(text)
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        if (range) {
          const rect = range.getBoundingClientRect()
          setSpeakerPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 50
          })
        }
      }
    } else {
      setSelectedText('')
      setSpeakerPosition(null)
    }
  }

  const playTextToSpeech = async () => {
    if (!selectedText) return

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    setIsPlaying(true)
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedText, voice: voice }),
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        audioRef.current = audio
        
        audio.onended = () => {
          setIsPlaying(false)
          URL.revokeObjectURL(audioUrl)
          audioRef.current = null
        }
        
        audio.onerror = () => {
          setIsPlaying(false)
          URL.revokeObjectURL(audioUrl)
          audioRef.current = null
          toast({
            title: 'Error',
            description: 'Gagal memutar audio. Silakan pilih teks lagi.',
            variant: 'destructive',
          })
        }
        
        audio.play()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate speech')
      }
    } catch (error) {
      console.error('TTS Error:', error)
      setIsPlaying(false)
      toast({
        title: 'Error',
        description: 'Gagal memutar audio. Silakan pilih teks lagi.',
        variant: 'destructive',
      })
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    toast({
      title: 'Success',
      description: t.contact.form.success,
    })
  }

  useEffect(() => {
    const handleMouseUp = () => handleTextSelection()
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('keyup', handleTextSelection)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('keyup', handleTextSelection)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedText('')
      setSpeakerPosition(null)
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-primary"
            >
              Sagu Tempe
            </motion.div>

            <div className="hidden md:flex items-center gap-6">
              {[
                { key: 'home', id: 'home' },
                { key: 'about', id: 'about' },
                { key: 'faq', id: 'faq' }
              ].map((item, index) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-gray-700 hover:text-[#CD853F] transition-colors duration-300"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </motion.button>
              ))}

              {/* WhatsApp Button */}
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                href="https://wa.me/62895353590304?text=Halo%20Kak%20Admin%2C%20Sagu%20Tempe-nya%20lagi%20ready%20gak%3F%20Info%20harga%20terbarunya%20ya%20kak.%20Makasih!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden lg:inline">WhatsApp</span>
              </motion.a>
            </div>

            {/* Mobile WhatsApp Button */}
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              href="https://wa.me/62895353590304?text=Halo%20Kak%20Admin%2C%20Sagu%20Tempe-nya%20lagi%20ready%20gak%3F%20Info%20harga%20terbarunya%20ya%20kak.%20Makasih!"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden flex items-center justify-center w-10 h-10 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
            </motion.a>

            {/* TTS Voice Control - Hidden Temporarily */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 font-medium relative">
                  {isPlaying ? (
                    <>
                      <Volume2 className="h-4 w-4 animate-pulse text-green-600" />
                      <span className="hidden sm:inline">Playing...</span>
                    </>
                  ) : (
                    <>
                      <Headphones className="h-4 w-4" />
                      <span className="hidden sm:inline">Voice</span>
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2 space-y-2">
                  <div className="text-sm font-medium mb-2">Pilih Suara:</div>
                  {[
                    { id: 'tongtong', name: 'Indonesia (Wanita)', flag: '🇮🇩' },
                    { id: 'adam', name: 'Indonesia (Pria)', flag: '🇮🇩' },
                    { id: 'male', name: 'English (Male)', flag: '🇬🇧' },
                    { id: 'female', name: 'English (Female)', flag: '🇬🇧' },
                  ].map((voiceOption) => (
                    <DropdownMenuItem
                      key={voiceOption.id}
                      onClick={() => setVoice(voiceOption.id)}
                      className={'flex items-center gap-3 cursor-pointer ' + (voice === voiceOption.id ? 'bg-accent' : '')}
                    >
                      <span className="text-xl">{voiceOption.flag}</span>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{voiceOption.name}</span>
                        <span className="text-xs text-muted-foreground">{voiceOption.id}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="text-xs text-muted-foreground mb-2">
                    💡 Pilih teks untuk memutar audio
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 font-medium">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {['id', 'en', 'ar', 'jp', 'zh', 'su'].find(l => l === locale)?.toUpperCase() || 'ID'}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {[
                  { code: 'id', flag: 'https://flagcdn.com/w320/id.png', name: 'Indonesia', native: 'Bahasa Indonesia' },
                  { code: 'en', flag: 'https://flagcdn.com/w320/gb.png', name: 'English', native: 'English' },
                  { code: 'ar', flag: 'https://flagcdn.com/w320/sa.png', name: 'Arabic', native: 'العربية' },
                  { code: 'jp', flag: 'https://flagcdn.com/w320/jp.png', name: 'Japanese', native: '日本語' },
                  { code: 'zh', flag: 'https://flagcdn.com/w320/cn.png', name: 'Chinese', native: '中文' },
                  { code: 'su', flag: 'https://flagcdn.com/w320/id.png', name: 'Sundanese', native: 'Basa Sunda' }
                ].map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLocale(l.code)}
                    className={'flex items-center gap-3 cursor-pointer ' + (locale === l.code ? 'bg-accent' : '')}
                  >
                    <img
                      src={l.flag}
                      alt={l.name}
                      className="w-8 h-6 object-cover rounded shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{l.native}</span>
                      <span className="text-xs text-muted-foreground">{l.name}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              >
                <Badge variant="secondary" className="mb-4">
                  <Award className="w-3 h-3 mr-1" />
                  {t.hero.tagline}
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              >
                {t.hero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground mb-8"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
              >
                <Button
                  size="lg"
                  onClick={() => window.open('https://wa.me/62895353590304?text=Halo%20Kak%20Admin%2C%20Sagu%20Tempe-nya%20lagi%20ready%20gak%3F%20Info%20harga%20terbarunya%20ya%20kak.%20Makasih!', '_blank')}
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-8 overflow-hidden">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-background flex items-center justify-center overflow-hidden">
                  <motion.img
                    src="/sagu-tempe-terbaru.jpg"
                    alt="Sagu Tempe"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <motion.div
                animate={{ y: [-10, 10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium"
              >
                ⭐ 4.9/5
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-10 left-0 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium"
              >
                🔥 Terlaris
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.about.title}</h2>
            <p className="text-muted-foreground text-lg">{t.about.subtitle}</p>
          </motion.div>

          <div className="max-w-3xl mx-auto mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center text-lg text-muted-foreground leading-relaxed"
            >
              {t.about.story}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.benefits.items.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      {index === 0 ? (
                        <Award className="w-8 h-8 text-primary" />
                      ) : index === 1 ? (
                        <Star className="w-8 h-8 text-primary" />
                      ) : index === 2 ? (
                        <Shield className="w-8 h-8 text-primary" />
                      ) : (
                        <Clock className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.trust.title}</h2>
            <p className="text-muted-foreground text-lg">{t.trust.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="text-center h-full border-2 border-green-500/20">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Award className="w-12 h-12 text-green-500" />
                  </div>
                  <CardTitle className="text-xl text-green-600">
                    {t.trust.certifications.halal.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 font-semibold text-lg">
                    {t.trust.certifications.halal.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="text-center h-full border-2 border-blue-500/20">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Shield className="w-12 h-12 text-blue-500" />
                  </div>
                  <CardTitle className="text-xl text-blue-600">
                    {t.trust.certifications.bpom.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600 font-semibold text-lg">
                    {t.trust.certifications.bpom.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.faq.title}</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {t.faq.items.map((item, index) => (
                <AccordionItem key={index} value={'item-' + index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
                  >
                    <AccordionTrigger className="text-left hover:text-primary">
                      {item.question}
                    </AccordionTrigger>
                  </motion.div>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>


      {/* TTS Speaker Icon Overlay */}
      {speakerPosition && selectedText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: `${speakerPosition.x}px`,
            top: `${speakerPosition.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <Button
            size="sm"
            onClick={playTextToSpeech}
            disabled={isPlaying}
            className="pointer-events-auto shadow-lg bg-primary hover:bg-primary/90"
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
        </motion.div>
      )}

      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        href="https://wa.me/62895353590304?text=Halo%20Kak%20Admin%2C%20Sagu%20Tempe-nya%20lagi%20ready%20gak%3F%20Info%20harga%20terbarunya%20ya%20kak.%20Makasih!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="hidden md:inline font-medium">Chat WhatsApp</span>
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.a>

      {/* Footer */}
      <footer className="py-8 bg-muted/50 border-t mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  )
}
