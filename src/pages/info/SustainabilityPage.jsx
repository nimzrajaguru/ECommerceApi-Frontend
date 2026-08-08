import { motion } from 'framer-motion';
import InfoPage from '../../components/layout/InfoPage';
import StaggerGrid from '../../components/motion/StaggerGrid';
import { productCardVariants } from '../../components/product/ProductCard';
import { LeafIcon, RefreshIcon, ShieldCheckIcon, TruckIcon } from '../../components/ui/icons';

const COMMITMENTS = [
  { title: 'Consolidated shipping', detail: 'We batch orders where we can to cut down on unnecessary delivery trips.', icon: TruckIcon },
  { title: 'Built to last, sold to last', detail: 'Our catalog favours durable goods over disposable ones wherever possible.', icon: ShieldCheckIcon },
  { title: 'Easy, honest returns', detail: 'A frictionless return policy means fewer impulse buys that end up in landfill.', icon: RefreshIcon },
  { title: 'Lower-carbon packaging', detail: 'We are moving sellers toward recyclable and minimal packaging by default.', icon: LeafIcon }
];

export default function SustainabilityPage() {
  return (
    <InfoPage
      eyebrow="Sustainability"
      title="Small steps, taken seriously."
      intro="We won't pretend one marketplace can fix retail's footprint. But we can make deliberate choices in how Onyx operates — and keep improving them."
    >
      <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {COMMITMENTS.map((item) => (
          <motion.div key={item.title} variants={productCardVariants} className="card p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <item.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 font-semibold text-ink-900 dark:text-white">{item.title}</p>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{item.detail}</p>
          </motion.div>
        ))}
      </StaggerGrid>
    </InfoPage>
  );
}
