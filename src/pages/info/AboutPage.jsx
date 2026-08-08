import { motion } from 'framer-motion';
import InfoPage from '../../components/layout/InfoPage';
import StaggerGrid from '../../components/motion/StaggerGrid';
import { productCardVariants } from '../../components/product/ProductCard';
import { BadgeCheckIcon, HeartIcon, ShieldCheckIcon, UsersIcon } from '../../components/ui/icons';

const VALUES = [
  { title: 'Curated, not crammed', detail: 'Every product on Onyx is reviewed before it goes live — we would rather list less and trust more.', icon: BadgeCheckIcon },
  { title: 'People over margins', detail: 'Fair prices for buyers, fair terms for sellers. We do not chase growth at the expense of trust.', icon: HeartIcon },
  { title: 'Security by default', detail: 'Every account and order is protected the same way, whether you spend £5 or £5,000.', icon: ShieldCheckIcon },
  { title: 'Built by a small team', detail: 'Onyx is run by a small crew who read every piece of feedback that comes in.', icon: UsersIcon }
];

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="Our story"
      title="A marketplace built around trust, not just transactions."
      intro="Onyx started as a simple idea: online shopping should feel as trustworthy as buying from someone you know. We curate categories instead of flooding them, and we design every page to make the honest choice the easy one."
    >
      <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {VALUES.map((value) => (
          <motion.div key={value.title} variants={productCardVariants} className="card p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              <value.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 font-semibold text-ink-900 dark:text-white">{value.title}</p>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{value.detail}</p>
          </motion.div>
        ))}
      </StaggerGrid>
    </InfoPage>
  );
}
