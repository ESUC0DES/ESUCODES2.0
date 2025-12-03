'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Rocket, Eye, Share2, Compass, Users } from 'lucide-react' // İkonlar için (Eğer yüklü değilse ikon satırlarını silebilirsin veya npm install lucide-react yapabilirsin)

export default function AboutContent() {
  
  // Animasyon ayarları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  // Değerlerimiz Verisi
  const values = [
    {
      title: 'Merak',
      icon: <Rocket className="w-6 h-6" />,
      description: 'Yeni teknolojileri, bilinmeyen kavramları ve yazılım evreninin karanlık bölgelerini keşfetmek bizim yakıtımız. Bilgi bizden kaçamaz; sürekli araştırırız.',
      color: 'text-accent-primary',
      border: 'border-accent-primary/30'
    },
    {
      title: 'Şeffaflık',
      icon: <Eye className="w-6 h-6" />,
      description: 'Öğrenirken yaptığımız hataları, denediğimiz yolları ve ürettiğimiz çözümleri açıkça paylaşırız. Samimiyet, gelişimin ilk şartıdır.',
      color: 'text-purple-400',
      border: 'border-purple-400/30'
    },
    {
      title: 'Bilgi Paylaşımı',
      icon: <Share2 className="w-6 h-6" />,
      description: 'ESUcodes bilgiyi saklamaz, yayar. Bir şey biliyorsak anlatırız, bilmediğimiz bir şeyi öğrenirsek hem kendimize hem topluluğa aktarırız.',
      color: 'text-accent-tertiary',
      border: 'border-accent-tertiary/30'
    },
    {
      title: 'Keşif Odaklı Kültür',
      icon: <Compass className="w-6 h-6" />,
      description: 'Backend’den embedded’a, oyun geliştirmeden siber güvenliğe kadar her dalı merak eder; sınır koymayız. Farklı alanlara yönelmek en büyük gücümüz.',
      color: 'text-emerald-400',
      border: 'border-emerald-400/30'
    },
    {
      title: 'Topluluk Ruhu',
      icon: <Users className="w-6 h-6" />,
      description: 'Bugün küçük bir ekip olabiliriz ama yarın genç yazılımcıların staj bulduğu, projelerde ortak olduğu büyük bir galaksi oluşturmayı hedefliyoruz.',
      color: 'text-orange-400',
      border: 'border-orange-400/30'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        {/* --- BAŞLIK --- */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-primary via-purple-500 to-accent-tertiary bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(129,140,248,0.4)]">
            Hakkımızda
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl mx-auto">
            Yazılım evrenini keşfetmeye hazır mısın? <br />
            <span className="text-accent-primary">Yolculuk başlıyor.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          
          {/* --- MİSYON (Sol Taraf) --- */}
          <motion.div variants={itemVariants} className="relative group h-full">
             {/* Glow Efekti */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            
            <div className="relative h-full glass bg-bg-secondary/50 border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-accent-primary rounded-full shadow-[0_0_10px_#818cf8]"></span>
                Misyonumuz
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                Misyonumuz, öğrendiğimiz ve keşfettiğimiz yazılım bilgilerimizi paylaşarak genç geliştiricilere <span className="text-white font-medium">açık, samimi ve anlaşılır</span> içerikler sunmaktır.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                Teknik, eğitimsel ve felsefi blog yazılarıyla öğrenme yolculuğumuzu kayıt altına almak, bilgiye ulaşımı kolaylaştırmak ve yazılım dünyasına giriş yapmak isteyenlere rehberlik etmeyi hedefleriz.
              </p>
              <p className="text-lg text-white font-medium italic border-l-4 border-accent-primary pl-4">
                "Bugün küçük bir ekip olarak çıktığımız bu yolda, üretmeye, öğrenmeye ve bildiklerimizi aktarmaya devam ederiz."
              </p>
            </div>
          </motion.div>

          {/* --- VİZYON (Sağ Taraf - Manifesto) --- */}
          <motion.div variants={itemVariants} className="relative group h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-tertiary to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            
            <div className="relative h-full glass bg-bg-secondary/50 border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-accent-tertiary rounded-full shadow-[0_0_10px_#22d3ee]"></span>
                Vizyonumuz
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                Yazılım evreninin uçsuz bucaksız karanlığında <span className="text-accent-tertiary font-bold">kendi galaksisini</span> oluşturan bir topluluk haline gelmek.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                Her alandan yazılımcının siber güvenlikten oyun geliştirmeye kendi gezegenini oluşturduğu, fakat herkesin aynı <span className="text-white bg-white/10 px-2 rounded font-bold">karadelik metaforunda</span> birleştiği bir merkez.
              </p>
              <div className="mt-auto bg-bg-primary/50 p-4 rounded-xl border border-white/5">
                <p className="text-white text-lg">
                  🎯 Hedef: <span className="text-text-secondary">Blog seviyesinden başlayıp, geliştiricilerin birlikte ürettiği devasa bir yazılım yapılanmasına dönüşmek.</span>
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* --- DEĞERLERİMİZ (Grid) --- */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            Değerlerimiz
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`p-8 bg-bg-secondary/40 backdrop-blur-sm rounded-2xl border ${value.border} hover:bg-bg-secondary transition-all duration-300 flex flex-col`}
              >
                <div className={`mb-4 ${value.color} bg-white/5 w-fit p-3 rounded-xl`}>
                  {value.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${value.color}`}>
                  {value.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- CTA --- */}
        <motion.div variants={itemVariants} className="text-center">
          <Link href="/team">
            <motion.button
              className="relative px-12 py-5 bg-bg-secondary rounded-xl text-white font-bold tracking-wide overflow-hidden group border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10 group-hover:text-accent-primary transition-colors flex items-center gap-2">
                Mürettebatı Keşfet 🚀
              </span>
            </motion.button>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  )
}