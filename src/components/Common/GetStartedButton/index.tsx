'use client';
import { Trigger, Arrow, type CtaSize } from './styles';
import { useDemoDialog } from '../DemoDialog/context';

/**
 * The site's single primary call to action.
 *
 * OraMedha's marketing site sells a demo, not a sign-up, so this is the only
 * action offered anywhere on the page — there is deliberately no login or
 * account-creation entry point. Every instance opens the same dialog, so there
 * is one form and one submission path however the visitor got there.
 *
 * `size` names the three contexts it appears in — the header rail, the footer
 * card and under the hero — instead of each call site passing its own padding
 * string. The type scales with the box, so the label carries the same weight
 * in all three.
 */
const GetStartedButton = ({ size = 'default' }: { size?: CtaSize }) => {
  const { open } = useDemoDialog();

  return (
    <Trigger type="button" $size={size} onClick={open}>
      Book a Demo
      <Arrow
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2.75 8h10.5M9.25 4l4 4-4 4" />
      </Arrow>
    </Trigger>
  );
};

export default GetStartedButton;
