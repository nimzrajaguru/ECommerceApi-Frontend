import { motion } from 'framer-motion';
import InfoPage from '../../components/layout/InfoPage';
import StaggerGrid from '../../components/motion/StaggerGrid';
import { productCardVariants } from '../../components/product/ProductCard';
import { RefreshIcon, ShieldCheckIcon, TruckIcon } from '../../components/ui/icons';

const SECTIONS = [
  {
    title: 'Shipping',
    icon: TruckIcon,
    points: [
      'Free shipping on every order, no minimum spend.',
      'Most orders arrive within 3–5 business days.',
      'You\'ll get a status update as soon as your order ships.'
    ]
  },
  {
    title: 'Returns',
    icon: RefreshIcon,
    points: [
      'Returns are accepted within 30 days of delivery.',
      'Items must be unused and in their original packaging.',
      'Refunds are issued to your original payment method within 5 business days of us receiving the item.'
    ]
  },
  {
    title: 'Damaged or incorrect items',
    icon: ShieldCheckIcon,
    points: [
      'Contact support within 48 hours of delivery with photos of the issue.',
      'We\'ll send a replacement or full refund — no need to wait for the return to process first.'
    ]
  }
];

export default function ShippingReturnsPage() {
  return (
    <InfoPage
      eyebrow="Policies"
      title="Shipping & returns."
      intro="Straightforward terms, no fine print you need a magnifying glass for."
    >
      <StaggerGrid className="flex flex-col gap-4">
        {SECTIONS.map((section) => (
          <motion.div key={section.title} variants={productCardVariants} className="card p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <section.icon className="h-5 w-5" />
              </span>
              <h2 className="font-bold text-ink-950 dark:text-white">{section.title}</h2>
            </div>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-600 dark:text-ink-300">
              {section.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-300 dark:bg-ink-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </StaggerGrid>
    </InfoPage>
  );
}
