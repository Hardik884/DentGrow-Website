'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type DemoDialogValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const DemoDialogContext = createContext<DemoDialogValue | null>(null);

/**
 * Holds the one demo dialog the site has.
 *
 * Every "Book a Demo" button on the page — header, hero, footer — calls the
 * same `open()`, so there is a single form and a single submission path rather
 * than a copy per call site.
 */
export const DemoDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <DemoDialogContext.Provider value={value}>
      {children}
    </DemoDialogContext.Provider>
  );
};

export const useDemoDialog = () => {
  const context = useContext(DemoDialogContext);
  if (!context) {
    throw new Error('useDemoDialog must be used inside <DemoDialogProvider>');
  }
  return context;
};
