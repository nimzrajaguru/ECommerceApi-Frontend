import { Link } from 'react-router-dom';
import InfoPage from '../../components/layout/InfoPage';
import Accordion from '../../components/ui/Accordion';
import { MailIcon } from '../../components/ui/icons';

const FAQS = [
  { question: 'How do I track my order?', answer: 'Sign in and open My orders from the account menu — every order shows its current status, from Pending through to Delivered.' },
  { question: 'What payment methods do you accept?', answer: 'Checkout supports all major debit and credit cards. Pricing is shown in GBP throughout.' },
  { question: 'Can I change or cancel an order after placing it?', answer: 'Contact support as soon as possible — we can usually amend an order before it moves to Processing.' },
  { question: 'How do returns work?', answer: 'Most items can be returned within 30 days of delivery. See the Shipping & returns page for the full policy.' },
  { question: 'Do you ship internationally?', answer: 'Currently Onyx ships within the UK only. We are working on expanding coverage.' }
];

export default function HelpCenterPage() {
  return (
    <InfoPage
      eyebrow="Help center"
      title="Answers to the questions we hear most."
      intro="Can't find what you need? Reach out and a real person will get back to you."
    >
      <Accordion items={FAQS} />

      <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="font-semibold text-ink-900 dark:text-white">Still stuck?</p>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Visit the <Link to="/contact" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">contact page</Link> or email us directly.
          </p>
        </div>
        <a href="mailto:support@onyx.example" className="btn-primary inline-flex items-center gap-2 !px-4 !py-2 text-sm">
          <MailIcon className="h-4 w-4" /> support@onyx.example
        </a>
      </div>
    </InfoPage>
  );
}
