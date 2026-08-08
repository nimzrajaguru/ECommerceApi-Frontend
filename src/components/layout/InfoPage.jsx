import Reveal from '../motion/Reveal';

export default function InfoPage({ eyebrow, title, intro, children }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Reveal>
        {eyebrow && <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink-950 dark:text-white">{title}</h1>
        {intro && <p className="mt-4 text-base text-ink-600 dark:text-ink-300">{intro}</p>}
      </Reveal>
      <Reveal delay={0.1} className="prose-onyx mt-8 flex flex-col gap-8">
        {children}
      </Reveal>
    </div>
  );
}
