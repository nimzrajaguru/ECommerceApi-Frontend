import { motion } from 'framer-motion';
import InfoPage from '../../components/layout/InfoPage';
import StaggerGrid from '../../components/motion/StaggerGrid';
import { productCardVariants } from '../../components/product/ProductCard';
import { ClockIcon, MailIcon, MapPinIcon } from '../../components/ui/icons';

const CHANNELS = [
  { title: 'Email support', detail: 'support@onyx.example', icon: MailIcon, href: 'mailto:support@onyx.example' },
  { title: 'Response time', detail: 'Within 1 business day', icon: ClockIcon },
  { title: 'Based in', detail: 'London, United Kingdom', icon: MapPinIcon }
];

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact"
      title="Talk to a real person."
      intro="Order questions, product feedback, or partnership ideas — email is the fastest way to reach us."
    >
      <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CHANNELS.map((channel) => {
          const content = (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <channel.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-semibold text-ink-900 dark:text-white">{channel.title}</p>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{channel.detail}</p>
            </>
          );

          return channel.href ? (
            <motion.a key={channel.title} href={channel.href} variants={productCardVariants} className="card p-5 hover:shadow-card-hover">
              {content}
            </motion.a>
          ) : (
            <motion.div key={channel.title} variants={productCardVariants} className="card p-5">
              {content}
            </motion.div>
          );
        })}
      </StaggerGrid>
    </InfoPage>
  );
}
