'use client'

import { motion } from 'framer-motion'

const techNews = [
  'Yapay Zeka Siber Güvenlikte Devrim Yaratıyor',
  'Kuantum Hesaplama Yeni Bir Çağ Başlatıyor',
  'Blockchain Teknolojisi Finans Sektörünü Dönüştürüyor',
  'Edge Computing Geleceğin Altyapısını Şekillendiriyor',
  'Zero Trust Güvenlik Modeli Yaygınlaşıyor',
]

export default function TechTicker() {
  return (
    <section className="py-8 bg-bg-secondary border-y border-white/10 overflow-hidden">
      <div className="flex">
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{
            x: [0, -50 * 100],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-8">
              {techNews.map((news, index) => (
                <div
                  key={`${i}-${index}`}
                  className="flex items-center space-x-4 text-text-secondary"
                >
                  <span className="w-2 h-2 bg-accent-tertiary rounded-full animate-pulse" />
                  <span className="text-sm md:text-base">{news}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

